import { BoncleTag } from "./Definitions/Tag";
import { BoncleSetNumber } from "./SetNumber";

export interface BoncleSetTemplate {
    /** Set number (id) */
    readonly i: BoncleSetNumber;
    /** Name/title */
    readonly n: string;
    /** Tags */
    readonly t: readonly BoncleTag[];
}
