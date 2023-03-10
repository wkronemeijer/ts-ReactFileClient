export type Falsy = 
    | undefined
    | null
    | false
    | 0
    | ""
;

export type Truthy<T> = Exclude<T, Falsy>;
