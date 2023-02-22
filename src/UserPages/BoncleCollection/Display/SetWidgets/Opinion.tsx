import { memo, ReactNode } from "react";

import { BoncleMyOpinion } from "../../Domain/Definitions/StandardEnums";
import { BoncleSetWidget } from "./Base";

const table = {
        dislike   : "👎",
        ambivalent: "\u2014",
        like      : "👍",
        love      : "❤\uFE0F",
} as const satisfies Record<BoncleMyOpinion, ReactNode>;

export const BoncleSetWidget_Opinion = memo((props: {
    readonly opinion: BoncleMyOpinion;
}): JSX.Element => {
    const { opinion } = props;
    
    return <BoncleSetWidget 
        for="Opinion" 
        value={opinion}
        extraClass="Text"
    >
        {table[opinion]}
    </BoncleSetWidget>;
});
