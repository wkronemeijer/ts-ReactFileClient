
// Arcane type magic
// from https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
/** Converts a union of types into a intersection of those types. */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;


// From https://github.com/microsoft/TypeScript/pull/40336
export type Methods<T> = { [P in keyof T as T[P] extends Function ? P : never]: T[P] };
export type Fields<T>  = { [P in keyof T as T[P] extends Function ? never : P]: T[P] };


// https://github.com/microsoft/TypeScript/issues/28508#issuecomment-775742020
export type ExpandType<T> = {} & { [P in keyof T]: T[P] };

export type ReplaceThis<T, NewThis> = {
    [P in keyof T]: 
    T[P] extends (...args: any) => any 
    ? (this: NewThis, ...args: Parameters<T[P]>) => ReturnType<T[P]>
    : T[P];
}
