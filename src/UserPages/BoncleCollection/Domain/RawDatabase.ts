// Sources:
// https://biosector01.com/wiki/Sets
// https://biosector01.com/wiki/Hero_Factory#List_of_Sets

// https://biosector01.com/wiki/Template:SetsNav
// https://hf.biosector01.com/wiki/Template:SetsNav

import { identity } from "../../../(System)/Function";

import { BoncleSetTemplate } from "./SetTemplate";

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

const test = tags(`mid 2001 promotional matoranMata hewkii
`);

type  BoncleTemplateDatabase = readonly BoncleSetTemplate[];
export const __boncleTemplateDatabase: BoncleTemplateDatabase = [
////////////////////////////////////////////////////////////////
//                                                            //
//  ██████╗ ███████╗███╗   ██╗     ██████╗ ███╗   ██╗███████╗ //
// ██╔════╝ ██╔════╝████╗  ██║    ██╔═══██╗████╗  ██║██╔════╝ //
// ██║  ███╗█████╗  ██╔██╗ ██║    ██║   ██║██╔██╗ ██║█████╗   //
// ██║   ██║██╔══╝  ██║╚██╗██║    ██║   ██║██║╚██╗██║██╔══╝   //
// ╚██████╔╝███████╗██║ ╚████║    ╚██████╔╝██║ ╚████║███████╗ //
//  ╚═════╝ ╚══════╝╚═╝  ╚═══╝     ╚═════╝ ╚═╝  ╚═══╝╚══════╝ //
//                                                            //
////////////////////////////////////////////////////////////////

//////////////
// Mata Nui //
//////////////

{i:"1388-1",n:"Huki"  ,t:tags("mid 2001 promotional matoranMata Hewkii want                                            ")},
{i:"1389-1",n:"Onepu" ,t:tags("mid 2001 promotional matoranMata onu                                                    ")},
{i:"1390-1",n:"Maku"  ,t:tags("mid 2001 promotional matoranMata Macku  want                                            ")},
{i:"1391-1",n:"Jala"  ,t:tags("mid 2001 promotional matoranMata Jaller                                                 ")},
{i:"1392-1",n:"Kongu" ,t:tags("mid 2001 promotional matoranMata Kongu                                                  ")},
{i:"1393-1",n:"Matoro",t:tags("mid 2001 promotional matoranMata Matoro                                                 ")},

{i:"8540-1",n:"Vakama",t:tags("mid 2001 turagaMata Vakama - maybeHaveParts                                               ")},
{i:"8541-1",n:"Matau" ,t:tags("mid 2001 turagaMata Matau  -                                                              ")},
{i:"8542-1",n:"Onewa" ,t:tags("mid 2001 turagaMata Onewa  - maybeHaveParts                                               ")},
{i:"8543-1",n:"Nokama",t:tags("mid 2001 turagaMata Nokama - want                                                         ")},
{i:"8544-1",n:"Nuju"  ,t:tags("mid 2001 turagaMata Nuju   - maybeHaveParts                                               ")},
{i:"8545-1",n:"Whenua",t:tags("mid 2001 turagaMata Whenua - like                                                         ")},

{i:"8531-1",n:"Pohatu",t:tags("mid 2001 toaMata Pohatu - like have                                                     ")},
{i:"8532-1",n:"Onua"  ,t:tags("mid 2001 toaMata Onua   - like have                                                     ")},
{i:"8533-1",n:"Gali"  ,t:tags("mid 2001 toaMata Gali   - i built it                                                    ")},
{i:"8534-1",n:"Tahu"  ,t:tags("mid 2001 toaMata Tahu   - like have                                                     ")},
{i:"8535-1",n:"Lewa"  ,t:tags("mid 2001 toaMata Lewa   - i built it                                                    ")},
{i:"8536-1",n:"Kopaka",t:tags("mid 2001 toaMata Kopaka - have                                                          ")},

{i:"8537-1",n:"Nui-Rama"       ,t:tags("mid 2001 2-in-1 large lime   rahi                                               ")},
{i:"8538-1",n:"Muaka & Kane-ra",t:tags("mid 2001 2-in-1 large red    rahi                                               ")},
{i:"8539-1",n:"Manas"          ,t:tags("mid 2001 2-in-1 large yellow rahi                                               ")},
{i:"8548-1",n:"Nui-Jaga"       ,t:tags("mid 2001 2-in-1 large blue   rahi                                               ")},
{i:"8549-1",n:"Tarakava"       ,t:tags("mid 2001 2-in-1 large blue   rahi                                               ")},

// {i:"8546-1",n:"PowerPack"   ,t:tags("mid 2001 booster                                                                  ")},
// {i:"8525-1",n:"Kanohi (US)" ,t:tags("mid 2001 booster                                                                  ")},
// {i:"8530-1",n:"Kanohi (INT)",t:tags("mid 2001 booster                                                                  ")},

////////////////////////////
// Mata Nui (with Bohrok) //
////////////////////////////

{i:"8550-1",n:"Gahlok Va",t:tags("2002 water bohrokVa     - i have it                                                  ")},
{i:"8551-1",n:"Kohrak Va",t:tags("2002 ice   bohrokVa     - i have it                                                  ")},
{i:"8552-1",n:"Lehvak Va",t:tags("2002 air   bohrokVa                                                                  ")},
{i:"8553-1",n:"Pahrak Va",t:tags("2002 stone bohrokVa     - i have it                                                  ")},
{i:"8554-1",n:"Tahnok Va",t:tags("2002 fire  bohrokVa     - i have it                                                  ")},
{i:"8555-1",n:"Nuhvok Va",t:tags("2002 earth bohrokVa     - i have it                                                  ")},

{i:"8560-1",n:"Pahrak",t:tags("2002 stone bohrok                                                                       ")},
{i:"8561-1",n:"Nuhvok",t:tags("2002 earth bohrok                                                                       ")},
{i:"8562-1",n:"Gahlok",t:tags("2002 water bohrok have                                                                  ")},
{i:"8563-1",n:"Tahnok",t:tags("2002 fire  bohrok                                                                       ")},
{i:"8564-1",n:"Lehvak",t:tags("2002 air   bohrok                                                                       ")}, 
{i:"8565-1",n:"Kohrak",t:tags("2002 ice   bohrok have                                                                  ")},

{i:"8566-1",n:"Onua"  ,t:tags("mid 2002 toaNuva Onua - i want it                                                  ")},
{i:"8567-1",n:"Lewa"  ,t:tags("mid 2002 toaNuva Lewa                                                              ")},
{i:"8568-1",n:"Pohatu",t:tags("mid 2002 toaNuva Pohatu dislike                                                    ")},
{i:"8570-1",n:"Gali"  ,t:tags("mid 2002 toaNuva Gali like                                                         ")},
{i:"8571-1",n:"Kopaka",t:tags("mid 2002 toaNuva Kopaka like                                                       ")},
{i:"8572-1",n:"Tahu"  ,t:tags("mid 2002 toaNuva Tahu have                                                         ")},

{i:"8556-1",n:"Boxor"          ,t:tags("mid 2002 large vehicle and matoranMata Nuparu love                             ")},
{i:"8557-1",n:"Exo-Toa"        ,t:tags("mid 2002 titan                                                                 ")},
{i:"8558-1",n:"Cahdok & Gahdok",t:tags("mid 2002 fire bahrag and water bahrag                                          ")},

// {i:"10023-1",n:"BIONICLE Master Builder Set",t:tags("mid 2002 booster                                                  ")},

/////////////////////////////
// Mata Nui (with Bohrok+) //
/////////////////////////////

{i:"8581-1",n:"Kopeke",t:tags("2003 ko matoranNuva Kopeke                                                              ")},
{i:"8582-1",n:"Matoro",t:tags("2003 ko matoranNuva Matoro                                                              ")},
{i:"8583-1",n:"Hahli" ,t:tags("2003 ga matoranNuva Hahli - i want it                                                          ")},
{i:"8586-1",n:"Macku" ,t:tags("2003 ga matoranNuva Macku                                                               ")},
{i:"8584-1",n:"Hewkii",t:tags("2003 po matoranNuva Hewkii                                                              ")},
{i:"8585-1",n:"Hafu"  ,t:tags("2003 po matoranNuva like                                                                ")},

{i:"8573-1",n:"Nuhvok-Kal",t:tags("2003 earth bohrokKal                                                                ")},
{i:"8574-1",n:"Tahnok-Kal",t:tags("2003 fire  bohrokKal                                                                ")},
{i:"8575-1",n:"Kohrak-Kal",t:tags("2003 ice   bohrokKal                                                                ")},
{i:"8576-1",n:"Lehvak-Kal",t:tags("2003 air   bohrokKal                                                                ")},
{i:"8577-1",n:"Pahrak-Kal",t:tags("2003 stone bohrokKal                                                                ")},
{i:"8578-1",n:"Gahlok-Kal",t:tags("2003 water bohrokKal                                                                ")},

// Rahkshi elements are funny
{i:"8587-1",n:"Panrahk",t:tags("mid 2003 brown rahkshi                                                                 ")}, 
{i:"8588-1",n:"Kurahk" ,t:tags("mid 2003 white rahkshi                                                                 ")},
{i:"8589-1",n:"Lerahk" ,t:tags("mid 2003 green rahkshi                                                                 ")},
{i:"8590-1",n:"Guurahk",t:tags("mid 2003 blue  rahkshi - i like it                                                             ")},
{i:"8591-1",n:"Vorahk" ,t:tags("mid 2003 black rahkshi                                                                 ")},
{i:"8592-1",n:"Turahk" ,t:tags("mid 2003 red   rahkshi maybeHaveParts                                                  ")},

{i:"8593-1",n:"Makuta"        ,t:tags("mid 2003 black titan makuta                                                     ")},
{i:"8594-1",n:"Jaller & Gukko",t:tags("mid 2003     matoranNuva Jaller   and large rahi                                ")},
{i:"8595-1",n:"Takua & Pewku" ,t:tags("mid 2003 red matoranNuva Takanuva and large rahi                                ")},
{i:"8596-1",n:"Takanuva"      ,t:tags("mid 2003 toaNuva Takanuva and large vehicle                                     ")},

// {i:"3287-1",n:"Takutanuva"    ,t:tags("mid 2003 combinerModel                                                  ")},

///////////////
// Metru Nui //
///////////////

{i:"8607-1",n:"Nuhrii" ,t:tags("2004 ta  matoranMetru        - i have it                                               ")},
{i:"8608-1",n:"Vhisola",t:tags("2004 ga  matoranMetru        - i have it                                               ")},
{i:"8609-1",n:"Tehutti",t:tags("2004 onu matoranMetru                                                                  ")},
{i:"8610-1",n:"Ahkmou" ,t:tags("2004 po  matoranMetru badGuy - i have it                                               ")},
{i:"8611-1",n:"Orkham" ,t:tags("2004 le  matoranMetru                                                                  ")},
{i:"8612-1",n:"Ehrye"  ,t:tags("2004 ko  matoranMetru        - i built it                                              ")},

{i:"8601-1",n:"Vakama",t:tags("2004 toaMetru Vakama have                                                               ")},
{i:"8602-1",n:"Nokama",t:tags("2004 toaMetru Nokama like have                                                               ")},
{i:"8603-1",n:"Whenua",t:tags("2004 toaMetru Whenua have                                                               ")},
{i:"8604-1",n:"Onewa" ,t:tags("2004 toaMetru Onewa  have                                                               ")},
{i:"8605-1",n:"Matau" ,t:tags("2004 toaMetru Matau  like have                                                               ")},
{i:"8606-1",n:"Nuju"  ,t:tags("2004 toaMetru Nuju   have                                                               ")},

{i:"8614-1",n:"Nuurakh",t:tags("mid 2004 fire  vahki                                                                   ")},
{i:"8615-1",n:"Bordakh",t:tags("mid 2004 water vahki have                                                              ")},
{i:"8616-1",n:"Vorzakh",t:tags("mid 2004 air   vahki                                                                   ")},
{i:"8617-1",n:"Zadakh" ,t:tags("mid 2004 stone vahki have                                                              ")},
{i:"8618-1",n:"Rorzakh",t:tags("mid 2004 earth vahki have                                                              ")},
{i:"8619-1",n:"Keerakh",t:tags("mid 2004 ice   vahki have                                                              ")},

{i:"8623-1",n:"Krekka"           ,t:tags("mid 2004 blue  male titan                                                    ")},
{i:"8622-1",n:"Nidhiki"          ,t:tags("mid 2004 green male titan                                                    ")},
{i:"8621-1",n:"Dume & Nivawk"    ,t:tags("mid 2004 2-in-1 ta turagaMetru and large rahi                                ")},
{i:"8811-1",n:"Lhikan & Kikanalo",t:tags("mid 2004 2-in-1 ta toaMangai and large rahi love                             ")},

// {i:"10202-1",n:"Ultimate Dume",t:tags("2004 combinerModel                                                              ")},
// {i:"8613-1" ,n:"Kanoka Disk Launcher Pack",t:tags("2004 ammo                                                           ")},

//////////////////////////
// Metru Nui (in ruins) //
//////////////////////////

{i:"4868-1",n:"Gaaki"  ,t:tags("2005 ga  rahaga                                                                        ")},
{i:"4869-1",n:"Pouks"  ,t:tags("2005 po  rahaga                                                                        ")},
{i:"4870-1",n:"Kualus" ,t:tags("2005 ko  rahaga                                                                        ")},
{i:"4877-1",n:"Norik"  ,t:tags("2005 ta  rahaga                                                                        ")},
{i:"4878-1",n:"Bomonga",t:tags("2005 onu rahaga                                                                        ")},
{i:"4879-1",n:"Iruini" ,t:tags("2005 le  rahaga                                                                        ")},

// EU had visorak first, the hordika

{i:"8736-1",n:"Vakama",t:tags("mid 2005 toaHordika Vakama                                                              ")},
{i:"8737-1",n:"Nokama",t:tags("mid 2005 toaHordika Nokama - i reallyWant it                                            ")},
{i:"8738-1",n:"Whenua",t:tags("mid 2005 toaHordika Whenua - i built it                                                 ")},
{i:"8739-1",n:"Onewa" ,t:tags("mid 2005 toaHordika Onewa  - i want it                                                  ")},
{i:"8740-1",n:"Matau" ,t:tags("mid 2005 toaHordika Matau                                                               ")},
{i:"8741-1",n:"Nuju"  ,t:tags("mid 2005 toaHordika Nuju   - i like it                                                  ")},

{i:"8742-1",n:"Vohtorak",t:tags("2005 fire  visorak                                                                    ")},
{i:"8743-1",n:"Boggarak",t:tags("2005 water visorak maybeHaveParts                                                     ")},
{i:"8746-1",n:"Keelerak",t:tags("2005 air   visorak                                                                    ")},
{i:"8747-1",n:"Suukorak",t:tags("2005 ice   visorak like                                                               ")},
{i:"8745-1",n:"Roporak" ,t:tags("2005 stone visorak                                                                    ")},
{i:"8744-1",n:"Oohnorak",t:tags("2005 earth visorak                                                                    ")},

{i:"8755-1",n:"Keetongu",t:tags("mid 2005 titan rahi                                                                   ")},
{i:"8756-1",n:"Sidorak" ,t:tags("mid 2005 titan male steltian                                                          ")},
{i:"8761-1",n:"Roodaka" ,t:tags("mid 2005 titan female vortixx - i reallyWant it                                      ")},

{i:"8763-1",n:"Norik" ,t:tags("mid 2005 toaHagah ta                                                                    ")},
{i:"8762-1",n:"Iruini",t:tags("mid 2005 toaHagah le have                                                               ")},

// {i:"10203-1",n:"Voporak",t:tags("mid 2005 titan steltian combinerModel                                  ")},
// {i:"8748-1" ,n:"Rhotuka",t:tags("2005 ammo                                                                             ")},
// {i:"8757-1" ,n:"Visorak Battle Ram" ,t:tags("mid 2005 playset                                                          ")},
// {i:"8758-1" ,n:"Tower of Toa"       ,t:tags("mid 2005 playset                                                          ")},
// {i:"8759-1" ,n:"Battle of Metru Nui",t:tags("mid 2005 playset                                                          ")},
// {i:"8769-1" ,n:"Visorak's Gate"     ,t:tags("mid 2005Edition playset                                           ")},

//////////////
// Voya Nui //
//////////////

{i:"8721-1",n:"Velika",t:tags("2006 po  matoranInika                                                                   ")},
{i:"8722-1",n:"Kazi"  ,t:tags("2006 ko  matoranInika                                                                   ")},
{i:"8723-1",n:"Piruk" ,t:tags("2006 le  matoranInika want                                                              ")},
{i:"8724-1",n:"Garan" ,t:tags("2006 onu matoranInika                                                                   ")},
{i:"8725-1",n:"Balta" ,t:tags("2006 ta  matoranInika                                                                   ")},
{i:"8726-1",n:"Dalu"  ,t:tags("2006 ga  matoranInika                                                                   ")},

{i:"8900-1",n:"Reidak",t:tags("2006 piraka earth                                                                       ")},
{i:"8901-1",n:"Hakann",t:tags("2006 piraka fire                                                                        ")},
{i:"8902-1",n:"Vezok" ,t:tags("2006 piraka water have                                                                  ")},
{i:"8903-1",n:"Zaktan",t:tags("2006 piraka air                                                                         ")},
{i:"8904-1",n:"Avak"  ,t:tags("2006 piraka stone have                                                                  ")},
{i:"8905-1",n:"Thok"  ,t:tags("2006 piraka ice                                                                         ")},

{i:"8733-1",n:"Axonn"  ,t:tags("2006 titan silver                                                                      ")},
{i:"8734-1",n:"Brutaka",t:tags("2006 titan gold want                                                                   ")},
{i:"8764-1",n:"Vezon & Fenrakk",t:tags("2006 silver piraka and large red rahi                                          ")},

{i:"8728-1",n:"Hahli" ,t:tags("mid 2006 toaInika Hahli                                                                 ")},
{i:"8731-1",n:"Kongu" ,t:tags("mid 2006 toaInika Kongu                                                                 ")},
{i:"8732-1",n:"Matoro",t:tags("mid 2006 toaInika Matoro like                                                           ")},
{i:"8727-1",n:"Jaller",t:tags("mid 2006 toaInika Jaller dislike                                                        ")},
{i:"8729-1",n:"Nuparu",t:tags("mid 2006 toaInika Nuparu dislike                                                        ")},
{i:"8730-1",n:"Hewkii",t:tags("mid 2006 toaInika Hewkii dislike                                                        ")},

{i:"8625-1" ,n:"Umbra" ,t:tags("mid 2006 titan like           ")},

// {i:"8892-1" ,n:"Piraka Outpost"           ,t:tags("mid 2006 playset")},
// {i:"8893-1" ,n:"Lava Chamber Gate"        ,t:tags("mid 2006 playset")},
// {i:"8894-1" ,n:"Piraka Stronghold"        ,t:tags("mid 2006 playset")},
// {i:"8624-1" ,n:"Race for the Mask of Life",t:tags("mid 2006Edition playset")},
// {i:"8719-1" ,n:"Zamor Spheres" ,t:tags("2006 ammo")},
// {i:"8626-1" ,n:"Irnakk"        ,t:tags("2006Edition combinerModel")},
// {i:"10204-1",n:"Vezon & Kardas",t:tags("2006Edition combinerModel")},

///////////////
// Mahri Nui //
///////////////

{i:"8929-1",n:"Defilak",t:tags("2007 le matoranMahri                                                                   ")},
{i:"8930-1",n:"Dekar"  ,t:tags("2007 po matoranMahri built                                                              ")},
{i:"8931-1",n:"Thulox" ,t:tags("2007 fire  hydruka                                                                     ")},
{i:"8932-1",n:"Morak"  ,t:tags("2007 water hydruka want                                                                ")},

{i:"8916-1",n:"Takadox",t:tags("2007 blue  barraki like                                                                     ")},
{i:"8917-1",n:"Kalmah" ,t:tags("2007 red   barraki like                                                                     ")},
{i:"8918-1",n:"Carapar",t:tags("2007 brown barraki like                                                                     ")},
{i:"8919-1",n:"Mantax" ,t:tags("2007 black barraki like                                                                     ")},
{i:"8920-1",n:"Ehlek"  ,t:tags("2007 green barraki like                                                                     ")},
{i:"8921-1",n:"Pridak" ,t:tags("2007 white barraki like                                                                     ")},

{i:"8935-1",n:"Nocturn",t:tags("2007 titan cyan lime                                                                   ")},

{i:"8910-1",n:"Kongu" ,t:tags("mid 2007 toaMahri Kongu have                                                            ")},
{i:"8911-1",n:"Jaller",t:tags("mid 2007 toaMahri Jaller reallyWant                                                     ")},
{i:"8912-1",n:"Hewkii",t:tags("mid 2007 toaMahri Hewkii dislike                                                        ")},
{i:"8913-1",n:"Nuparu",t:tags("mid 2007 toaMahri Nuparu                                                                ")},
{i:"8914-1",n:"Hahli" ,t:tags("mid 2007 toaMahri Hahli reallyWant                                                      ")},
{i:"8915-1",n:"Matoro",t:tags("mid 2007 toaMahri Matoro want                                                           ")},

{i:"8922-1",n:"Gadunka"         ,t:tags("mid 2007 titan blue rahi                                                      ")},
{i:"8923-1",n:"Hydraxon"        ,t:tags("mid 2007 titan silver like                                                     ")},
{i:"8924-1",n:"Maxilos & Spinax",t:tags("mid 2007 red titan makuta and silver rahi like                                 ")},
{i:"8939-1",n:"Lesovikk"        ,t:tags("mid 2007 toaCordak and large vehicle like                                      ")},
{i:"8940-1",n:"Karzahni"        ,t:tags("mid 2007 green titan and ta matoranMahri and ga matoranMahri 3-in-1 love want ")},

// {i:"8925-1",n:"Barraki Deepsea Patrol",t:tags("mid 2007 playset                                                        ")},
// {i:"8926-1",n:"Toa Undersea Attack"   ,t:tags("mid 2007 playset                                                        ")},
// {i:"8927-1",n:"Toa Terrain Crawler"   ,t:tags("mid 2007 playset                                                        ")},
// {i:"8934-1",n:"Squid Ammo"            ,t:tags("2007 ammo                                                               ")},

///////////////
// Karda Nui //
///////////////

{i:"8944-1",n:"Tanma" ,t:tags("2008 air   matoranOfLight built                                                         ")},
{i:"8945-1",n:"Solek" ,t:tags("2008 ice   matoranOfLight                                                               ")},
{i:"8946-1",n:"Photok",t:tags("2008 stone matoranOfLight want                                                          ")},
{i:"8947-1",n:"Radiak",t:tags("2008 red   male   matoranOfShadow like                                                  ")},
{i:"8948-1",n:"Gavla" ,t:tags("2008 blue  female matoranOfShadow                                                       ")},
{i:"8949-1",n:"Kirop" ,t:tags("2008 black male   matoranOfShadow have                                                  ")},

{i:"8685-1",n:"Kopaka" ,t:tags("2008 toaPhantoka Kopaka                                                                ")},
{i:"8686-1",n:"Lewa"   ,t:tags("2008 toaPhantoka Lewa built                                                            ")},
{i:"8687-1",n:"Pohatu" ,t:tags("2008 toaPhantoka Pohatu like                                                           ")},
{i:"8691-1",n:"Antroz" ,t:tags("2008 makutaPhantoka Antroz                                                             ")},
{i:"8692-1",n:"Vamprah",t:tags("2008 blue makutaPhantoka reallyWant                                                    ")}, 
{i:"8693-1",n:"Chirox" ,t:tags("2008 black makutaPhantoka want                                                         ")},

{i:"8697-1",n:"Toa Ignika"    ,t:tags("2008 2-in-1 large vehicle and toaPhantoka                                       ")},
{i:"8952-1",n:"Mutran & Vican",t:tags("2008 2-in-1 large green makutaPhantoka and le matoranOfShadow                   ")},
{i:"8953-1",n:"Icarax"        ,t:tags("2008 red titan makuta                                                           ")},

///////////////////////////
// Karda Nui (the swamp) //
///////////////////////////

{i:"8688-1",n:"Gali"  ,t:tags("mid 2008 toaMistika Gali want                                                           ")},
{i:"8689-1",n:"Tahu"  ,t:tags("mid 2008 toaMistika Tahu dislike                                                        ")},
{i:"8690-1",n:"Onua"  ,t:tags("mid 2008 toaMistika Onua want                                                           ")},
{i:"8694-1",n:"Krika" ,t:tags("mid 2008 makutaMistika white want                                                       ")},
{i:"8695-1",n:"Gorast",t:tags("mid 2008 makutaMistika green                                                            ")},
{i:"8696-1",n:"Bitil" ,t:tags("mid 2008 makutaMistika yellow have                                                      ")},

{i:"8698-1",n:"Vultraz" ,t:tags("mid 2008 red matoranOfShadow and large vehicle                                        ")},
{i:"8699-1",n:"Takanuva",t:tags("mid 2008 titan Takanuva                                                               ")},

{i:"8941-1",n:"Rockoh T3" ,t:tags("mid 2008 large vehicle and toaPhantoka Pohatu                                       ")},
{i:"8943-1",n:"Axalara T9",t:tags("mid 2008 large vehicle and toaPhantoka Lewa                                         ")},
{i:"8942-1",n:"Jetrax T6" ,t:tags("mid 2008 large vehicle and makutaPhantoka Antroz                                    ")},
{i:"8954-1",n:"Mazeka"    ,t:tags("mid 2008 matoranKarda ko large vehicle                                              ")},
// {i:"8942-2",n:"Jetrax T6 (LE)",t:tags("mid 2008 large vehicle 2-in-1 makutaPhantoka red                        ")},

////////////////
// Bara Magna //
////////////////

{i:"8972-1",n:"Atakus",t:tags("2009 agori skrall                                                                       ")},
{i:"8973-1",n:"Raanu" ,t:tags("2009 agori fire                                                                         ")},
{i:"8974-1",n:"Tarduk",t:tags("2009 agori jungle                                                                       ")},
{i:"8975-1",n:"Berix" ,t:tags("2009 agori water                                                                        ")},
{i:"8976-1",n:"Metus" ,t:tags("2009 agori ice                                                                          ")},
{i:"8977-1",n:"Zesk"  ,t:tags("2009 agori sand want                                                                         ")},

{i:"8978-1",n:"Skrall",t:tags("2009 skrall glatorian built                                                             ")},
{i:"8979-1",n:"Malum" ,t:tags("2009 male fire glatorian want                                                           ")},
{i:"8980-1",n:"Gresh" ,t:tags("2009 glatorian Gresh                                                                    ")},
{i:"8981-1",n:"Tarix" ,t:tags("2009 male water glatorian dislike                                                       ")},
{i:"8982-1",n:"Strakk",t:tags("2009 male ice glatorian want                                                            ")},
{i:"8983-1",n:"Vorox" ,t:tags("2009 sand glatorian want                                                                ")},

{i:"8990-1",n:"Fero & Skirmix",t:tags("2009 agori and large animal                                                     ")},
{i:"8991-1",n:"Tuma"          ,t:tags("2009 titan skrall                                                               ")},

{i:"8984-1",n:"Stronius",t:tags("mid 2009 skrall glatorianLegend                                                       ")},
{i:"8985-1",n:"Ackar"   ,t:tags("mid 2009 male   fire   glatorianLegend                                                ")},
{i:"8986-1",n:"Vastus"  ,t:tags("mid 2009 male   jungle glatorianLegend                                                ")},
{i:"8987-1",n:"Kiina"   ,t:tags("mid 2009 female water  glatorianLegend built                                          ")},
{i:"8988-1",n:"Gelu"    ,t:tags("mid 2009 male   ice    glatorianLegend                                                ")},
{i:"8989-1",n:"Mata Nui",t:tags("mid 2009 male   gold   glatorianLegend ToaMataNui                                     ")},

{i:"8992-1",n:"Cendox V1"   ,t:tags("mid 2009 large vehicle and red agori                                              ")},
{i:"8993-1",n:"Kaxium V3"   ,t:tags("mid 2009 large vehicle and blue agori and blue agori                              ")},
{i:"8994-1",n:"Baranus V7"  ,t:tags("mid 2009 large vehicle and medium animal and agori                                ")},
{i:"8995-1",n:"Thornatus V9",t:tags("mid 2009 large vehicle and red glatorian and                                      ")},
{i:"8996-1",n:"Skopio XV-1" ,t:tags("mid 2009 huge  vehicle and iron agori                                             ")},

{i:"8998-1",n:"Toa Mata Nui",t:tags("mid 2009 titan gold ToaMataNui                                                     ")},

///////////////
// All stars //
///////////////

{i:"7116-1",n:"Tahu"    ,t:tags("2010 small toa Tahu built                                                    ")},
{i:"7117-1",n:"Gresh"   ,t:tags("2010 small glatorian Gresh                                                   ")},
{i:"7135-1",n:"Takanuva",t:tags("2010 small toa Takanuva                                                      ")},
{i:"7136-1",n:"Skrall"  ,t:tags("2010 small skrall                                                            ")},
{i:"7137-1",n:"Piraka"  ,t:tags("2010 small blue piraka                                                       ")},
{i:"7138-1",n:"Rahkshi" ,t:tags("2010 small yellow rahkshi want                                               ")},

/////////////////////////////////////////////////////////////////
//                                                             //
//  ██████╗ ███████╗███╗   ██╗    ████████╗██╗    ██╗ ██████╗  //
// ██╔════╝ ██╔════╝████╗  ██║    ╚══██╔══╝██║    ██║██╔═══██╗ //
// ██║  ███╗█████╗  ██╔██╗ ██║       ██║   ██║ █╗ ██║██║   ██║ //
// ██║   ██║██╔══╝  ██║╚██╗██║       ██║   ██║███╗██║██║   ██║ //
// ╚██████╔╝███████╗██║ ╚████║       ██║   ╚███╔███╔╝╚██████╔╝ //
//  ╚═════╝ ╚══════╝╚═╝  ╚═══╝       ╚═╝    ╚══╝╚══╝  ╚═════╝  //
//                                                             //
/////////////////////////////////////////////////////////////////
// Note on size:
// All CCBS have higher part counts
// So sizes are all shifted down by one.

/////////////
// Masters //
/////////////

// Better names...but also a lot shorter :)
{i:"70778-1",n:"Vizuna" ,t:tags("2015 protectorOf jungle - like                                                              ")},
{i:"70779-1",n:"Nilkuu" ,t:tags("2015 protectorOf stone                                                                ")},
{i:"70780-1",n:"Kivoda" ,t:tags("2015 protectorOf water - like                                                               ")},
{i:"70781-1",n:"Korgot" ,t:tags("2015 protectorOf earth                                                                ")},
{i:"70782-1",n:"Izotor" ,t:tags("2015 protectorOf ice                                                                  ")},
{i:"70783-1",n:"Narmoto",t:tags("2015 protectorOf fire - like                                                                ")},

{i:"70784-1",n:"Lewa"  , t:tags("2015 Lewa   masterOf jungle                                                           ")},
{i:"70785-1",n:"Pohatu", t:tags("2015 Pohatu masterOf        - like                                                             ")},
{i:"70786-1",n:"Gali"  , t:tags("2015 Gali   masterOf        - like                                                             ")},
{i:"70787-1",n:"Tahu"  , t:tags("2015 Tahu   masterOf        - like                                                             ")},
{i:"70788-1",n:"Kopaka", t:tags("2015 Kopaka masterOf                                                                  ")},
{i:"70789-1",n:"Onua"  , t:tags("2015 Onua   masterOf                                                                  ")},

{i:"70790-1",n:"Lord of Skull Spiders",t:tags("mid 2015 skullHunter                                                    ")},
{i:"70791-1",n:"Skull Warrior"        ,t:tags("mid 2015 skullHunter                                                    ")},
{i:"70792-1",n:"Skull Slicer"         ,t:tags("mid 2015 skullHunter                                                    ")},
{i:"70793-1",n:"Skull Basher"         ,t:tags("mid 2015 skullHunter                                                    ")},
{i:"70794-1",n:"Skull Scorpio"        ,t:tags("mid 2015 skullHunter                                                    ")},

{i:"70795-1",n:"Mask Maker vs. Skull Grinder",t:tags("mid 2015 large 2-in-1 skullHunter and Ekimu protectorOf          ")},

// {i:"5002941-1",n:"BIONICLE Hero Pack",t:tags("2015 booster promotional                                                 ")},

/////////////
// Uniters //
/////////////

{i:"71300-1",n:"Uxar" ,t:tags("2016 creatureOf jungle                                                                  ")},
{i:"71301-1",n:"Ketar",t:tags("2016 creatureOf stone                                                                   ")},
{i:"71302-1",n:"Akida",t:tags("2016 creatureOf water                                                                   ")},
{i:"71303-1",n:"Ikir" ,t:tags("2016 creatureOf fire                                                                    ")},
{i:"71304-1",n:"Terak",t:tags("2016 creatureOf earth                                                                   ")},

{i:"71305-1",n:"Lewa"          ,t:tags("2016 Lewa   uniterOf jungle                                                       ")},
{i:"71306-1",n:"Pohatu"        ,t:tags("2016 Pohatu uniterOf                                                           ")},
{i:"71307-1",n:"Gali"          ,t:tags("2016 Gali   uniterOf                                                             ")},
{i:"71308-1",n:"Tahu"          ,t:tags("2016 Tahu   uniterOf                                                             ")}, 
{i:"71309-1",n:"Onua"          ,t:tags("2016 Onua   uniterOf                                                             ")},
{i:"71311-1",n:"Kopaka & Melum",t:tags("2016 Kopaka uniterOf and creatureOf ice                                        ")},

{i:"71310-1",n:"Umarak",t:tags("2016 black titan Umarak                                                                ")},

{i:"71313-1" ,n:"Lava Beast"    ,t:tags("mid 2016 beastOf                                                              ")},
{i:"71314-1" ,n:"Storm Beast"   ,t:tags("mid 2016 beastOf                                                              ")},
{i:"71315-1" ,n:"Quake Beast"   ,t:tags("mid 2016 beastOf                                                              ")},

{i:"71312-1" ,n:"Ekimu" ,t:tags("mid 2016 gold cyan titan Ekimu - i like it                                                            ")},
{i:"71316-1" ,n:"Umarak",t:tags("mid 2016 black red titan Umarak                                                       ")},

// {i:"601601-1",n:"Skull Scorpion",t:tags("2016 small animal promotional                                                 ")},
// {i:"601602-1",n:"Ekimu's Hawk"  ,t:tags("2016 small animal promotional                                                 ")},
];
