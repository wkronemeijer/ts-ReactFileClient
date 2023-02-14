// Sources:
// https://biosector01.com/wiki/Sets
// https://biosector01.com/wiki/Hero_Factory#List_of_Sets

// https://biosector01.com/wiki/Template:SetsNav
// https://hf.biosector01.com/wiki/Template:SetsNav

import { identity } from "../../../(System)/Function";
import { from } from "../../../(System)/Collections/Linq";

import { BoncleTagSystem } from "./TagSystem";
import { BoncleSetTemplate } from "./SetTemplate";
import { BoncleSet } from "./Set";

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
function tags<S extends string>(strings: S): Split<S, typeof delimiter> {
    const result: string[] = 
        strings
        .split(delimiter)
        .filter(identity)
    ;
    return result as any;
}

type  BoncleTemplateDatabase = readonly BoncleSetTemplate[];
const boncleTemplateDatabase: BoncleTemplateDatabase = [
//////////////
// Mata Nui //
//////////////

{i:"8540-1",n:"Vakama",t:tags("winter 2001 turagaMata fire")},
{i:"8541-1",n:"Matau" ,t:tags("winter 2001 turagaMata")},
{i:"8542-1",n:"Onewa" ,t:tags("winter 2001 turagaMata")},
{i:"8543-1",n:"Nokama",t:tags("winter 2001 turagaMata")},
{i:"8544-1",n:"Nuju"  ,t:tags("winter 2001 turagaMata")},
{i:"8545-1",n:"Whenua",t:tags("winter 2001 turagaMata")},

{i:"8531-1",n:"Pohatu",t:tags("winter 2001 toaMata")},
{i:"8532-1",n:"Onua"  ,t:tags("winter 2001 toaMata")},
{i:"8533-1",n:"Gali"  ,t:tags("winter 2001 toaMata")},
{i:"8534-1",n:"Tahu"  ,t:tags("winter 2001 toaMata")},
{i:"8535-1",n:"Lewa"  ,t:tags("winter 2001 toaMata")},
{i:"8536-1",n:"Kopaka",t:tags("winter 2001 toaMata")},

{i:"8537-1",n:"Nui-Rama"       ,t:tags("winter 2001 rahi 2-in-1")},
{i:"8538-1",n:"Muaka & Kane-ra",t:tags("winter 2001 rahi 2-in-1")},
{i:"8539-1",n:"Manas"          ,t:tags("winter 2001 rahi 2-in-1")},
{i:"8548-1",n:"Nui-Jaga"       ,t:tags("winter 2001 rahi 2-in-1")},
{i:"8549-1",n:"Tarakava"       ,t:tags("winter 2001 rahi 2-in-1")},

{i:"8546-1",n:"PowerPack",t:tags("winter 2001 ")},

{i:"8525-1",n:"Kanohi (American version)",t:tags("winter 2001 ")},
{i:"8530-1",n:"Kanohi (International version)",t:tags("winter 2001 ")},

{i:"1388-1",n:"Huki"  ,t:tags("winter 2001 matoranMata")},
{i:"1389-1",n:"Onepu" ,t:tags("winter 2001 matoranMata")},
{i:"1390-1",n:"Maku"  ,t:tags("winter 2001 matoranMata")},
{i:"1391-1",n:"Jala"  ,t:tags("winter 2001 matoranMata")},
{i:"1392-1",n:"Kongu" ,t:tags("winter 2001 matoranMata")},
{i:"1393-1",n:"Matoro",t:tags("winter 2001 matoranMata")},

////////////////////////////
// Mata Nui (with Bohrok) //
////////////////////////////

{i:"8550-1",n:"Gahlok Va",t:tags("winter 2002 bohrokVa")},
{i:"8551-1",n:"Kohrak Va",t:tags("winter 2002 bohrokVa")},
{i:"8552-1",n:"Lehvak Va",t:tags("winter 2002 bohrokVa")},
{i:"8553-1",n:"Pahrak Va",t:tags("winter 2002 bohrokVa")},
{i:"8554-1",n:"Tahnok Va",t:tags("winter 2002 bohrokVa")},
{i:"8555-1",n:"Nuhvok Va",t:tags("winter 2002 bohrokVa")},

{i:"8560-1",n:"Pahrak",t:tags("winter 2002 vanillaBohrok")},
{i:"8561-1",n:"Nuhvok",t:tags("winter 2002 vanillaBohrok")},
{i:"8562-1",n:"Gahlok",t:tags("winter 2002 vanillaBohrok")},
{i:"8563-1",n:"Tahnok",t:tags("winter 2002 vanillaBohrok")},
{i:"8564-1",n:"Lehvak",t:tags("winter 2002 vanillaBohrok")},
{i:"8565-1",n:"Kohrak",t:tags("winter 2002 vanillaBohrok")},

{i:"8566-1",n:"Onua Nuva"  ,t:tags("winter 2002 toaNuva")},
{i:"8567-1",n:"Lewa Nuva"  ,t:tags("winter 2002 toaNuva")},
{i:"8568-1",n:"Pohatu Nuva",t:tags("winter 2002 toaNuva")},
{i:"8570-1",n:"Gali Nuva"  ,t:tags("winter 2002 toaNuva")},
{i:"8571-1",n:"Kopaka Nuva",t:tags("winter 2002 toaNuva")},
{i:"8572-1",n:"Tahu Nuva"  ,t:tags("winter 2002 toaNuva")},

{i:"8556-1",n:"Boxor"          ,t:tags("winter 2002 2-in-1 matoranMata")},
{i:"8557-1",n:"Exo-Toa"        ,t:tags("winter 2002 ")},
{i:"8558-1",n:"Cahdok & Gahdok",t:tags("winter 2002 2-in-1 large")},

{i:"10023-1",n:"BIONICLE Master Builder Set",t:tags("winter 2002 ")},

/////////////////////////////
// Mata Nui (with Bohrok+) //
/////////////////////////////

{i:"8581-1",n:"Kopeke",t:tags("winter 2003 matoranNuva")},
{i:"8582-1",n:"Matoro",t:tags("winter 2003 matoranNuva")},
{i:"8583-1",n:"Hahli" ,t:tags("winter 2003 matoranNuva")},
{i:"8584-1",n:"Hewkii",t:tags("winter 2003 matoranNuva")},
{i:"8585-1",n:"Hafu"  ,t:tags("winter 2003 matoranNuva")},
{i:"8586-1",n:"Macku" ,t:tags("winter 2003 matoranNuva")},

{i:"8573-1",n:"Nuhvok-Kal",t:tags("winter 2003 bohrokKal")},
{i:"8574-1",n:"Tahnok-Kal",t:tags("winter 2003 bohrokKal")},
{i:"8575-1",n:"Kohrak-Kal",t:tags("winter 2003 bohrokKal")},
{i:"8576-1",n:"Lehvak-Kal",t:tags("winter 2003 bohrokKal")},
{i:"8577-1",n:"Pahrak-Kal",t:tags("winter 2003 bohrokKal")},
{i:"8578-1",n:"Gahlok-Kal",t:tags("winter 2003 bohrokKal")},

{i:"8587-1",n:"Panrahk",t:tags("winter 2003 rahkshi")},
{i:"8588-1",n:"Kurahk" ,t:tags("winter 2003 rahkshi")},
{i:"8589-1",n:"Lerahk" ,t:tags("winter 2003 rahkshi")},
{i:"8590-1",n:"Guurahk",t:tags("winter 2003 rahkshi")},
{i:"8591-1",n:"Vorahk" ,t:tags("winter 2003 rahkshi")},
{i:"8592-1",n:"Turahk" ,t:tags("winter 2003 rahkshi")},

{i:"8593-1",n:"Makuta"        ,t:tags("winter 2003 makuta")},
{i:"8594-1",n:"Jaller & Gukko",t:tags("winter 2003 matoranNuva rahi 2-in-1")},
{i:"8595-1",n:"Takua & Pewku" ,t:tags("winter 2003 matoranNuva rahi 2-in-1")},
{i:"8596-1",n:"Takanuva"      ,t:tags("winter 2003 2-in-1")},
{i:"3287-1",n:"Takutanuva"    ,t:tags("winter 2003 combinerModel")},

///////////////
// Metru Nui //
///////////////

{i:"8607-1",n:"Nuhrii" ,t:tags("winter 2004 matoranMetru")},
{i:"8608-1",n:"Vhisola",t:tags("winter 2004 matoranMetru")},
{i:"8609-1",n:"Tehutti",t:tags("winter 2004 matoranMetru")},
{i:"8610-1",n:"Ahkmou" ,t:tags("winter 2004 matoranMetru")},
{i:"8611-1",n:"Orkham" ,t:tags("winter 2004 matoranMetru")},
{i:"8612-1",n:"Ehrye"  ,t:tags("winter 2004 matoranMetru")},

{i:"8601-1",n:"Toa Vakama",t:tags("winter 2004 toaMetru")},
{i:"8602-1",n:"Toa Nokama",t:tags("winter 2004 toaMetru")},
{i:"8603-1",n:"Toa Whenua",t:tags("winter 2004 toaMetru")},
{i:"8604-1",n:"Toa Onewa" ,t:tags("winter 2004 toaMetru")},
{i:"8605-1",n:"Toa Matau" ,t:tags("winter 2004 toaMetru")},
{i:"8606-1",n:"Toa Nuju"  ,t:tags("winter 2004 toaMetru")},

{i:"8614-1",n:"Vahki Nuurakh",t:tags("winter 2004 ")},
{i:"8615-1",n:"Vahki Bordakh",t:tags("winter 2004 ")},
{i:"8616-1",n:"Vahki Vorzakh",t:tags("winter 2004 ")},
{i:"8617-1",n:"Vahki Zadakh",t:tags("winter 2004 ")},
{i:"8618-1",n:"Vahki Rorzakh",t:tags("winter 2004 ")},
{i:"8619-1",n:"Vahki Keerakh",t:tags("winter 2004 ")},

{i:"8621-1",n:"Turaga Dume & Nivawk",t:tags("winter 2004 ")},
{i:"8622-1",n:"Nidhiki",t:tags("winter 2004 ")},
{i:"8623-1",n:"Krekka",t:tags("winter 2004 ")},
{i:"8811-1",n:"Toa Lhikan & Kikanalo",t:tags("winter 2004 ")},
{i:"10202-1",n:"Ultimate Dume",t:tags("winter 2004 ")},

{i:"8613-1",n:"Kanoka Disk Launcher Pack",t:tags("winter 2004 ")},

//////////////////////////
// Metru Nui (in ruins) //
//////////////////////////

{i:"4868-1",n:"Rahaga Gaaki"  ,t:tags("winter 2005 rahaga")},
{i:"4869-1",n:"Rahaga Pouks"  ,t:tags("winter 2005 rahaga")},
{i:"4870-1",n:"Rahaga Kualus" ,t:tags("winter 2005 rahaga")},
{i:"4877-1",n:"Rahaga Norik"  ,t:tags("winter 2005 rahaga ta")},
{i:"4878-1",n:"Rahaga Bomonga",t:tags("winter 2005 rahaga")},
{i:"4879-1",n:"Rahaga Iruini" ,t:tags("winter 2005 rahaga le")},

{i:"8736-1",n:"Toa Hordika Vakama",t:tags("winter 2005 toaHordika ta")},
{i:"8737-1",n:"Toa Hordika Nokama",t:tags("winter 2005 toaHordika ga")},
{i:"8738-1",n:"Toa Hordika Whenua",t:tags("winter 2005 toaHordika onu")},
{i:"8739-1",n:"Toa Hordika Onewa" ,t:tags("winter 2005 toaHordika po")},
{i:"8740-1",n:"Toa Hordika Matau" ,t:tags("winter 2005 toaHordika le")},
{i:"8741-1",n:"Toa Hordika Nuju"  ,t:tags("winter 2005 toaHordika ko")},

{i:"8742-1",n:"Visorak Vohtorak",t:tags("winter 2005 visorak")},
{i:"8743-1",n:"Visorak Boggarak",t:tags("winter 2005 visorak")},
{i:"8744-1",n:"Visorak Oohnorak",t:tags("winter 2005 visorak")},
{i:"8745-1",n:"Visorak Roporak" ,t:tags("winter 2005 visorak")},
{i:"8746-1",n:"Visorak Keelerak",t:tags("winter 2005 visorak")},
{i:"8747-1",n:"Visorak Suukorak",t:tags("winter 2005 visorak")},

{i:"8755-1",n:"Keetongu",t:tags("winter 2005 rahi")},
{i:"8756-1",n:"Sidorak" ,t:tags("winter 2005 male steltian")},
{i:"8761-1",n:"Roodaka" ,t:tags("winter 2005 female vortixx")},
{i:"10203-1",n:"Voporak",t:tags("winter 2005 steltian")},

{i:"8757-1",n:"Visorak Battle Ram" ,t:tags("winter 2005 playset")},
{i:"8758-1",n:"Tower of Toa"       ,t:tags("winter 2005 playset")},
{i:"8759-1",n:"Battle of Metru Nui",t:tags("winter 2005 playset")},
{i:"8769-1",n:"Visorak's Gate",t:tags("winter 2005 playset")},

{i:"8762-1",n:"Toa Iruini",t:tags("winter 2005 toaHagah")},
{i:"8763-1",n:"Toa Norik" ,t:tags("winter 2005 toaHagah")},

{i:"8748-1" ,n:"Rhotuka",t:tags("winter 2005 ammo")},

//////////////
// Voya Nui //
//////////////

{i:"8721-1",n:"Velika",t:tags("winter 2006 matoranInika")},
{i:"8722-1",n:"Kazi"  ,t:tags("winter 2006 matoranInika")},
{i:"8723-1",n:"Piruk" ,t:tags("winter 2006 matoranInika")},
{i:"8724-1",n:"Garan" ,t:tags("winter 2006 matoranInika")},
{i:"8725-1",n:"Balta" ,t:tags("winter 2006 matoranInika")},
{i:"8726-1",n:"Dalu"  ,t:tags("winter 2006 matoranInika")},

{i:"8900-1",n:"Reidak",t:tags("winter 2006 piraka")},
{i:"8901-1",n:"Hakann",t:tags("winter 2006 piraka")},
{i:"8902-1",n:"Vezok" ,t:tags("winter 2006 piraka")},
{i:"8903-1",n:"Zaktan",t:tags("winter 2006 piraka")},
{i:"8904-1",n:"Avak"  ,t:tags("winter 2006 piraka")},
{i:"8905-1",n:"Thok"  ,t:tags("winter 2006 piraka")},

{i:"8727-1",n:"Toa Jaller",t:tags("winter 2006 toaInika")},
{i:"8728-1",n:"Toa Hahli" ,t:tags("winter 2006 toaInika")},
{i:"8729-1",n:"Toa Nuparu",t:tags("winter 2006 toaInika")},
{i:"8730-1",n:"Toa Hewkii",t:tags("winter 2006 toaInika")},
{i:"8731-1",n:"Toa Kongu" ,t:tags("winter 2006 toaInika")},
{i:"8732-1",n:"Toa Matoro",t:tags("winter 2006 toaInika")},

{i:"8733-1",n:"Axonn"  ,t:tags("winter 2006 ")},
{i:"8734-1",n:"Brutaka",t:tags("winter 2006 ")},
{i:"8764-1",n:"Vezon & Fenrakk",t:tags("winter 2006 ")},

{i:"8892-1",n:"Piraka Outpost"   ,t:tags("winter 2006 playset")},
{i:"8893-1",n:"Lava Chamber Gate",t:tags("winter 2006 playset")},
{i:"8894-1",n:"Piraka Stronghold",t:tags("winter 2006 playset")},

{i:"8625-1" ,n:"Umbra" ,t:tags("winter 2006 ")},
{i:"8626-1" ,n:"Irnakk",t:tags("winter 2006 ")},
{i:"10204-1",n:"Vezon & Kardas",t:tags("winter 2006 ")},
{i:"8624-1" ,n:"Race for the Mask of Life",t:tags("winter 2006 ")},

{i:"8719-1" ,n:"Zamor Spheres",t:tags("winter 2006 ammo")},

///////////////
// Mahri Nui //
///////////////

{i:"8929-1",n:"Defilak",t:tags("winter 2007 matoranMahri")},
{i:"8930-1",n:"Dekar"  ,t:tags("winter 2007 matoranMahri")},
{i:"8931-1",n:"Thulox" ,t:tags("winter 2007 hydruka")},
{i:"8932-1",n:"Morak"  ,t:tags("winter 2007 hydruka")},

{i:"8916-1",n:"Takadox",t:tags("winter 2007 barraki")},
{i:"8917-1",n:"Kalmah" ,t:tags("winter 2007 barraki")},
{i:"8918-1",n:"Carapar",t:tags("winter 2007 barraki")},
{i:"8919-1",n:"Mantax" ,t:tags("winter 2007 barraki")},
{i:"8920-1",n:"Ehlek"  ,t:tags("winter 2007 barraki")},
{i:"8921-1",n:"Pridak" ,t:tags("winter 2007 barraki")},

{i:"8910-1",n:"Toa Kongu" ,t:tags("winter 2007 toaMahri")},
{i:"8911-1",n:"Toa Jaller",t:tags("winter 2007 toaMahri")},
{i:"8912-1",n:"Toa Hewkii",t:tags("winter 2007 toaMahri")},
{i:"8913-1",n:"Toa Nuparu",t:tags("winter 2007 toaMahri")},
{i:"8914-1",n:"Toa Hahli" ,t:tags("winter 2007 toaMahri")},
{i:"8915-1",n:"Toa Matoro",t:tags("winter 2007 toaMahri")},

{i:"8922-1",n:"Gadunka"         ,t:tags("winter 2007 large")},
{i:"8923-1",n:"Hydraxon"        ,t:tags("winter 2007 large")},
{i:"8924-1",n:"Maxilos & Spinax",t:tags("winter 2007 large 2-in-1")},
{i:"8935-1",n:"Nocturn"         ,t:tags("winter 2007 large")},
{i:"8939-1",n:"Lesovikk"        ,t:tags("winter 2007 toaCordak vehicle 2-in-1")},
{i:"8940-1",n:"Karzahni"        ,t:tags("winter 2007 3-in-1")},

{i:"8925-1",n:"Barraki Deepsea Patrol",t:tags("winter 2007 playset")},
{i:"8926-1",n:"Toa Undersea Attack"   ,t:tags("winter 2007 playset")},
{i:"8927-1",n:"Toa Terrain Crawler"   ,t:tags("winter 2007 playset")},

{i:"8934-1",n:"Squid Ammo",t:tags("winter 2007 ammo")},

///////////////
// Karda Nui //
///////////////

{i:"8944-1",n:"Tanma" ,t:tags("winter 2008 matoranOfLight air")},
{i:"8945-1",n:"Solek" ,t:tags("winter 2008 matoranOfLight ice")},
{i:"8946-1",n:"Photok",t:tags("winter 2008 matoranOfLight stone")},
{i:"8947-1",n:"Radiak",t:tags("winter 2008 matoranOfShadow fire")},
{i:"8948-1",n:"Gavla" ,t:tags("winter 2008 matoranOfShadow water")},
{i:"8949-1",n:"Kirop" ,t:tags("winter 2008 matoranOfShadow earth")},

{i:"8685-1",n:"Toa Kopaka",t:tags("winter 2008 toaPhantoka ice")},
{i:"8686-1",n:"Toa Lewa"  ,t:tags("winter 2008 toaPhantoka air")},
{i:"8687-1",n:"Toa Pohatu",t:tags("winter 2008 toaPhantoka stone")},
{i:"8691-1",n:"Antroz" ,t:tags("winter 2008 makutaPhantoka fire")},
{i:"8692-1",n:"Vamprah",t:tags("winter 2008 makutaPhantoka water")},
{i:"8693-1",n:"Chirox" ,t:tags("winter 2008 makutaPhantoka earth")},

///////////////////////////
// Karda Nui (the swamp) //
///////////////////////////

{i:"8688-1",n:"Toa Gali",t:tags("winter 2008 toaMistika water")},
{i:"8689-1",n:"Toa Tahu",t:tags("winter 2008 toaMistika fire")},
{i:"8690-1",n:"Toa Onua",t:tags("winter 2008 toaMistika earth")},
{i:"8694-1",n:"Krika" ,t:tags("winter 2008 makutaMistika ice")},
{i:"8695-1",n:"Gorast",t:tags("winter 2008 makutaMistika jungle")},
{i:"8696-1",n:"Bitil" ,t:tags("winter 2008 makutaMistika stone")},

{i:"8697-1",n:"Toa Ignika",t:tags("winter 2008 ")},

{i:"8698-1",n:"Vultraz" ,t:tags("winter 2008 ")},
{i:"8699-1",n:"Takanuva",t:tags("winter 2008 light")},

{i:"8941-1",n:"Rockoh T3"                  ,t:tags("winter 2008  large vehicle 2-in-1 toaPhantoka    stone ")},
{i:"8942-1",n:"Jetrax T6"                  ,t:tags("winter 2008  large vehicle 2-in-1 makutaPhantoka fire  ")},
{i:"8943-1",n:"Axalara T9"                 ,t:tags("winter 2008  large vehicle 2-in-1 toaPhantoka    air   ")},
{i:"8942-2",n:"Jetrax T6 (Limited Edition)",t:tags("winter 2008  large vehicle 2-in-1 makutaPhantoka fire  ")},

{i:"8952-1",n:"Mutran & Vican",t:tags("winter 2008 matoranOfShadow makutaPhantoka 2-in-1")},
{i:"8953-1",n:"Makuta Icarax" ,t:tags("winter 2008 makuta")},
{i:"8954-1",n:"Mazeka",t:tags("winter 2008 ")},

////////////////
// Bara Magna //
////////////////

{i:"8972-1",n:"Atakus",t:tags("winter 2009 agori skrall")},
{i:"8973-1",n:"Raanu" ,t:tags("winter 2009 agori fire")},
{i:"8974-1",n:"Tarduk",t:tags("winter 2009 agori jungle")},
{i:"8975-1",n:"Berix" ,t:tags("winter 2009 agori water")},
{i:"8976-1",n:"Metus" ,t:tags("winter 2009 agori ice")},
{i:"8977-1",n:"Zesk"  ,t:tags("winter 2009 agori sand")},

{i:"8978-1",n:"Skrall",t:tags("winter 2009 vanillaGlatorian skrall")},
{i:"8979-1",n:"Malum" ,t:tags("winter 2009 vanillaGlatorian fire")},
{i:"8980-1",n:"Gresh" ,t:tags("winter 2009 vanillaGlatorian jungle")},
{i:"8981-1",n:"Tarix" ,t:tags("winter 2009 vanillaGlatorian water")},
{i:"8982-1",n:"Strakk",t:tags("winter 2009 vanillaGlatorian ice")},
{i:"8983-1",n:"Vorox" ,t:tags("winter 2009 vanillaGlatorian sand")},

{i:"8984-1",n:"Stronius",t:tags("summer 2009 glatorianLegend skrall")},
{i:"8985-1",n:"Ackar"   ,t:tags("summer 2009 glatorianLegend fire")},
{i:"8986-1",n:"Vastus"  ,t:tags("summer 2009 glatorianLegend jungle")},
{i:"8987-1",n:"Kiina"   ,t:tags("summer 2009 glatorianLegend water")},
{i:"8988-1",n:"Gelu"    ,t:tags("summer 2009 glatorianLegend ice")},
{i:"8989-1",n:"Mata Nui",t:tags("summer 2009 glatorianLegend")},

{i:"8990-1",n:"Fero & Skirmix",t:tags("winter 2009 agori animal")},
{i:"8991-1",n:"Tuma",t:tags("winter 2009 large skrall")},

{i:"8992-1",n:"Cendox V1"   ,t:tags("winter 2009 vehicle 2-in-1")},
{i:"8993-1",n:"Kaxium V3"   ,t:tags("winter 2009 vehicle 2-in-1")},
{i:"8994-1",n:"Baranus V7"  ,t:tags("winter 2009 vehicle 2-in-1")},
{i:"8995-1",n:"Thornatus V9",t:tags("winter 2009 vehicle 2-in-1")},
{i:"8996-1",n:"Skopio XV-1" ,t:tags("winter 2009 vehicle 2-in-1")},

{i:"8998-1",n:"Toa Mata Nui",t:tags("winter 2009 huge")},

{i:"7116-1",n:"Tahu"    ,t:tags("winter 2010 allStars toa fire")},
{i:"7117-1",n:"Gresh"   ,t:tags("winter 2010 allStars glatorian jungle")},
{i:"7135-1",n:"Takanuva",t:tags("winter 2010 allStars toa light")},
{i:"7136-1",n:"Skrall"  ,t:tags("winter 2010 allStars skrall earth")},
{i:"7137-1",n:"Piraka"  ,t:tags("winter 2010 allStars piraka water")},
{i:"7138-1",n:"Rahkshi" ,t:tags("winter 2010 allStars rahkshi")},

///////////
// Okoto //
///////////

{i:"70778-1",n:"Protector of Jungle",t:tags("winter 2015 protectorOf jungle")},
{i:"70779-1",n:"Protector of Stone" ,t:tags("winter 2015 protectorOf stone")},
{i:"70780-1",n:"Protector of Water" ,t:tags("winter 2015 protectorOf water")},
{i:"70781-1",n:"Protector of Earth" ,t:tags("winter 2015 protectorOf earth")},
{i:"70782-1",n:"Protector of Ice"   ,t:tags("winter 2015 protectorOf ice")},
{i:"70783-1",n:"Protector of Fire"  ,t:tags("winter 2015 protectorOf fire")},

{i:"70784-1",n:"Lewa – Master of Jungle" ,t:tags("winter 2015 masterOf jungle")},
{i:"70785-1",n:"Pohatu – Master of Stone",t:tags("winter 2015 masterOf stone")},
{i:"70786-1",n:"Gali – Master of Water"  ,t:tags("winter 2015 masterOf water")},
{i:"70787-1",n:"Tahu – Master of Fire"   ,t:tags("winter 2015 masterOf fire")},
{i:"70788-1",n:"Kopaka – Master of Ice"  ,t:tags("winter 2015 masterOf ice")},
{i:"70789-1",n:"Onua – Master of Earth"  ,t:tags("winter 2015 masterOf earth")},

{i:"70790-1",n:"Lord of Skull Spiders",t:tags("winter 2015 ")},
{i:"70791-1",n:"Skull Warrior",t:tags("winter 2015 skullHunter")},
{i:"70792-1",n:"Skull Slicer" ,t:tags("winter 2015 skullHunter")},
{i:"70793-1",n:"Skull Basher" ,t:tags("winter 2015 skullHunter")},
{i:"70794-1",n:"Skull Scorpio",t:tags("winter 2015 skullHunter")},

{i:"70795-1",n:"Mask Maker vs. Skull Grinder",t:tags("winter 2015 ")},
{i:"5002941-1",n:"BIONICLE Hero Pack",t:tags("winter 2015 ")},

{i:"71300-1",n:"Uxar Creature of Jungle",t:tags("winter 2016 creatureOf jungle")},
{i:"71301-1",n:"Ketar Creature of Stone",t:tags("winter 2016 creatureOf stone")},
{i:"71302-1",n:"Akida Creature of Water",t:tags("winter 2016 creatureOf water")},
{i:"71303-1",n:"Ikir Creature of Fire"  ,t:tags("winter 2016 creatureOf fire")},
{i:"71304-1",n:"Terak Creature of Earth",t:tags("winter 2016 creatureOf earth")},

{i:"71305-1",n:"Lewa Uniter of Jungle"       ,t:tags("winter 2016 uniterOf jungle")},
{i:"71306-1",n:"Pohatu Uniter of Stone"      ,t:tags("winter 2016 uniterOf stone")},
{i:"71307-1",n:"Gali Uniter of Water"        ,t:tags("winter 2016 uniterOf water")},
{i:"71308-1",n:"Tahu Uniter of Fire"         ,t:tags("winter 2016 uniterOf fire")},
{i:"71309-1",n:"Onua Uniter of Earth"        ,t:tags("winter 2016 uniterOf earth")},
{i:"71311-1",n:"Kopaka and Melum - Unity set",t:tags("winter 2016 uniterOf ice 2-in-1 creatureOf")},

{i:"71312-1" ,n:"Ekimu the Mask Maker",t:tags("winter 2016 ")},

{i:"71313-1" ,n:"Lava Beast"    ,t:tags("winter 2016 ")},
{i:"71314-1" ,n:"Storm Beast"   ,t:tags("winter 2016 ")},
{i:"71315-1" ,n:"Quake Beast"   ,t:tags("winter 2016 ")},
{i:"601601-1",n:"Skull Scorpion",t:tags("winter 2016 ")},
{i:"601602-1",n:"Ekimu's Hawk"  ,t:tags("winter 2016 ")},

{i:"71310-1" ,n:"Umarak the Hunter"   ,t:tags("winter 2016 ")},
{i:"71316-1" ,n:"Umarak the Destroyer",t:tags("winter 2016 ")},

];

// In the interest of saving memory, we lazily load this thing

export const BoncleDatabase: readonly BoncleSet[] = (function () {
    const btrs = new BoncleTagSystem;
    console.log(btrs.toString());
    
    return (
        from(boncleTemplateDatabase)
        .select(btrs.instantiate)
        // TODO: Insert sorting
        // .orderOn(set => set.yearOfRelease) // already sorted on date
        .toArray()
    );
}());
