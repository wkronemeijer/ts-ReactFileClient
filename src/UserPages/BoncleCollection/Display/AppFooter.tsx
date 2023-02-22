import { memo } from "react";

import { BoncleTagStandardRules } from "../Domain/Definitions/StandardRules";
import { BoncleTagImpliedRules } from "../Domain/Definitions/ImpliedRules";
import { BoncleDatabase } from "../Domain/Database";
import { BoncleTag } from "../Domain/Definitions/Tag";

export const BoncleAppFooter = memo(() => {
    return <div className="Footer">
        <h2>Stats</h2>
        <p>Here are some fun stats:</p>
        <ul>
            <li>There are {BoncleDatabase.size} sets in the database.</li>
            <li>There are {BoncleTag.values.length} tags in the database.</li>
            <li>There are {BoncleTagStandardRules.length} standard rules.</li>
            <li>There are {BoncleTagImpliedRules.length} implied rules.</li>
        </ul>
    </div>
});
