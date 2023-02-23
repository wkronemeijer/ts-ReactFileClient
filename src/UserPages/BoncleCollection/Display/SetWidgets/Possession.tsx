import { memo, ReactNode } from "react";

import { BoncleMyPossession } from "../../Domain/Definitions/StandardEnums";
import { BoncleSetWidget } from "./Base";

const test = "☐\uFE0E 👀\uFE0E ☑\uFE0E";

const table = {
    dontHave: "\u2014",
    want    : "👀\uFE0F",
    havePartially: "🤔",
    have    : "✔\uFE0F",
} as const satisfies Record<BoncleMyPossession, ReactNode>;


export const BoncleSetWidget_Possession = memo((props: {
    readonly possession : BoncleMyPossession;
}): JSX.Element => {
    const { possession } = props;
    
    return <BoncleSetWidget 
        for="Possession" 
        value={possession}
        extraClass="Text"
    >
        {table[possession]}
    </BoncleSetWidget>;
});
