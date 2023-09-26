import { StringBuildable, StringBuilder } from "../../../../(System)/Text/StringBuilder";
import { assert, requires } from "../../../../(System)/Assert";
import { panic } from "../../../../(System)/Errors";
import { from } from "../../../../(System)/Collections/Sequence";
import { fst, snd } from "../../../../(System)/Function";

import { BoncleWholeYear } from "../Definitions/StandardEnums";
import { BoncleTagEnum } from "./TagEnum";
import { BoncleRule } from "./Rules/Rule";
import { BoncleTag } from "./Tag";

interface IterableEntries {
    entries(): IterableIterator<[BoncleTag, number]>;
}

export interface ReadonlyBoncleTagCollection 
extends Iterable<BoncleTag>, IterableEntries, StringBuildable {
    readonly size: number;
    has(tag: BoncleTag): boolean;
    
    values(): IterableIterator<BoncleTag>;
    
    getDepth(tag: BoncleTag): number | undefined;
    
    getOriginalCollection(): BoncleTagCollection;
    
    /** 
     * Searches for members of the given enum in this tag set. 
     * Returns `undefined` if no member is found. 
     * Prefers members with the lesser depth, and prefers the greater ordinal at an equal depth.  */
    search<E extends BoncleTag>(tags: Iterable<E>): E | undefined;
    /** 
     * Same as {@link search}, but errors if no result is found.
     */
    find<E extends BoncleTag>(tags: BoncleTagEnum<E>): E;
    
    /** 
     * (Specialized) Determines the year of release of this tag set. 
     * The fractional part contains the half-year of release. 
     */
    determineYear(): number;
    
    toString(): string;
}

const isPublic = BoncleTag.isPublic;

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
            "Create a copy of a collection using the constructor.");
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
    
    search<E extends BoncleTag>(iterable: Iterable<E>): E | undefined {
        let result      : E | undefined;
        let resultDepth = Infinity;
        for (const member of iterable) {
            const depth = this.getDepth(member);
            if (depth !== undefined && depth <= resultDepth) {
                result      = member;
                resultDepth = depth;
            }
        }
        return result;
    }
    
    find<E extends BoncleTag>(enum_: BoncleTagEnum<E>): E {
        return this.search(enum_) ?? enum_.default;
    }
    
    /** 
     * (In another language, this would probably be an extension method)
     * Determines the year from the included tag. 
     * 
     */
    determineYear(): number {
        const rawYear  = this.find(BoncleWholeYear);
        const isSummer = this.has("mid");
        return Number(rawYear) + (isSummer ? 0.5 : 0.0);
    }
    
    private * getRootTags(): Iterable<BoncleTag> {
        for (const [tag, depth] of this.entries()) {
            if (depth === 0) {
                yield tag;
            }
        }
    }
    
    getOriginalCollection(): BoncleTagCollection {
        return BoncleTagCollection.from(this.getRootTags());
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
    
    addCollection(other: ReadonlyBoncleTagCollection, extraWeight = 0): void {
        requires(extraWeight >= 0, () => 
            `Weight ${extraWeight} should be non-negative.`);
        for (const [tag, depth] of other.entries()) {
            this.add(tag, depth + extraWeight);
        }
    }
    
    addRoots(other: Iterable<BoncleTag>): void {
        for (const tag of other) {
            this.addRoot(tag);
        }
    }
    
    /** @returns All tags that were modified. */
    applyRule(rule: BoncleRule): Iterable<BoncleTag> {
        const { antecedent, sequents, weight } = rule;
        const touched = new Set<BoncleTag>;
        
        const currentDepth = this.getDepth(antecedent);
        if (currentDepth !== undefined) {
            const seqDepth = currentDepth + weight; // <-- 👀
            for (const seq of sequents) {
                if (this.add(seq, seqDepth)) {
                    touched.add(seq);
                }
            }
        }
        return touched;
    }
    
    weighDown(tag: BoncleTag, extraWeight: number) {
        requires(extraWeight >= 0, () => 
            `Weight ${extraWeight} should be non-negative.`);
        const currentWeight = this.getDepth(tag) ?? panic(
            `Unknown tag '${tag}'.`);
        this.setDepth(tag, currentWeight + extraWeight);
    }
    
    /** Increases the weight of all tags in this collection. */
    weighDownAll(extraWeight: number): void {
        for (const tag of this) {
            this.weighDown(tag, extraWeight);
        }
    }
    
    remove(tag: BoncleTag): boolean {
        return this.depthByTag.delete(tag);
    }
    
    ////////////////////////////////
    // implements StringBuildable //
    ////////////////////////////////
    
    buildString(builder: StringBuilder): void {
        // sort on depth, ascending
        const entries = (
            from(this.depthByTag.entries())
            .orderOn(fst)
            .orderOn(snd)
            .toArray()
        );
        
        let previousDepth = -1;
        for (const [tag, depth] of entries) {
            if (isPublic(tag)) {
                if (depth !== previousDepth) {
                    builder.appendLine();
                    builder.append("[");
                    builder.append(depth.toString());
                    builder.append("] ");
                    previousDepth = depth;
                }
                
                builder.append(tag);
                builder.append(" ");
            }
        }
    }
    
    toString(): string {
        return StringBuilder.stringify(this).trim();
    }
}

export interface BoncleTagCollection_Expander {
    (initial: ReadonlyBoncleTagCollection): BoncleTagCollection;
}
