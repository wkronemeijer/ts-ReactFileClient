import { identity } from "../../../../(System)/Function";
import { from } from "../../../../(System)/Collections/Sequence";

import { BoncleRuleArrow } from "../Tagging/Rules/RuleArrow";
import { BoncleRule } from "../Tagging/Rules/Rule";
import { BoncleTag } from "../Tagging/Tag";
import { rule } from "../Tagging/Rules/RuleTools";

////////////////////
// Standard rules //
////////////////////

type rootRule = readonly [
    BoncleTag, 
    BoncleRuleArrow, 
    ...readonly BoncleTag[] 
];
const rootRules: readonly rootRule[] = [
    // Species
    rule("skrall -> black rock male"), // no female skrall sets
    rule("makuta -> male shadow"), // there is 1 female makuta set, out of like 12 
    
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
    rule("Teridax  -> kra black makuta"),
    rule("Antroz   -> male red makutaPhantoka"),
    rule("Gresh    -> male glatorian of jungle"),
    
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
    rule("3-in-1 ~> large"),
    rule("4-in-1 ~> large"),
    
    rule("titan => large"),
    
    rule("bahrag      -> large female"),
    rule("toa         -> medium"),
    rule("glatorian   -> medium"),
    rule("bohrok      -> medium"),
    rule("rahkshi     -> medium"),
    rule("piraka      -> medium"),
    rule("barraki     -> medium"),
    rule("makuta      -> medium"),
    rule("vahki       -> medium"),
    rule("visorak     -> medium rahi"),
    rule("hydruka     -> small rahi"),
    rule("turaga      -> small"),
    rule("rahaga      -> small"),
    rule("matoran     -> small"),
    rule("agori       -> small"),
    rule("bohrokVa    -> small"),
    
    rule("skullHunter  -> medium"),
    rule("masterOf     -> medium"),
    rule("uniterOf     -> medium"),
    rule("protectorOf  -> small"),
    rule("creatureOf  --> small"),
    
    //  _theme inference
    rule("2001 -> gen1 mataNui  "),
    rule("2002 -> gen1 mataNui  "),
    rule("2003 -> gen1 mataNui  "),
    rule("2004 -> gen1 metruNui "),
    rule("2005 -> gen1 metruNui "),
    rule("2006 -> gen1 voyaNui  "),
    rule("2007 -> gen1 mahriNui "),
    rule("2008 -> gen1 kardaNui "),
    rule("2009 -> gen1 baraMagna"),
    rule("2010 -> gen1 baraMagna"),
    rule("2015 -> gen2 okoto    "),
    rule("2016 -> gen2 okoto    "),
];

export const BoncleTagCustomRules: readonly BoncleRule[] = 
    from(rootRules)
    .select(rule => {
        const [antecedent, arrow, ...sequents] = rule;
        return new BoncleRule(antecedent, arrow, sequents);
    })
    .toArray()
;
