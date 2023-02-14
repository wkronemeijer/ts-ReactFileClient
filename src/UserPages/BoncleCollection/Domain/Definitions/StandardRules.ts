import { PersistentSet } from "../../../../(System)/Collections/Persistent/PersistentSet";
import { identity } from "../../../../(System)/Function";
import { BoncleTagRule } from "../TagRule";
import { BoncleTag } from "./StandardTags";

////////////////////
// Boncle rule db //
////////////////////

type Split<S extends string, D extends string> =
    string extends S                          ? string[]            :
    S      extends ""                         ? []                  :
    S      extends           `${D}${infer U}` ?        Split<U, D>  :
    S      extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] :
    [S]
;

const delimiter = ' ';

// Hangul spelling for tag
// Why? idk i was bored
function rule<S extends string>(strings: S): Split<S, typeof delimiter> {
    const result: string[] = strings.split(delimiter).filter(identity);
    return result as any;
}

type  rootRule = readonly [BoncleTag, "->", ...readonly BoncleTag[]];
const rootRules: readonly rootRule[] = [
    // Assorted
    rule("skrall -> rock"),
    rule("skrall -> male"), // did we ever see female Skrall? we know they exist
    rule("allStars -> small"),
    
    // Gender rules
    rule("ta  -> male"),
    rule("ga  -> female"),
    rule("le  -> male"),
    rule("ko  -> male"),
    rule("po  -> male"),
    rule("onu -> male"),
    
    // Element -> DisplayElement
    rule("fire   -> displayRed"),
    rule("water  -> displayBlue"),
    rule("air    -> displayGreen"),
    rule("jungle -> displayGreen"),
    rule("ice    -> displayWhite"),
    rule("light  -> displayWhite"),
    rule("stone  -> displayGold"),
    rule("sand   -> displayGold"),
    rule("iron   -> displayGold"),
    rule("earth  -> displayBlack"),
    rule("rock   -> displayBlack"), // Skrall...
    rule("shadow -> displayBlack"),
    // Sizes 
    rule("toa         -> medium"),
    rule("glatorian   -> medium"),
    rule("makutaKarda -> medium"),
    rule("piraka      -> medium"),
    rule("barraki     -> medium"),
    rule("rahkshi     -> medium"),
    rule("turaga      -> small"),
    rule("rahaga      -> small"),
    rule("matoran     -> small"),
    rule("agori       -> small"),
    rule("bohrokVa    -> small"),
    
    // _faction inference 
    rule("makuta -> badGuy"),
    
    //  _theme inference
    rule("2001 -> bionicleGen1"),
    
    // 
    rule("rahi       -> animal"),
    rule("creatureOf -> animal"),
];

// Note on cycles: track new elements in working set, and expand them *once* if they are non-terminals. Should solve cycle issues (cycles become completely boring that way).

function *standardRules_iter(): Iterable<BoncleTagRule> {
    for (const rule of rootRules) {
        const [ante, _, ...cons] = rule;
        yield new BoncleTagRule(ante, new Set(cons));
    }
}

export const BoncleTagStandardRules: readonly BoncleTagRule[] = 
    Array.from(standardRules_iter())
;
