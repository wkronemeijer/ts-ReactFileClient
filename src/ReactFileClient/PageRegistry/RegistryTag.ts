import { ensures, requires } from "../../(System)/Assert";
import { Newtype } from "../../(System)/Types/Newtype";

export type          RegistryTag       = Newtype<string, typeof RegistryTag_Brand>;
export declare const RegistryTag_Brand : unique symbol;

export function RegistryTag(strings: TemplateStringsArray): RegistryTag {
    requires(strings.length === 1, 
        `Tag should have 1 (and only 1) segment.`);
    const tag = strings[0];
    ensures(tag, `Tag must not be empty.`);
    return tag as RegistryTag;
}
