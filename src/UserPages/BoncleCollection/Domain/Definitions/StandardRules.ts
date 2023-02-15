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
    
    // Famous people 
    rule("tahu   -> ta "),
    rule("gali   -> ga "),
    rule("lewa   -> le "),
    rule("kopaka -> ko "),
    rule("pohatu -> po "),
    rule("onua   -> onu"), // Wait a sec...
    
    rule("vakama -> ta "),
    rule("nokama -> ga "),
    rule("matau  -> le "),
    rule("nuju   -> ko "),
    rule("onewa  -> po "),
    rule("whenua -> onu"),
    
    rule("jaller -> ta "),
    rule("hahli  -> ga "),
    rule("kongu  -> le "),
    rule("matoro -> ko "),
    rule("hewkii -> po "),
    rule("nuparu -> onu"),
    
    rule("kopeke   -> ko"),
    rule("macku    -> ga"),
    
    rule("takanuva -> av"),
    
    // Gender rules
    rule("ta  -> male"),
    rule("ga  -> female"),
    rule("le  -> male"),
    rule("ko  -> male"),
    rule("po  -> male"),
    rule("onu -> male"),
    
    // Element -> DisplayElement
    rule("fire   -> _displayRed"),
    rule("water  -> _displayBlue"),
    rule("air    -> _displayGreen"),
    rule("jungle -> _displayGreen"),
    rule("ice    -> _displayWhite"),
    rule("light  -> _displayWhite"),
    rule("stone  -> _displayGold"),
    rule("sand   -> _displayGold"),
    rule("iron   -> _displayGold"),
    rule("earth  -> _displayBlack"),
    rule("rock   -> _displayBlack"), // Skrall...
    rule("shadow -> _displayBlack"),
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
    rule("hydruka     -> small"),
    rule("agori       -> small"),
    rule("bohrokVa    -> small"),
    
    // _faction inference 
    rule("makuta -> badGuy"),
    
    //  _theme inference
    rule("2001 -> bionicleGen1"),
    rule("2002 -> bionicleGen1"),
    rule("2003 -> bionicleGen1"),
    rule("2004 -> bionicleGen1"),
    rule("2005 -> bionicleGen1"),
    rule("2006 -> bionicleGen1"),
    rule("2007 -> bionicleGen1"),
    rule("2008 -> bionicleGen1"),
    rule("2009 -> bionicleGen1"),
    rule("2010 -> bionicleGen1"),
    rule("2015 -> bionicleGen2"),
    rule("2016 -> bionicleGen2"),
    
    // Weesa not animal!
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
