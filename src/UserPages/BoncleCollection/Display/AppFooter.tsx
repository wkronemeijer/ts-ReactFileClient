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
    </div>
});
