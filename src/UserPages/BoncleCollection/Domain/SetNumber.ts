import { assert, ensures } from "../../../(System)/Assert";

export type BoncleSetNumber = `${number}-${1 | 2}`; // Thanks EVO

export function BoncleSetNumber(x: unknown): BoncleSetNumber {
    ensures(BoncleSetNumber_hasInstance(x));
    return x;
}

const boncleSetNo_re = /(\d{4,7})-\d/;

export function BoncleSetNumber_getId(self: BoncleSetNumber): number {
    const match = boncleSetNo_re.exec(self);
    assert(match);
    const result = Number(match[1]);
    ensures(isFinite(result));
    return result;
}

export function BoncleSetNumber_hasInstance(x: unknown): x is BoncleSetNumber {
    return typeof x === "string" && boncleSetNo_re.test(x);
}

export function BoncleSetNumber_toString(self: BoncleSetNumber): string {
    return self.slice(0, -2);
}
