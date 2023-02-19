import { capitalize } from "../../../(System)/Text/Casing";
import { joinClasses } from "../../../ReactFileClient/ClassHelper";


import { BoncleSetListItem } from "./SetListItem";
import { BoncleSetSize } from "../Domain/Definitions/StandardEnums";
import { BoncleSet } from "../Domain/Set";
import { ReactNode } from "react";
import { StringEnum_create, StringEnum_Member } from "../../../(System)/Data/StringEnum";

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

function *properOrder_iter(
    boncles    : Iterable<BoncleSet>, 
    showHeaders: boolean            ,
): Iterable<JSX.Element> {
    let lastSize: BoncleSetSize = BoncleSetSize.default;
    let lastYear: number        = 2000;
    
    for (const boncle of boncles) {
        const { setNumber, year, setSize } = boncle;
        
        if (showHeaders && year !== lastYear) {
            yield <BoncleSetList_YearHeader key={`${year}`} year={year}/>;
        }
        
        if (showHeaders && setSize !== lastSize) {
            yield <BoncleSetList_SizeHeader key={`${setSize}Of${year}`} size={setSize}/>
        }
        
        yield <BoncleSetListItem key={setNumber} set={boncle}/>;
        
        lastYear = year;
        lastSize = setSize;
    }
}

function properOrder(boncles: Iterable<BoncleSet>, showHeaders: boolean): ReactNode {
    return <>{Array.from(properOrder_iter(boncles, showHeaders))}</>;
}

export function BoncleSetList(props: {
    readonly boncles    : Iterable<BoncleSet>;
    readonly showHeaders: boolean            ;
}): JSX.Element {
    const { boncles, showHeaders } = props;
    
    return <div className={joinClasses("BoncleSetList")}>
        {properOrder(boncles, showHeaders)}
    </div>
}
