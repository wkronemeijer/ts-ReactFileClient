import { StringEnum } from "../../../../(System)/Data/StringEnum";

// There is a desire for negative rules
// badGuy -> -goodGuy
// But how do you resolve conflicts? And loops?

export interface BoncleTagTree {
    [s: string] : BoncleTagTree;
}

export const BoncleTagRoot = {
    _displayElements: {
        // Opponent process colors...
        _displayNone: { // ➖
        },
        _displayWhite: { // ⚪
            white : {},
            silver: {},
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
        dislike : {
            hate: {},
        },
        whatever: {},
        like: {
            love: {},
        },
    },
    _possession: {
        dontHave: {
            want: {
                reallyWant: {},
            },
        },
        maybeHave: {
            maybeHaveParts: {},
        },
        have: {
            built: {},
        },
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
        gen1: {},
        gen2: {},
        // Screw hero factory
        // Seriously, HF sets have 0 response on me.
    },
    packageDeal: {
        "and": {},
        // TODO: Do you really care how big it is?
        _sizedPackageDeal: {
            "2-in-1": {},
            "3-in-1": {},
            "4-in-1": {},
        },
    },
    _elemental: { // in ascending order
        _noElement: {},
        iron: {},
        rock: {}, // for the skrall, 
        earth: { onu: {} },
        sand: {},
        stone: { po: {} },
        ice: { ko: {} },
        jungle: {},
        air: { le: {} },
        water: { ga: {} },
        fire: { ta: {} },
        shadow: {},
        light: { av: {} },
    },
    _sized: {
        // Use explicit size when combining
        small: {},
        medium: {},
        large: {
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
        unknownSpecies: {

        },
        unnamedSpecies: {
            steltian: {},
        },
        _matoranUniverseSpecies: {
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
            rahi: {
                hydruka: {},
                visorak: {},
            },
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
    _namedCharacters: { 
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
        Takanuva: {},
        Teridax: {},
        Antroz: {},
        Gresh: {},
        
        ToaMataNui: {},
        Ekimu: {},
        Umarak: {},
    },
    _faction: {
        goodGuy: {},
        badGuy: {},
    },
    // These models are excluded from the set list
    _excluded: {
        combinerModel: {},
        playset: {},
        booster: {
            ammo: {},
        },
    },
    _uncategorized: {
        animal: {},
        vehicle: {},
        promotional: {},
    },
    _special: {
        selection: {}, // nothing has the selection tag, so inputting it shows just the selection.
    },
} as const satisfies BoncleTagTree;
