import { memo, ReactNode } from "react";

import { BoncleMyPossession } from "../../Domain/Definitions/StandardEnums";
import { BoncleSetWidget } from "./Base";

const table = {
    dontHave      : "\u2014",
    want          : "👀\uFE0F",
    reallyWant    : "👀\uFE0F",
    maybeHave     : "?",
    maybeHaveParts: "?",
    have          : "✔\uFE0F",
    built         : "🗿\uFE0F",
} as const satisfies Partial<Record<BoncleMyPossession, ReactNode>>;

export const BoncleSetWidget_Possession = memo((props: {
    readonly possession : BoncleMyPossession;
}): JSX.Element => {
    const { possession } = props;
    
    return <BoncleSetWidget 
        for="Possession" 
        value={possession}
        extraClass="Text"
    >
        {(table as any)[possession]}
    </BoncleSetWidget>;
});
