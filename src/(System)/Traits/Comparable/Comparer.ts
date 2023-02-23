import { Satisfies } from "../../Types/Satisfies";
import { Ordering } from "./Ordering";

//////////////
// Comparer //
//////////////

// TODO: As of TS 4.6.7.8 whatever you can do supply type arguments without calling a function.
// So replace with Array<T>.prototype
// ERROR: "prototype" does not exist on T[]
// ???????

type Array_comparer = NonNullable<Parameters<(typeof Array.prototype)["sort"]>[0]>;

export type Comparer<T> = Satisfies<(a: T, b: T) => Ordering, Array_comparer>;
