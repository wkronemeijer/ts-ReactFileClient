// There is a desire for negative rules
// badGuy -> -goodGuy
// But how do you resolve conflicts? And loops?
// currently solved with default of depth 10+, making it easily overwritten

/** 
 * All collections will have this tag included 
 * (at an absurdly high weight). 
 * Best paired with {@link Exclusive}. 
 */
const Default   = Symbol("Default");
/** 
 * Sets can have only one of the direct child tags on them. Useful if certain criteria overlap.
 */
const Exclusive = Symbol("Exclusive");
/**
 * Whether this tag can be a sequent of a rule. 
 * Generally used for grouping tags, 
 * or as the parent of a {@link Default} tag.
 */
const Closed    = Symbol("Closed");
/** 
 * Whether this tag shows up in the tag search and on the set hover. 
 */
const Private   = Symbol("Private");
/** 
 * Tag will be erased before expansion. 
 * Only really useful for making more fluent sentences. 
 * 
 * **NB**: This tag is inherited. 
 */
const Erased    = Symbol("Erased");

export const BoncleTagTree_Default  : typeof Default   = Default;
export const BoncleTagTree_Exclusive: typeof Exclusive = Exclusive;
export const BoncleTagTree_Closed   : typeof Closed    = Closed;
export const BoncleTagTree_Private  : typeof Private   = Private;
export const BoncleTagTree_Erased   : typeof Erased    = Erased;
// ^ Starting to feel like Java, repeating everything 4 times

/*
Idea with MutuallyExclusive is that finding a tag, means searching for the "best" tag (same algo as .search) and removing the others.
*/

export interface BoncleTagTree {
    [Private]  ?: boolean;
    [Closed]   ?: boolean;
    
    [Exclusive]?: true;
    [Default]  ?: true;
    [Erased]   ?: true;
    [s: string] : BoncleTagTree;
}

export const BoncleTagTree_Root = {
    __root__   : {},
    __default__: {},
    
    $displayElements: {
        [Exclusive]: true,
        _displayNone: { // ➖
            [Default]: true,
        },
        // Opponent process colors...
        _displayWhite: { // ⚪
            white : {},
            silver: {},
        },
        _displayRed: { // 🔴
            red   : {},
            bronze: {},
        },
        _displayBlue: { // 🔵
            cyan  : {},
            blue  : {},
            purple: {},
        },
        _displayGreen: { // 🟢
            green: {},
            lime : {},
        },
        _displayYellow: { // 🟡
            tan   : {},
            brown : {},
            orange: {},
            yellow: {},
            gold  : {},
        },
        _displayBlack: { // ⚫
            gray    : {},
            black   : {},
            gunmetal: {},
        },
    },
    $opinion: {
        dislike : {
            hate: {},
        },
        whatever: {},
        like: {
            love: {},
        },
    },
    $rating: {
        [Exclusive]: true,
        unrated: { [Default]: true },
         "0/10": {},
         "1/10": {},
         "2/10": {},
         "3/10": {},
         "4/10": {},
         "5/10": {},
         "6/10": {},
         "7/10": {},
         "8/10": {},
         "9/10": {},
        "10/10": {},
    },
    $ratingRange: {
        // "0+": {}, // Just use -unrated
        "1+": {}, 
        "2+": {},
        "3+": {},
        "4+": {},
        "5+": {},
        "6+": {},
        "7+": {},
        "8+": {},
        "9+": {},
        // "10+": {}, // Just use 10/10
    },
    
    $possession: {
        [Exclusive]: true,
        dontHave: {
            [Default]: true,
            want: {
                reallyWant: {},
                
                niceToHave: {},
                likeToHave: {},
                loveToHave: {},
            },
        },
        maybeHave: {
            maybeHaveParts: {},
        },
        have: {
            incomplete: {
                // do you "have" a thing if its incomplete?
                // maybeHave 
            }, 
            complete: {
                built: {},
            },
        },
    },
    
    $seasonOfRelease: {
        [Exclusive]: true,
        // winter provided for symmetry
        winter: {
            [Default]: true,
        },
        summer: {
            // "mid 2002" reads well
            mid: {},
        },
    },
    $yearOfRelease: {
        [Exclusive]: true,
        "2001": {},
        "2002": {},
        "2003": {},
        "2004": {},
        "2005": {},
        "2006": {},
        "2007": {},
        "2008": {},
        "2009": {},
        "2010": {},
        "2015": {},
        "2016": {},
        // No, GWP does not count
    },
    
    $theme: {
        [Exclusive]: true,
        gen1: {},
        gen2: {},
        // Screw hero factory
        // Seriously, HF sets have 0 response on me.
    },
    
    $sex: {
        male  : {},
        female: {},
    },
    
    $packageDeal: {
        [Exclusive]: true,
        "1-in-1": { [Default]: true, },
        // TODO: Do you really care how big it is?
        "2-in-1": {},
        "3-in-1": {},
        "4-in-1": {},
    },
    
    elemental: { // in ascending order
        rock  : {         },
        earth : { onu: {} },
        sand  : {         },
        stone : { po : {} },
        ice   : { ko : {} },
        jungle: {         },
        air   : { le : {} },
        water : { ga : {} },
        fire  : { ta : {} },
        
        shadow: { kra: {} },
        light : { av : {} },
        
        _specialElement: {
            electricity: {},
            magnetism: {},
            vacuum: {},
            plasma: {},
            gravity: {},
            sonics: {},
            iron: {},
        },
    },
    $sized: {
        [Exclusive]: true,
        // Use explicit size when combining
        unsized: { [Default]: true },
        small: {},
        medium: {},
        large: {
            titan: {},
            // Whats the difference between large and huge?
            // Idk maybe we split them later again, there is never more than 1 huge set per year.
            huge: {},
        },
    },
    $location: {
        aquaMagna: {
            mataNui: {},
            voyaNui: {},
            mahriNui: {},
            greatSpiritRobot: {
                metruNui: {},
                kardaNui: {},
            },
        },
        baraMagna: {},
        okoto: {},
    },
    $species: {
        unknownSpecies: {

        },
        unnamedSpecies: {
            steltian: {},
        },
        _matoranUniverseSpecies: {
            rahi: {
                hydruka: {},
                visorak: {},
            },
            
            matoran: {
                matoranMata: {},
                matoranNuva: {},
                matoranMetru: {},
                matoranInika: {},
                matoranMahri: {},
                matoranKarda: {
                    matoranOfLight: {},
                    matoranOfShadow: {},
                },
            },
            rahaga: {},
            turaga: {
                turagaMata: {},
                turagaMetru: {},
            },
            // technically toa are a kind of matoran
            toa: {
                toaMata: {},
                toaNuva: {
                    // Technically Phantoka were still normal Nuva, just with new armor
                    // But for all set purposes they could be entirely different people
                    
                    // Also the toa team is still called Toa Mata 🤡
                },
                toaMetru: {},
                toaHordika: {},
                toaInika: {},
                toaMahri: {},
                toaKarda: {
                    toaPhantoka: {},
                    toaMistika: {},
                },
                toaCordak: {},
                toaMangai: {},
                toaHagah: {},
            },
            vahki: {},
            
            bohrok: {
                bohrokKal: {},
                bahrag: {},
            },
            bohrokVa: {},
            rahkshi: {},
            skakdi: {
                piraka: {},
            },
            vortixx: {},
            barraki: {},
            makuta: {
                makutaKarda: {
                    makutaPhantoka: {},
                    makutaMistika: {},
                },
            },
        },
        _spherusMagnaSpecies: {
            agori: {
                boneHunter: {},
            },
            glatorian: {
                glatorianLegend: {},
            },
            skrall: {},
        },
        _okotoSpecies: {
            creatureOf: {},
            beastOf: {},
            okotan: {
                protectorOf: {},
            },
            okoToa: {
                masterOf: {},
                uniterOf: {},
            },
            skullHunter: {},
        },
    },
    namedCharacters: { 
        // Only ones with a capital letter (so far)
        ogToaTeam: {
            Tahu: {},
            Gali: {},
            Lewa: {},
            Kopaka: {},
            Pohatu: {},
            Onua: {},
        },
        ogTuragaTeam: {
            Vakama: {},
            Nokama: {},
            Matau: {},
            Nuju: {},
            Onewa: {},
            Whenua: {},
        },
        ogMatoran: {
            ogMatoranTeam: {
                Jaller: {},
                Hahli: {},
                Kongu: {},
                Matoro: {},
                Hewkii: {},
                Nuparu: {},
            },
            Kopeke: {},
            Macku: {},
        },
        Iruini: {},
        Norik: {},
        
        Takanuva: { Takua: {} },
        Teridax: { Terry: {} },
        Antroz: {},
        Gresh: {},
        
        ToaMataNui: {},
        Ekimu: {},
        Umarak: {},
    },
    // These models are excluded from the set list
    // should be implied, so $ is inappropriate
    _excluded: {
        combinerModel: {},
        playset: {},
        booster: {
            ammo: {},
        },
    },
    $uncategorized: {
        animal: {},
        vehicle: {},
        stationary: {},
        promotional: {},
    },
    selection: { [Closed]: true },
    $fluent: {
        "i"  : { [Erased]: true },
        "/"  : { [Erased]: true },
        "|"  : { [Erased]: true },
        "&"  : { [Erased]: true },
        "is" : { [Erased]: true },
        "of" : { [Erased]: true },
        "or" : { [Erased]: true },
        "it" : { [Erased]: true },
        "and": { [Erased]: true },
        "its": { [Erased]: true },
    },
} as const satisfies BoncleTagTree;
