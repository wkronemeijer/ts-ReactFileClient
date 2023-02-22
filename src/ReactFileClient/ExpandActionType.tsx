import { ExpandType } from "../(System)/Types/Magic";

// TODO: Name is a little vague. Thing of a better name 
// (that does not involve expandtype, that's just an implementation thing.)
export type ExpandActionType<T extends object> = T extends any ? ExpandType<({
    [P in keyof T]: { readonly kind: P; } & T[P];
})[keyof T]> : never;
