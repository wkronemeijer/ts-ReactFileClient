import { Dispatch, memo, ReactNode, SetStateAction, useCallback, useMemo, useReducer, useState } from "react";
import { from, Predicate } from "../../../../(System)/Collections/Sequence";
import { Map_increment, Map_update } from "../../../../(System)/Collections/Map";
import { PersistentSet } from "../../../../(System)/Collections/Persistent/PersistentSet";
import { joinClasses } from "../../../../ReactFileClient/ClassHelper";
import { BoncleDatabase } from "../../Domain/Database";

import { BoncleDisplayElement } from "../../Domain/Definitions/StandardEnums";
import { BoncleTag } from "../../Domain/Definitions/Tag";
import { BoncleSet } from "../../Domain/Set";
import { BoncleSetNumber } from "../../Domain/SetNumber";
import { BoncleSetSelection, BoncleSetSelection_Change, BoncleSetSelection_Empty } from "../../Domain/SetSelection";
import { BoncleTagEnum } from "../../Domain/TagEnum";

const relevantElements: readonly BoncleTag[] = 
    BoncleDisplayElement.values.slice(1) // slice off _displayNone;
; 



const reprByTag = {
    _displayNone  : "➖",
    _displayRed   : "🔴",
    _displayBlue  : "🔵",
    _displayGreen : "🟢",
    _displayYellow: "🟡",
    _displayBlack : "⚫",
    _displayWhite : "⚪",
    
    male:   "♂",
    female: "♀",
} satisfies Partial<Record<BoncleTag, ReactNode>>;
const foo = Object.keys(reprByTag) as (keyof typeof reprByTag)[];


function extractFrequency<T extends BoncleTag>(
    sets: Iterable<BoncleSet>, 
    tags: Iterable<T>,
): ReadonlyMap<T, number> {
    const result = new Map<T, number>;
    
    for (const tag of tags) {
        result.set(tag, 0);
    }
    
    for (const set of sets) {
        const bestFit = set.tags.search(tags);
        if (bestFit) {
            Map_increment(result, bestFit);
        }
    }
    
    return result;
}

export const BoncleSelectionStats = memo((props: {
    readonly visible: readonly BoncleSet[];
    readonly selection: BoncleSetSelection;
    readonly setSelection: BoncleSetSelection_Change;
}): JSX.Element => {
    const { visible, selection, setSelection } = props;
    
    const All_onClick = useCallback(() => 
        setSelection(BoncleSetSelection.from(visible))
    , [visible, setSelection]);
    
    const Clear_onClick = useCallback(() => 
        setSelection(BoncleSetSelection_Empty)
    , [setSelection]);
    
    const counts = useMemo(() => 
        extractFrequency(selection, relevantElements)
    , [selection]);
    
    return <div className="BoncleSelectionStats">
        <div className="Title">Selection statistics</div>
        <div className="Shortcuts">
            <button className="SelectAll" onClick={All_onClick}>
                Select all
            </button>
            <button className="ClearSelection" onClick={Clear_onClick}>
                Clear selection
            </button>
        </div>
        <div>
            {selection.size} set{selection.size !== 1 && 's'} selected
        </div>
        <div className="DisplayElementComparison">
            {Array.from(counts).map(([displayElement, frequency]) => 
            <div 
                key={displayElement} 
                className={joinClasses("Label", displayElement)}
            >
                <span className="Frequency">{frequency}</span>
                <span className="Times">&times;</span>
            </div>)}
        </div>
    </div>
});
