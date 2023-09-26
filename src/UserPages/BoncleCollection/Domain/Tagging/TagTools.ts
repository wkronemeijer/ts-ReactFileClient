import { identity } from "../../../../(System)/Function";

import { BoncleTag, BoncleTag_Seperator } from "./Tag";
import { BoncleSetTemplate } from "../SetTemplate";

type Split<S extends string, D extends string> = 
    string extends S ? string[] : 
    S extends           ``               ? []                  : 
    S extends           `${D}${infer U}` ? Split<U, D>         : 
    S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : 
    [S]
;

const delimiter = BoncleTag_Seperator;

export function tags<S extends string>(strings: S): Split<S, typeof delimiter> {
    const result = (
        strings
        .split(delimiter)
        .filter(identity)
    );
    return result as string[] as any;
}

export function common(tags: BoncleTag[]): string {
    return tags.join(delimiter);
}

export function listOf(...templates: readonly BoncleSetTemplate[]): readonly BoncleSetTemplate[] {
    return templates;
}
