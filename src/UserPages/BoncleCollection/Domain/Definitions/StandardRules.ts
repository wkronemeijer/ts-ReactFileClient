import { collect } from "../../../../(System)/Collections/Iterable";
import { from } from "../../../../(System)/Collections/Sequence";
import { identity } from "../../../../(System)/Function";

import { BoncleTagRule } from "../TagRule";
import { BoncleTag } from "./Tag";

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
    // Species
    rule("skrall -> rock male"), // no female skrall sets
    rule("makuta -> shadow badGuy"),
    
    rule("matoranOfLight  -> light"),
    rule("matoranOfShadow -> shadow"),
    
    rule("rahi       -> animal"),
    rule("creatureOf -> animal"),
    rule("beastOf    -> animal"),
    
    // My opinions and possessions
    rule("want -> like    "),
    
    // Famous people 
    rule("tahu   -> ta "),
    rule("gali   -> ga "),
    rule("lewa   -> le "), 
    rule("kopaka -> ko "),
    rule("pohatu -> po "),
    rule("onua   -> onu"), 
    
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
    
    rule("takanuva -> av white"),
    rule("antroz   -> makutaPhantoka red"),
    rule("gresh    -> glatorian jungle"),
    
    // Gender rules
    rule("ta  -> male"),
    rule("ga  -> female"),
    rule("le  -> male"),
    rule("ko  -> male"),
    rule("po  -> male"),
    rule("onu -> male"),
    
    // Element -> DisplayElement
    rule("fire   -> red"),
    rule("water  -> blue"),
    rule("air    -> green"),
    rule("jungle -> green"),
    rule("ice    -> white"),
    rule("light  -> white"),
    rule("stone  -> yellow"),
    rule("sand   -> yellow"),
    rule("iron   -> yellow"),
    rule("earth  -> black"),
    rule("rock   -> black"), // Skrall...
    rule("shadow -> black"),
    
    // Sizes 
    rule("bahrag    -> large"),
    rule("toa       -> medium"),
    rule("glatorian -> medium"),
    rule("bohrok    -> medium"),
    rule("rahkshi   -> medium"),
    rule("piraka    -> medium"),
    rule("barraki   -> medium"),
    rule("makuta    -> medium"),
    rule("turaga    -> small"),
    rule("rahaga    -> small"),
    rule("matoran   -> small"),
    rule("hydruka   -> small"),
    rule("agori     -> small"),
    rule("bohrokVa  -> small"),
    rule("allStars  -> small"),
    
    rule("skullHunter -> medium"),
    rule("masterOf    -> medium"),
    rule("uniterOf    -> medium"),
    rule("protectorOf -> small"),
    rule("creatureOf  -> small"),
    
    // _faction inference 
    
    //  _theme inference
    rule("2001 -> bionicleGen1 mataNui        "),
    rule("2002 -> bionicleGen1 mataNui        "),
    rule("2003 -> bionicleGen1 mataNui        "),
    rule("2004 -> bionicleGen1 metruNui       "),
    rule("2005 -> bionicleGen1 metruNui       "),
    rule("2006 -> bionicleGen1 voyaNui        "),
    rule("2007 -> bionicleGen1 mahriNui       "),
    rule("2008 -> bionicleGen1 kardaNui       "),
    rule("2009 -> bionicleGen1 baraMagna      "),
    rule("2010 -> bionicleGen1 baraMagna      "),
    rule("2015 -> bionicleGen2 okoto          "),
    rule("2016 -> bionicleGen2 okoto          "),
    
    // Weesa not animal!
];

// Note on cycles: track new elements in working set, and expand them *once* if they are non-terminals. Should solve cycle issues (cycles become completely boring that way).

export const BoncleTagStandardRules: readonly BoncleTagRule[] = 
    from(rootRules)
    .select(rule => {
        const [antecedent, _arrow, ...sequents] = rule;
        return new BoncleTagRule(antecedent, sequents);
    })
    .toArray()
;
