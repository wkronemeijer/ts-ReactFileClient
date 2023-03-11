import { memo } from "react";

import { BoncleTagCustomRules } from "../Domain/Definitions/CustomRules";
import { BoncleTagImpliedRules } from "../Domain/ImpliedRules";
import { BoncleDatabase } from "../Domain/Database";
import { BoncleTag } from "../Domain/Tag";
import { BoncleTagLabel } from "./Label/Tag";

export const BoncleAppFooter = memo(function appFooter(): JSX.Element {
    const { stats, size } = BoncleDatabase;
    
    return <div className="Footer">
        <div className="Title">Stats</div>
        <div className="Assorted">
            <div>The database contains {size} sets</div>
            <div>Each tagged with {BoncleTag.values.length} different tags</div>
            <div>There are {BoncleTagCustomRules.length} manual rules.</div>
            <div>There are {BoncleTagImpliedRules.length} rules implied by their hierarchical nature.</div>
            <div>
                [<BoncleTagLabel tag={stats.mostCommonPublicTag.value}/>] is the most common tag, with {stats.mostCommonPublicTag.frequency} occurences.
            </div>
        </div>
        <div className="HotTakes">
            <p>In my humble opinion, the best Bionicle years, in descending order:</p>
            <ul>
                <li>First wave of Mahri Nui (winter 2007)</li>
                <li>First wave of Glatorians (winter 2009)</li>
                <li>Second wave of Mahri Nui (summer 2007)</li>
                <li>First wave of Toa Mata (2001)</li>
            </ul>
        </div>
        <div className="CopyrightStuff">
            <p>I owe a thank you to the following people:</p>
            <ul>
                <li>LEGO</li>
                <li>BIONICLE</li>
                <li>React</li>
                <li>Webpack</li>
                <li>TypeScript</li>
            </ul>
        </div>
    </div>
});
