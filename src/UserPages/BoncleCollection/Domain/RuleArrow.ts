import { StringEnum_create, StringEnum_Member } from "../../../(System)/Data/StringEnum";
import { Member } from "../../../(System)/Data/Enumeration";
import { abstract } from "../../../(System)/Errors";

export type  BoncleRuleArrow = StringEnum_Member<typeof BoncleRuleArrow>;
export const BoncleRuleArrow = StringEnum_create([
    "==",
    "=>",
    "==>",
    "->",
    "-->",
    "~>",
    "~~>",
] as const).extend(Self => ({
    getWeight(self: Member<typeof Self>): number {
        abstract();
    },
}));

//////////////////
// Arrow weight //
//////////////////

const weightByArrow = {
    "==" :         0,
    "=>" :        +1,
    "==>" :      +10,
    "->" :      +100,
    "-->":    +1_000,
    "~>" :   +10_000,
    "~~>":  +100_000,
} satisfies Record<BoncleRuleArrow, number>;

function getWeight(arrow: BoncleRuleArrow): number {
    return weightByArrow[arrow];
}

BoncleRuleArrow.getWeight = getWeight;
