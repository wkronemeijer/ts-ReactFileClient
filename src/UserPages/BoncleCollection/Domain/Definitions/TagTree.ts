import { StringEnum } from "../../../../(System)/Data/StringEnum";

// There is a desire for negative rules
// badGuy -> -goodGuy
// But how do you resolve conflicts? And loops?


const Default = Symbol("Default");

export const BoncleTagTree_Default = Default;


export interface BoncleTagTree {
    [Default]?: boolean;
    [s: string] : BoncleTagTree;
}

export const BoncleTagRoot = {
    _displayElements: {
        // Opponent process colors...
        _displayNone: { // ➖
            [Default]: true,
        },
        _displayRed: { // 🔴
            red   : {},
            orange: {},
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
        _displayWhite: { // ⚪
            white : {},
            silver: {},
        },
        _displayYellow: { // 🟡
            tan   : {},
            brown : {},
            yellow: {},
            gold  : {},
        },
        _displayBlack: { // ⚫
            gray    : {},
            black   : {},
            gunmetal: {},
        },
    },
    _opinion: {
        dislike : {},
        ambivalent: { [Default]: true },
        like: {
            love: {},
        },
    },
    _possession: {
        dontHave: {
            [Default]: true,
            want: {},
        },
        have: {},
    },
    _seasonOfRelease: {
        // winter is default, summer is by mid 
        // "mid 2002" reads well
        mid: {},
    },
    _yearOfRelease: {
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
    _sex: {
        male  : {},
        female: {},
    },
    _theme: {
        bionicleGen1: {},
        bionicleGen2: {},
    },
    packageDeal: {
        "and": {},
        // Do you really care how big it is?
        _sizedPackageDeal: {
            "2-in-1": {},
            "3-in-1": {},
            "4-in-1": {},
        },
    },
    _elemental: { // in ascending order
        _noElement: { [Default]: true },
        iron      : {},
        rock      : {}, // for the skrall, 
        earth     : { onu: {} },
        sand      : {},
        stone     : { po : {} },
        ice       : { ko : {} },
        jungle    : {},
        air       : { le : {} },
        water     : { ga : {} },
        fire      : { ta : {} },
        shadow    : {},
        light     : { av : {} },
    },
    _sized: {
        // Use explicit size when combining
        small : {},
        medium: {},
        large : {
            titan: {},
            // Whats the difference between large and huge?
            // Idk maybe we split them later again, there is never more than 1 huge set per year.
            huge: {},
        },
    },
    _location: {
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
    _species: {
        _matoranUniverseSpecies: {
            // technically toa are a kind of matoran
            toa: {
                toaMata: {},
                toaNuva: {
                    // Technically Phantoka were still normal Nuva, just with new armor
                    // But for all set purposes they could be entirely different people
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
            turaga: {
                turagaMata: {},
                turagaMetru: {},
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
            bohrok: {
                bohrokKal: {},
                bahrag: {},
            },
            bohrokVa: {},
            makuta: {
                makutaKarda: {
                    makutaPhantoka: {},
                    makutaMistika : {},
                },
            },
            rahkshi: {},
            vahki: {},
            skakdi: {
                piraka: {},
            },
            vortixx: {},
            rahaga: {},
            barraki: {},
            rahi: {
                hydruka: {},
                visorak: {},
            }
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
            okotan: {
                protectorOf: {},
            },
            okoToa: {
                masterOf: {},
                uniterOf: {},
            },
            skullHunter: {},
            creatureOf: {},
            beastOf: {},
        },
        unnamedSpecies: {
            steltian: {},
        },
        unknownSpecies: {},
    },
    _commonCharacters: {
        ogToaTeam: {
            tahu  : {},
            gali  : {},
            lewa  : {},
            kopaka: {},
            pohatu: {},
            onua  : {},
        },
        ogTuragaTeam: {
            vakama: {},
            nokama: {},
            matau : {},
            nuju  : {},
            onewa : {},
            whenua: {},
        },
        ogMatoran: {
            ogMatoranTeam: {
                jaller: {},
                hahli : {},
                kongu : {},
                matoro: {},
                hewkii: {},
                nuparu: {},
            },
            kopeke: {},
            macku:  {},
        },
        takanuva:  {},
        teridax: {},
        antroz: {},
        gresh: {},
    },
    _faction: {
        goodGuy: {},
        badGuy : {},
    },
    
    _uncategorized: {
        special: {},
        animal: {},
        vehicle: {},
        combinerModel: {},
        playset: {},
        allStars: {},
        promotional: {},
        booster: {
            ammo: {},
        },
    },
} as const satisfies BoncleTagTree;
