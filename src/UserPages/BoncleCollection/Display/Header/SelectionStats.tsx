import { Dispatch, memo, SetStateAction, useCallback, useMemo, useReducer, useState } from "react";
import { from, Predicate } from "../../../../(System)/Collections/Linq";
import { PersistentSet } from "../../../../(System)/Collections/Persistent/PersistentSet";
import { BoncleDatabase } from "../../Domain/Database";

import { BoncleDisplayElement } from "../../Domain/Definitions/StandardEnums";
import { BoncleTag } from "../../Domain/Definitions/Tag";
import { BoncleSet } from "../../Domain/Set";
import { BoncleSetNumber } from "../../Domain/SetNumber";
import { BoncleSetSelection, BoncleSetSelection_Change, BoncleSetSelection_Empty } from "../../Domain/SetSelection";


/* 
Idea: 


Selected
Owned + selected
All


*/

const selectAll = from(BoncleDatabase).select(set => set.setNumber) 

export const BoncleSelectionStats = memo((props: {
    readonly visible: readonly BoncleSet[];
    readonly selection: BoncleSetSelection;
    readonly setSelection: BoncleSetSelection_Change;
}): JSX.Element => {
    const { visible, selection, setSelection } = props;
    
    const onSelectAll = useCallback(() => 
        setSelection(BoncleSetSelection.from(visible))
    , [setSelection]);
    
    const onClear = useCallback(() => 
        setSelection(BoncleSetSelection_Empty)
    , [setSelection]);
    
    return <div className="BoncleSelectionStats">
        <div className="Title">Selection statistics</div>
        <div className="Shortcuts">
            <button className="SelectAll" onClick={onSelectAll}>Select all</button>
            <button className="ClearSelection" onClick={onClear}>Clear selection</button>
        </div>
        <div className="DisplayElementComparison">
            {BoncleDisplayElement.values.map(displayElement => 
            <div key={displayElement} className={displayElement}>
                {BoncleDisplayElement.toEmoji(displayElement)}
            </div>)}
        </div>
    </div>
});
