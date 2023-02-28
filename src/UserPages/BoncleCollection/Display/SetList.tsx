import { memo } from "react";

import { capitalize } from "../../../(System)/Text/Casing";
import { collect } from "../../../(System)/Collections/Iterable";

import { BoncleSetSelection, BoncleSetSelection_Change } from "../Domain/SetSelection";
import { BoncleSetListItem } from "./SetListItem";
import { BoncleSetSize } from "../Domain/Definitions/StandardEnums";
import { BoncleSet } from "../Domain/Set";
import { BoncleYearLabel } from "./Label/Year";

const BoncleSetList_SizeHeader = memo(function sizeHeader(props: {
    readonly size: BoncleSetSize;
}): JSX.Element {
    const { size } = props;
    
    return <div className="Size Header">
        {capitalize(size)} sets
    </div>
});

const BoncleSetList_YearHeader = memo(function yearHeader(props: {
    readonly year: number;
}): JSX.Element {
    const { year } = props;
    
    return <div className="Year Header">
        Sets of <BoncleYearLabel year={year}/>
    </div>
});

interface BoncleSetList_Props {
    readonly visible      : readonly BoncleSet[];
    readonly selection    : BoncleSetSelection;
    readonly setSelection : BoncleSetSelection_Change;
    readonly insertHeaders: boolean;
}

const properOrder = collect(function* (
    props: BoncleSetList_Props
): Iterable<JSX.Element> {
    const { visible, insertHeaders, selection, setSelection } = props;
    
    let lastSize: BoncleSetSize | undefined;
    let lastYear: number        | undefined;
    
    for (const boncle of visible) {
        const { setNumber, year, setSize } = boncle;
        
        /////////////////
        // Insert year //
        /////////////////
        
        if (insertHeaders && year !== lastYear) {
            yield <BoncleSetList_YearHeader 
                key={`${year}`} 
                year={year}
            />
            lastSize = undefined;
        }
        
        lastYear = year;
        
        /////////////////
        // Insert size //
        /////////////////
        
        if (insertHeaders && setSize !== lastSize) {
            yield <BoncleSetList_SizeHeader 
                key={`${setSize}-${year}`} 
                size={setSize}
            />
        }
        
        lastSize = setSize;
        
        ////////////////
        // Insert set //
        ////////////////
        
        yield <BoncleSetListItem 
            key={setNumber} 
            set={boncle}
            isSelected={selection.has(boncle)}
            setSelection={setSelection}
        />
    }
});

export const BoncleSetList = memo(function setList(props: BoncleSetList_Props): JSX.Element {
    return <div className="BoncleSetList">
        {properOrder(props)}
    </div>
});
