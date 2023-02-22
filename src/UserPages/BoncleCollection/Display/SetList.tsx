import { capitalize } from "../../../(System)/Text/Casing";
import { collect } from "../../../(System)/Collections/Iterable";

import { joinClasses } from "../../../ReactFileClient/ClassHelper";

import { BoncleSetSelection, BoncleSetSelection_Change } from "../Domain/SetSelection";
import { BoncleSetListItem } from "./SetListItem";
import { BoncleSetSize } from "../Domain/Definitions/StandardEnums";
import { BoncleSet } from "../Domain/Set";

function BoncleSetList_SizeHeader(props: {
    readonly size: BoncleSetSize;
}): JSX.Element {
    const { size } = props;
    
    return <div className="Size Header">
        {capitalize(size)} sets
    </div>
}

function BoncleSetList_YearHeader(props: {
    readonly year: number;
}): JSX.Element {
    const { year } = props;
    
    const realYear      = Math.floor(year);
    const hasFractional = (year - realYear) > 0.1; // Step is 0.5, so epsilon of 0.1 is good enough
    
    return <div className="Year Header">
        Sets of {hasFractional ? "summer" : "winter"} {realYear}
    </div>
}

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

export function BoncleSetList(props: BoncleSetList_Props): JSX.Element {
    return <div className="BoncleSetList">
        {properOrder(props)}
    </div>
}
