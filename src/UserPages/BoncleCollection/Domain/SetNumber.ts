import { ensures } from "../../../(System)/Assert";

export type BoncleSetNumber = `${number}-${1 | 2}`; // Thanks EVO

export function BoncleSetNumber(x: unknown): BoncleSetNumber {
    ensures(BoncleSetNumber_hasInstance(x));
    return x;
}

const boncleSetNo_re = /\d{4,7}-\d/;

export function BoncleSetNumber_hasInstance(x: unknown): x is BoncleSetNumber {
    return typeof x === "string" && boncleSetNo_re.test(x);
}

export function BoncleSetNumber_toString(setNo: BoncleSetNumber): string {
    return setNo.slice(0, -2);
}
