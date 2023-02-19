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
        _displayRed  : {},
        _displayBlue : {},
        _displayGreen: {},
        _displayWhite: {},
        _displayGold : {},
        _displayBlack: {},
        _displayNone : {},
    },
    _seasonOfRelease: {
        // Only purpose is to order sets by release
        // winter is default, summer is by mid 
        // ...mid 2002... reads well
        mid: {},
    },
    _armament: {
        _projectileArmament: {
            bambooDisk: {},
            kanokaDisk: {},
            rhotukaSpinner: {},
            zamorLauncher: {},
            airLauncher: {},
            squidLauncher: {},
            cordakBlaster: {},
            midakSkyBlaster: {},
            nynrahGhostBlaster: {},
            thornaxLauncher: {},
            elementalBlaster: {},
        },
    },
    _kanohi: {
        
        
        ignika: {},
        kraakhan: {},
        maskOfCreation: {},
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
    },
    _sex: {
        male  : {},
        female: {},
    },
    _colored: {
        white : {},
        gray  : {},
        black : {},
        red   : {},
        orange: {},
        tan   : {},
        yellow: {},
        green : {},
        lime  : {},
        cyan  : {},
        blue  : {},
        purple: {},
        shinyColor: {
            gold  : {},
            silver: {},
            bronze: {},
            gunmetal: {},
        },
    },
    _theme: {
        bionicleGen1: {},
        bionicleGen2: {},
    },
    _multiplicity: {
        "2-in-1": { and    : {}},
        "3-in-1": { andAlso: {}},
        "4-in-1": {},
    },
    _elemental: { // in ascending order
        _noElement: {},
        iron     : {},
        rock     : {}, // for the skrall, 
        earth    : { onu: {} },
        sand     : {},
        stone    : { po : {} },
        ice      : { ko : {} },
        jungle   : {},
        air      : { le : {} },
        water    : { ga : {} },
        fire     : { ta : {} },
        shadow   : {},
        light    : { av : {} },
    },
    _sized: {
        // Use explicit size when combining
        small : {},
        medium: {},
        large : {
            titan: {},
        },
        // Whats the difference between large and huge?
        huge  : {},
    },
    special: {
        limitedEdition: {},
        specialEdition: {},
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
                vanillaBohrok: {},
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
                vanillaGlatorian: {},
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
    // = occurs more than once
    // Useful to compare different iterations
    _famousPeople: {
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
        antroz: {},
    },
    _faction: {
        goodGuy: {},
        badGuy : {},
    },
    _opinion: {
        dislike : {},
        whatever: {
            like: {
                love: {},
            },
        },
    },
    _possession: {
        dontHave: {
            want: {},
        },
        have: {},
    },
    _uncategorized: {
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
