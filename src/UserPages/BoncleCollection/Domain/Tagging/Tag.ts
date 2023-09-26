import { StringEnum_create } from "../../../../(System)/Data/StringEnum";
import { abstract, panic } from "../../../../(System)/Errors";
import { from, Selector } from "../../../../(System)/Collections/Sequence";
import { ExpandType } from "../../../../(System)/Types/Magic";
import { identity } from "../../../../(System)/Function";
import { collect } from "../../../../(System)/Collections/Iterable";
import { implies } from "../../../../(System)/Data/Boolean";
import { assert } from "../../../../(System)/Assert";
import { Member } from "../../../../(System)/Data/Enumeration";

import { BoncleTagTree, BoncleTagTree_Closed, BoncleTagTree_Default, BoncleTagTree_Erased, BoncleTagTree_Exclusive, BoncleTagTree_Private, BoncleTagTree_Root } from "../Definitions/TagTree";
import { StringBuildable, StringBuilder } from "../../../../(System)/Text/StringBuilder";

type AllKeys_StringKeys<T> = keyof T & string;
type AllKeys_Spread<T>     = T extends object ? AllKeys<T> : never;
type AllKeys<T> = 
    | AllKeys_StringKeys<T> 
    | AllKeys_Spread<T[AllKeys_StringKeys<T>]>
;

const whitespace = /\s/;

function check(string: string): BoncleTag {
    assert(!whitespace.test(string), 
        () => `Tag '${string}' should not contain whitespace.`);
    assert(!string.startsWith('-'),
        () => `Tag '${string}' should not start with a '-'.`);
    assert(!string.endsWith('-'),
        () => `Tag '${string}' should not end with a '-'.`);
    return string as BoncleTag;
}

const allKeys = collect(function* recurse(
    branch: BoncleTagTree,
): Iterable<BoncleTag> {
    let childBranch;
    for (const childKey in branch) {
        yield check(childKey);
        if (childBranch = branch[childKey]) {
            yield* recurse(childBranch);
        }
    }
});

export type  BoncleTag = ExpandType<AllKeys<typeof BoncleTagTree_Root>>;
export const BoncleTag = StringEnum_create(allKeys(BoncleTagTree_Root))
.extend(Self => ({
    /** The length of the longest tag. */
    maxLength: Math.max(...Self.values.map(value => value.length)),
} as const))
// These methods are patched in later, because they need external data
.extend(Self => ({
    getObject(self: Member<typeof Self>): BoncleTagTreeObject {
        abstract();
    },
    
    getRootObject(): BoncleTagTreeObject {
        abstract();
    },
    
    /** 
     * Returns true if the tag is fit to be shown to the user.
     * @bound 
     */
    isPublic(self: Member<typeof Self>): boolean {
        abstract();
    },
    
    isOpen(self: Member<typeof Self>): boolean {
        abstract();
    },
    
    
    isErased(self: Member<typeof Self>): boolean {
        abstract();
    },
}));

export const BoncleTag_Seperator = ' ';

///////////////////////////
// BoncleTag(Tree)Object //
///////////////////////////

const rootTag   : BoncleTag = "__root__";
const defaultTag: BoncleTag = "__default__";

const isUnderscored       = (tag: string) => tag.startsWith("_");
const isDoubleUnderscored = (tag: string) => tag.startsWith("__");
const isDollared          = (tag: string) => tag.startsWith("$");

type Visibility = 
    | "public"
    | "private"
;

function Visibility_infer(
    tag: BoncleTag, 
    branch: BoncleTagTree,
    erased: boolean,
): Visibility {
    const isPrivate = branch[BoncleTagTree_Private] ?? (
        isUnderscored(tag)       ||
        isDoubleUnderscored(tag) || // For clarity
        isDollared(tag)          || 
        erased
    );
    return isPrivate ? "private" : "public";
}

type Extensibility = 
    | "open"
    | "closed"
;

function Extensibility_infer(
    tag: BoncleTag, 
    branch: BoncleTagTree,
    erased: boolean,
): Extensibility {
    const isClosed = branch[BoncleTagTree_Closed] ?? (
        isDoubleUnderscored(tag) || 
        isDollared(tag) || 
        erased
    );
    
    return isClosed ? "closed" : "open";
}

class BoncleTagTreeObject 
implements Iterable<BoncleTagTreeObject>, StringBuildable {
    readonly children: readonly BoncleTagTreeObject[];
    
    readonly visibility   : Visibility;
    readonly extensibility: Extensibility;
    readonly isDefault    : boolean;
    readonly isExclusive  : boolean;
    readonly isErased     : boolean;
    
    readonly isPublic: boolean;
    readonly isOpen  : boolean;
    
    private constructor(
        public readonly parent: BoncleTagTreeObject | null,
        public readonly name: BoncleTag,
        branch: BoncleTagTree,
    ) {
        //////////
        // Self //
        //////////
        
        this.isExclusive = Boolean(branch[BoncleTagTree_Exclusive]);
        this.isDefault   = Boolean(branch[BoncleTagTree_Default]);
        this.isErased    = Boolean(branch[BoncleTagTree_Erased]);
        
        this.extensibility = Extensibility_infer(name, branch, this.isErased);
        this.visibility    = Visibility_infer(name, branch, this.isErased);
        
        this.isPublic = this.visibility    === "public";
        this.isOpen   = this.extensibility === "open";
        
        //////////////
        // Children //
        //////////////
        
        const children = this.children = new Array<BoncleTagTreeObject>;
        for (const childKey in branch) {
            const childTag    = check(childKey);
            const childBranch = branch[childKey];
            if (childTag !== rootTag && childBranch) {
                // __root__ (by definition) never appears as a child
                // Only phantom __root__ does.
                const child = new BoncleTagTreeObject(this, childTag, childBranch);
                children.push(child);
            }
        }
        
        ////////////
        // Sanity //
        ////////////
        
        assert(implies(this.isExclusive, this.children.length > 0),
            () => `Tag '${this.name}' should not be empty and exclusive.`);
        assert(implies(this.isErased, !this.isDefault), 
            () => `Tag '${this.name}' should not be erased and default.`);
    }
    
    static readonly Root = 
        new BoncleTagTreeObject(null, rootTag, BoncleTagTree_Root);
        
    /////////////////////////
    // implements Foldable //
    /////////////////////////
    
    private * fold_iter<R>(
        selector: Selector<BoncleTagTreeObject, R>
    ): IterableIterator<R> {
        yield selector(this);
        for (const child of this.children) {
            yield* child.fold_iter(selector);
        }
    }
    
    // FIXME: This looks nice, but assigns a unique fold function for each instance
    fold = collect(this.fold_iter);
    
    /////////////////////////
    // implements Iterable //
    /////////////////////////
    
    [Symbol.iterator]() {
        return this.fold_iter(identity);
    }
    
    ////////////////////////////////
    // implements StringBuildable //
    ////////////////////////////////
    
    buildString(result: StringBuilder): void {
        result.append(this.visibility);
        result.append(' ');
        result.append(this.extensibility);
        result.append(' ');
        result.append(this.isDefault   && "default ");
        result.append(this.isErased    && "erased ");
        result.append(this.isExclusive && "disjoint ");
        result.append("tag \"")
        result.append(this.name);
        result.append("\" (");
        const childCount = this.children.length;
        result.append(childCount.toString());
        result.append(" child");
        if (childCount !== 1) {
            result.append("ren");
        }
        result.append(")");
    }
    
    toString() {
        return StringBuilder.stringify(this);
    }
}

const rootObject  = BoncleTagTreeObject.Root;
const objectByTag = from(rootObject).toMapBy(tag => tag.name);

function getObject(tag: BoncleTag): BoncleTagTreeObject {
    return objectByTag.get(tag) ?? panic();
}

BoncleTag.getObject     = getObject;
BoncleTag.getRootObject = () => BoncleTagTreeObject.Root;

//////////////////////////////////////
// public | private | open | closed //
//////////////////////////////////////

function createShortcut<K extends keyof BoncleTagTreeObject>(property: K): 
(tag: BoncleTag) => BoncleTagTreeObject[K] {
    return tag => getObject(tag)[property];
}

BoncleTag.isPublic  = createShortcut("isPublic");
BoncleTag.isOpen    = createShortcut("isOpen");
BoncleTag.isErased  = createShortcut("isErased");

///////////////////
// Normalization //
///////////////////

const filler = /[ \-_]/g;
// Note that no canonical tag contains a space

/** 
 * Converts a string to the normalized tag form. 
 * Used to check for equality with other normalized tags. 
 */
export function BoncleTag_normalize(string: string): string {
    return string.toLowerCase().replaceAll(filler, "");
}

//////////////////////
// Canonicalization //
//////////////////////

const tagByNorm = from(BoncleTag).toMapBy(BoncleTag_normalize);

/** 
 * Tries to convert a string to the canonical tag form.
 * Returns undefined if it does not match any normal form. 
 */
export function BoncleTag_tryCanonicalize(string: string): BoncleTag | undefined {
    return tagByNorm.get(BoncleTag_normalize(string));
}

/** 
 * Tries to convert a string to the canonical tag form.
 * Returns the string unchanged if it does not match any normal form. 
 */
export function BoncleTag_canonicalize(string: string): string {
    return BoncleTag_tryCanonicalize(string) ?? string;
}

const checkTag = BoncleTag.check;
export function BoncleTag_parseSet(string: string): BoncleTag[] {
    return (
        string
        .split(BoncleTag_Seperator)
        .filter(identity)
        .map(checkTag)
    );
}
