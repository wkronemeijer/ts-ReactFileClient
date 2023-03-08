import { StringEnum_create, StringEnum_Member } from "../../../(System)/Data/StringEnum";
import { Member } from "../../../(System)/Data/Enumeration";
import { abstract } from "../../../(System)/Errors";

export type  BoncleTagRuleArrow = StringEnum_Member<typeof BoncleTagRuleArrow>;
export const BoncleTagRuleArrow = StringEnum_create([
    "==",
    "=>",
    "->",
    "~>",
] as const).extend(Self => ({
    getWeight(self: Member<typeof Self>): number {
        abstract();
    },
}));

//////////////////
// Arrow weight //
//////////////////

const weightByArrow = {
    "==":   0,
    "=>":   1,
    "->":  10,
    "~>": 100,
} satisfies Record<BoncleTagRuleArrow, number>;

function getWeight(arrow: BoncleTagRuleArrow): number {
    return weightByArrow[arrow];
}

BoncleTagRuleArrow.getWeight = getWeight;
