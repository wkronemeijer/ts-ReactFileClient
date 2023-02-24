import { memo } from "react";

import { BoncleTagStandardRules } from "../Domain/Definitions/StandardRules";
import { BoncleTagImpliedRules } from "../Domain/Definitions/ImpliedRules";
import { BoncleDatabase } from "../Domain/Database";
import { BoncleTag } from "../Domain/Definitions/Tag";

export const BoncleAppFooter = memo(() => {
    return <div className="Footer">
        <div className="Title">Stats</div>
        <div className="Assorted">
            <div>{BoncleDatabase.size} sets</div>
            <div>{BoncleTag.values.length} tags</div>
            <div>{BoncleTagStandardRules.length} standard rules</div>
            <div>{BoncleTagImpliedRules.length} implied rules</div>
        </div>
        <div className="HotTakes">
            <p>In my humble opinion, the best Bionicle years, in descending order:</p>
            <ul>
                <li>Both waves of Mahri Nui (2007)</li>
                <li>First wave of Glatorians (winter 2009)</li>
                <li>First wave of Toa Mata (2001)</li>
            </ul>
        </div>
        <div className="CopyrightStuff">
            <p>I owe a thank you to the following people:</p>
            <ul>
                <li>LEGO and BIONICLE</li>
                <li>React and Webpack</li>
                <li>TypeScript</li>
            </ul>
        </div>
    </div>
});
