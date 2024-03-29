import { memo, ReactNode, useCallback, useMemo } from "react";

import { Map_increment } from "../../../../(System)/Collections/Map";
import { from } from "../../../../(System)/Collections/Sequence";

import { joinClasses } from "../../../../ReactFileClient/ClassHelper";

import { BoncleSetSelection, BoncleSetSelection_Change, BoncleSetSelection_Empty, BoncleSetSelection_format } from "../../Domain/SetSelection";
import { BoncleDisplayElement } from "../../Domain/Definitions/StandardEnums";
import { BoncleTag } from "../../Domain/Tagging/Tag";
import { BoncleSet } from "../../Domain/Set";

const relevantElements: readonly BoncleTag[] = 
    from(BoncleDisplayElement)
    .where(color => color !== "_displayNone")
    .toArray()
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

export const BoncleSelectionStats = memo(function selectionStats(props: {
    readonly visible: readonly BoncleSet[];
    readonly selection: BoncleSetSelection;
    readonly setSelection: BoncleSetSelection_Change;
}): JSX.Element {
    const { visible, selection, setSelection } = props;
    
    const All_onClick = useCallback(() => 
        setSelection(BoncleSetSelection.from(visible))
    , [visible, setSelection]);
    
    const Clear_onClick = useCallback(() => 
        setSelection(BoncleSetSelection_Empty)
    , [setSelection]);
    
    const Copy_onClick = useCallback(() => {
        if (selection.size > 0) {
            const setList = BoncleSetSelection_format(selection);
            navigator.clipboard.writeText(setList);
        }
    }, [selection]);
    
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
            <button className="CopySelection" onClick={Copy_onClick}>
                Copy selection to clipboard
                {/* TODO: Make it say "Copied!" for a split second. */}
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
                <span className="Frequency">
                    {frequency.toString().padStart(3, '0')}
                </span>
            </div>)}
        </div>
    </div>
});
