import { from } from "../../../(System)/Collections/Linq";

import { joinClasses } from "../../../ReactFileClient/ClassHelper";

import { BoncleSetPreview } from "./SetPreview";
import { BoncleSetSize } from "../Domain/CommonDomains";
import { BoncleTag } from "../Domain/Definitions/StandardTags";
import { BoncleSet } from "../Domain/Set";
import { capitalize } from "../../../(System)/Text/Casing";

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
    
    const realYear = Math.floor(year);
    const hasFractional = (year - realYear) > 0.1; // 0.5 step used
    
    return <div className="Year Header">
        Sets of {hasFractional ? "summer" : "winter"} {year}
    </div>
}

function BoncleSetList_Item(props: {
    readonly set: BoncleSet;
}): JSX.Element {
    const { set } = props;
    const { title, tags, element, setNumber, sex, theme, year } = set;
    return <div className={joinClasses("Item", element, theme, sex)}>
        <h3 className="Title">{title}</h3>
        <BoncleSetPreview setNumber={setNumber}/>
        <div className="Tags">
            {from(tags).where(BoncleTag.isPublic).toString()}
        </div>
    </div>;
}

function *properOrder_iter(boncles: Iterable<BoncleSet>): Iterable<JSX.Element> {
    let currentSize: BoncleSetSize = BoncleSetSize.default;
    let currentYear: number        = 2000;
    
    for (const boncle of boncles) {
        const {setNumber, year, size} = boncle;
        
        if (year !== currentYear) {
            yield <BoncleSetList_YearHeader key={`${year}`} year={year}/>;
        }
        
        if (size !== currentSize) {
            yield <BoncleSetList_SizeHeader key={`${size}Of${year}`} size={size}/>
        }
        
        yield <BoncleSetList_Item key={setNumber} set={boncle}/>;
        
        currentYear = year;
        currentSize = size;
    }
}


export function BoncleSetList(props: {
    readonly boncles: Iterable<BoncleSet>
}): JSX.Element {
    const { boncles } = props;
    
    return <div className="BoncleSetList">
        {Array.from(properOrder_iter(boncles))}
    </div>;
}
