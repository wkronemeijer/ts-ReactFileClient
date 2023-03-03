import { memo } from "react";

import { capitalize } from "../../../../(System)/Text/Casing";

// There is a complicated way of doing this
// And there is what we do
function getSeason(fraction: number): string {
    // Lego has half-yearly releases
    if (fraction > 0.1) {
        return "summer";
    } else {
        return "winter";
    }
}
/** 
 * Converts a fractional year (like 2007.5) into a seasonal year (like "summer 2007"). 
 */
export const BoncleYearLabel = memo(function yearLabel(props: {
    readonly year: number;
    readonly capitalized?: boolean;
}): JSX.Element {
    const { year, capitalized: shouldCapitalize } = props;
    
    const intYear  = Math.floor(year);
    const fraction = year - intYear;
    const season   = getSeason(fraction)
    
    return <>
        {shouldCapitalize ? capitalize(season) : season} {intYear}
    </>;
});
