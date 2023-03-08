import { Dispatch, SetStateAction } from "react";

import { PersistentSet } from "../../../(System)/Collections/Persistent/PersistentSet";
import { from } from "../../../(System)/Collections/Sequence";
import { BoncleSet } from "./Set";


// As sets are generated once, their object identity is stable
// Does feel a little dirty however...
export type  BoncleSetSelection = PersistentSet<BoncleSet>;
export const BoncleSetSelection = PersistentSet<BoncleSet>;

export type BoncleSetSelection_Change = Dispatch<SetStateAction<BoncleSetSelection>>;

export const BoncleSetSelection_Empty: BoncleSetSelection = BoncleSetSelection.default;

export function BoncleSetSelection_format(self: BoncleSetSelection): string {
    return (
        from(self)
        .ordered()
        .select(set => `${set.setNumber} ${set.name}`)
        .toString('\n')
    );
}
