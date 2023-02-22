import { Dispatch, SetStateAction } from "react";

import { PersistentSet } from "../../../(System)/Collections/Persistent/PersistentSet";
import { BoncleSet } from "./Set";


// As sets are generated once, their object identity is stable
// Does feel a little dirty however...
export type  BoncleSetSelection = PersistentSet<BoncleSet>;
export const BoncleSetSelection = PersistentSet<BoncleSet>;

export type BoncleSetSelection_Change = Dispatch<SetStateAction<BoncleSetSelection>>;

export const BoncleSetSelection_Empty: BoncleSetSelection = BoncleSetSelection.default;
