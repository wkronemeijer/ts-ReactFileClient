import { StringBuildable, StringBuilder } from "../../../(System)/Text/StringBuilder";
import { constant } from "../../../(System)/Function";
import { panic } from "../../../(System)/Errors";
import { from } from "../../../(System)/Collections/Linq";

import { BoncleReleaseYear } from "./Definitions/StandardEnums";
import { BoncleTag } from "./Definitions/Tag";
import { BoncleTagEnum } from "./TagEnum";
import { BoncleTagRule } from "./TagRule";
import { assert } from "../../../(System)/Assert";


interface IterableEntries {
    entries(): IterableIterator<[BoncleTag, number]>;
}

export interface ReadonlyBoncleTagCollection 
extends Iterable<BoncleTag>, IterableEntries, StringBuildable {
    readonly size: number;
    has(tag: BoncleTag): boolean;
    
    values(): IterableIterator<BoncleTag>;
    
    getDepth(tag: BoncleTag): number | undefined;
    
    /** Returns {@link true} if all tags in this set have depth 0. */
    isUnexpanded(): boolean;
    
    /** 
     * Searches for members of the given enum in this tag set. 
     * Returns `undefined` if no member is found. 
     * Prefers members with the lesser depth, and prefers the greater ordinal at an equal depth.  */
    search<E extends BoncleTag>(tenum: BoncleTagEnum<E>): E | undefined;
    /** 
     * Same as {@link search}, but defaults to the given enum's {@link BoncleTagEnum.default} if no member is found. 
     */
    find<E extends BoncleTag>(tenum: BoncleTagEnum<E>): E;
    
    /** 
     * (Specialized) Determines the year of release of this tag set. 
     * The fractional part contains the half-year of release. 
     */
    determineYear(): number;
    
    toString(): string;
}

export class BoncleTagCollection 
implements ReadonlyBoncleTagCollection {
    private readonly depthByTag: Map<BoncleTag, number>;
    
    get size(): number {
        return this.depthByTag.size;
    }
    
    constructor(reference?: IterableEntries) {
        this.depthByTag = new Map(reference?.entries());
        // ^ Why doesn't the above line error?
    }
    
    /** Constructs a source set from an iterable. */
    static from(iterable: Iterable<BoncleTag>): BoncleTagCollection {
        assert(!(iterable instanceof BoncleTagCollection), 
            "Create a copy using the constructor.");
        const result = new BoncleTagCollection;
        for (const item of iterable) {
            result.addRoot(item);
        }
        return result;
    }
    
    ////////////////////////////
    // implements ReadonlyMap //
    ////////////////////////////
    
    has(tag: BoncleTag): boolean {
        return this.depthByTag.has(tag);
    }
    
    getDepth(tag: BoncleTag): number | undefined {
        return this.depthByTag.get(tag);
    }
    
    private setDepth(tag: BoncleTag, depth: number): void {
        this.depthByTag.set(tag, depth);
    }
    
    values(): IterableIterator<BoncleTag> {
        return this.depthByTag.keys(); // ironic
    }
    
    entries(): IterableIterator<[BoncleTag, number]> {
        return this.depthByTag.entries();
    }
    
    [Symbol.iterator](): IterableIterator<BoncleTag> {
        return this.depthByTag.keys();
    }
    
    /////////////////////////////////////
    // implements ReadonlyBoncleTagSet //
    /////////////////////////////////////
    
    isUnexpanded(): boolean {
        for (const depth of this.depthByTag.values()) {
            if (depth !== 0) {
                return false;
            }
        }
        return true;
    }
    
    search<E extends BoncleTag>(tagEnum: BoncleTagEnum<E>): E | undefined {
        let result      : E | undefined;
        let resultDepth = Infinity;
        for (const member of tagEnum) {
            const depth = this.getDepth(member);
            if (depth !== undefined && depth <= resultDepth) {
                result      = member;
                resultDepth = depth;
            }
        }
        return result;
    }
    
    find<E extends BoncleTag>(tagEnum: BoncleTagEnum<E>): E {
        return this.search(tagEnum) ?? tagEnum.default;
    }
    
    /** 
     * (In another language, this would probably be an extension method)
     * Determines the year from the included tag. 
     * 
     */
    determineYear(): number {
        const rawYear  = this.find(BoncleReleaseYear);
        const isSummer = this.has("mid");
        return Number(rawYear) + (isSummer ? 0.5 : 0.0);
    }
    
    /////////////////////////////
    // implements BoncleTagSet //
    /////////////////////////////
    
    /** 
     * Adds the given tag to this set 
     * if it wasn't added yet, or the depth is lower than before.
     * 
     * @returns Whether a change was made.
     */
    add(tag: BoncleTag, depth: number): boolean {
        // Actually had a bug here
        // if (currentDepth) fails on 0 🤡
        const currentDepth = this.getDepth(tag);
        const doUpdate = (
            currentDepth === undefined || 
            depth < currentDepth
        );
        if (doUpdate) {
            this.setDepth(tag, depth);
        }
        return doUpdate;
    }
    
    addRoot(tag: BoncleTag): boolean {
        return this.add(tag, 0);
    }
    
    /** @returns All tags that were modified. */
    applyRule(rule: BoncleTagRule): Iterable<BoncleTag> {
        const { antecedent, sequents } = rule;
        const touched = new Set<BoncleTag>;
        
        const currentDepth = this.getDepth(antecedent);
        if (currentDepth !== undefined) {
            const seqDepth = currentDepth + 1; // <-- 👀
            for (const seq of sequents) {
                if (this.add(seq, seqDepth)) {
                    touched.add(seq);
                }
            }
        }
        return touched;
    }
    
    ////////////////////////////////
    // implements StringBuildable //
    ////////////////////////////////
    
    buildString(builder: StringBuilder): void {
        for (const [tag, depth] of this.depthByTag.entries()) {
            if (BoncleTag.isPublic(tag)) {
                builder.append(tag);
                builder.append("(");
                builder.append(depth.toString());
                builder.append(") ");
            }
        }
    }
    
    toString(): string {
        return StringBuilder.stringify(this).trim();
    }
}
