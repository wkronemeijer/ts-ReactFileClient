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
    rule("skrall -> black rock male"), // no female skrall sets
    rule("makuta -> male shadow badGuy"), // there is 1 female makuta set, out of like 12 
    
    rule("matoranOfLight  -> light"),
    rule("matoranOfShadow -> shadow"),
    
    rule("rahi       -> animal"),
    rule("creatureOf -> animal"),
    rule("beastOf    -> animal"),
    rule("sand       -> animal"),
    
    // My opinions and possessions
    rule("want -> like"),
    rule("reallyWant -> love"),
    
    // Famous people 
    rule("Tahu   -> ta "),
    rule("Gali   -> ga "),
    rule("Lewa   -> le "), 
    rule("Kopaka -> ko "),
    rule("Pohatu -> po "),
    rule("Onua   -> onu"), 
    
    rule("Vakama -> ta "),
    rule("Nokama -> ga "),
    rule("Matau  -> le "),
    rule("Nuju   -> ko "),
    rule("Onewa  -> po "),
    rule("Whenua -> onu"),
    
    rule("Jaller -> ta "),
    rule("Hahli  -> ga "),
    rule("Kongu  -> le "),
    rule("Matoro -> ko "),
    rule("Hewkii -> po "),
    rule("Nuparu -> onu"),
    
    rule("Kopeke   -> ko"),
    rule("Macku    -> ga"),
    
    rule("Takanuva -> av white"),
    rule("Antroz   -> male red makutaPhantoka"),
    rule("Gresh    -> male jungle glatorian"),
    
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
    rule("packageDeal -> large"),
    
    rule("bahrag      -> large female"),
    rule("toa         -> medium"),
    rule("glatorian   -> medium"),
    rule("bohrok      -> medium"),
    rule("rahkshi     -> medium"),
    rule("piraka      -> medium"),
    rule("barraki     -> medium"),
    rule("makuta      -> medium"),
    rule("visorak     -> medium badGuy rahi"),
    rule("turaga      -> small"),
    rule("rahaga      -> small"),
    rule("matoran     -> small"),
    rule("hydruka     -> small"),
    rule("agori       -> small"),
    rule("bohrokVa    -> small"),
    
    rule("skullHunter -> medium"),
    rule("masterOf    -> medium"),
    rule("uniterOf    -> medium"),
    rule("protectorOf -> small"),
    rule("creatureOf  -> small"),
    
    // _faction inference 
    
    //  _theme inference
    rule("2001 -> gen1 mataNui        "),
    rule("2002 -> gen1 mataNui        "),
    rule("2003 -> gen1 mataNui        "),
    rule("2004 -> gen1 metruNui       "),
    rule("2005 -> gen1 metruNui       "),
    rule("2006 -> gen1 voyaNui        "),
    rule("2007 -> gen1 mahriNui       "),
    rule("2008 -> gen1 kardaNui       "),
    rule("2009 -> gen1 baraMagna      "),
    rule("2010 -> gen1 baraMagna      "),
    rule("2015 -> gen2 okoto          "),
    rule("2016 -> gen2 okoto          "),
];

export const BoncleTagStandardRules: readonly BoncleTagRule[] = 
    from(rootRules)
    .select(rule => {
        const [antecedent, _arrow, ...sequents] = rule;
        return new BoncleTagRule(antecedent, sequents);
    })
    .toArray()
;
