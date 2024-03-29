import { BoncleSetNumber } from "./SetNumber";
import { BoncleTag } from "./Tagging/Tag";

export interface BoncleSetTemplate {
    /** Set number (id) */
    readonly i: BoncleSetNumber;
    /** Name and title, optionally seperated by "|" */
    readonly n: string;
    /** Tags */
    readonly t: 
        | readonly BoncleTag[]
    ;
}
