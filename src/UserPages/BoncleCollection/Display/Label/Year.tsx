import { memo } from "react";

import { capitalize } from "../../../../(System)/Text/Casing";

/** 
 * Converts a fractional year (like 2007.5) into a seasonal year (like "summer 2007"). 
 */
export const BoncleYearLabel = memo(function yearLabel(props: {
    readonly year: number;
    readonly capitalized?: boolean;
}): JSX.Element {
    const { year, capitalized: shouldCapitalize } = props;
    
    const realYear      = Math.floor(year);
    const hasFractional = (year - realYear) > 0.1; 
    // ^ Step is 0.5, so epsilon of 0.1 is good enough
    
    const season = hasFractional ? "summer" : "winter"; 
    // Lego has half-yearly releases, which is convenient for us
    
    return <>
        {shouldCapitalize ? capitalize(season) : season} {realYear}
    </>;
});
