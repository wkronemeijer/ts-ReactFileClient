import { StringEnum_create } from "../../../../(System)/Data/StringEnum";
import { ExpandType } from "../../../../(System)/Types/Magic";
import { abstract } from "../../../../(System)/Errors";
import { collect } from "../../../../(System)/Collections/Iterable";
import { assert } from "../../../../(System)/Assert";
import { Member } from "../../../../(System)/Data/Enumeration";
import { from } from "../../../../(System)/Collections/Sequence";

import { BoncleTagTree, BoncleTagTree_Root } from "./TagTree";
import { BoncleFluency } from "./StandardEnums";

type AllKeys_StringKeys<T> = keyof T & string;
type AllKeys_Spread<T>     = T extends object ? AllKeys<T> : never;
type AllKeys<T> = 
    | AllKeys_StringKeys<T> 
    | AllKeys_Spread<T[AllKeys_StringKeys<T>]>
;

const whitespace = /\s/;

function check(x: string): BoncleTag {
    assert(!whitespace.test(x), 
        () => `Tag '${x}' should not contain whitespace.`);
    assert(!x.startsWith('-'),
        () => `Tag '${x}' should not start with a '-'.`);
    assert(!x.endsWith('-'),
        () => `Tag '${x}' should not end with a '-'.`);
    return x as BoncleTag;
}

const allKeys = collect(function* recurse(
    branch: BoncleTagTree,
): Iterable<BoncleTag> {
    let childBranch: BoncleTagTree | undefined;
    for (const key in branch) {
        yield check(key);
        if (childBranch = branch[key]) {
            yield* recurse(childBranch);
        }
    }
});

const isHidden = (tag: string) => (
    tag.startsWith('_') || 
    BoncleFluency.hasInstance(tag)
);

export type  BoncleTag = ExpandType<AllKeys<typeof BoncleTagTree_Root>>;
export const BoncleTag = StringEnum_create(allKeys(BoncleTagTree_Root))
.extend(Self => ({
    /** The length of the longest tag. */
    maxLength: Math.max(...Self.values.map(value => value.length)),
    /** 
     * Returns true if the tag is fit to be shown to the user.
     * @bound 
     */
    isPublic(self: Member<typeof Self>): boolean {
        return !isHidden(self);
    },
    /** 
     * Return true if the tag is to be hidden from the user.
     * @bound 
     */
    isInternal(self: Member<typeof Self>): boolean {
        return isHidden(self);
    },
} as const))
// These methods are patched in later, because they need external data
.extend(Self => ({
    /** 
     * Converts a string to the normalized tag form. 
     * Used to check for equality with other normalized tags. 
     */
    normalize(string: string): string {
        abstract();
    },
    /** 
     * Tries to convert a string to the canonical tag form.
     * Returns undefined if it does not match any normal form. 
     */
    tryCanonicalize(string: string): BoncleTag | undefined {
        abstract();
    },
    /** 
     * Tries to convert a string to the canonical tag form.
     * Returns the string unchanged if it does not match any normal form. 
     */
    canonicalize(string: string): string {
        abstract();
    }
}));

///////////////////
// Normalization //
///////////////////

const filler = /[ \-_]/g;
// Note that no canonical tag contains a space

function normalize(string: string): string {
    return string.toLowerCase().replaceAll(filler, "");
}

// Unorthodox...but I think it works just fine.
BoncleTag.normalize = normalize;

//////////////////////
// Canonicalization //
//////////////////////

const tagByNorm = from(BoncleTag).toMapBy(normalize);

function tryCanocalize(string: string): BoncleTag | undefined {
    return tagByNorm.get(normalize(string));
}

function canonicalize(string: string): string {
    return tryCanocalize(string) ?? string;
}

BoncleTag.tryCanonicalize = tryCanocalize;
BoncleTag.canonicalize    = canonicalize;
