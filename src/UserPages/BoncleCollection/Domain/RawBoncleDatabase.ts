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

{i:"8540-1",n:"Vakama",t:tags("mid 2001 turagaMata vakama have                                                         ")},
{i:"8541-1",n:"Matau" ,t:tags("mid 2001 turagaMata matau                                                               ")},
{i:"8542-1",n:"Onewa" ,t:tags("mid 2001 turagaMata onewa  have                                                         ")},
{i:"8543-1",n:"Nokama",t:tags("mid 2001 turagaMata nokama like                                                         ")},
{i:"8544-1",n:"Nuju"  ,t:tags("mid 2001 turagaMata nuju   have                                                         ")},
{i:"8545-1",n:"Whenua",t:tags("mid 2001 turagaMata whenua                                                              ")},

{i:"8531-1",n:"Pohatu",t:tags("mid 2001 toaMata pohatu                                                                 ")},
{i:"8532-1",n:"Onua"  ,t:tags("mid 2001 toaMata onua       love                                                        ")},
{i:"8533-1",n:"Gali"  ,t:tags("mid 2001 toaMata gali                                                                   ")},
{i:"8534-1",n:"Tahu"  ,t:tags("mid 2001 toaMata tahu                                                                   ")},
{i:"8535-1",n:"Lewa"  ,t:tags("mid 2001 toaMata lewa   air                                                             ")},
{i:"8536-1",n:"Kopaka",t:tags("mid 2001 toaMata kopaka                                                                 ")},

{i:"8537-1",n:"Nui-Rama"       ,t:tags("mid 2001 large rahi 2-in-1                                                     ")},
{i:"8538-1",n:"Muaka & Kane-ra",t:tags("mid 2001 large rahi 2-in-1                                                     ")},
{i:"8539-1",n:"Manas"          ,t:tags("mid 2001 large rahi 2-in-1                                                     ")},
{i:"8548-1",n:"Nui-Jaga"       ,t:tags("mid 2001 large rahi 2-in-1                                                     ")},
{i:"8549-1",n:"Tarakava"       ,t:tags("mid 2001 large rahi 2-in-1                                                     ")},

{i:"8546-1",n:"PowerPack"   ,t:tags("mid 2001 booster                                                                  ")},
{i:"8525-1",n:"Kanohi (US)" ,t:tags("mid 2001 booster                                                                  ")},
{i:"8530-1",n:"Kanohi (INT)",t:tags("mid 2001 booster                                                                  ")},

{i:"1388-1",n:"Huki"  ,t:tags("mid 2001 promotional matoranMata hewkii                                                 ")},
{i:"1389-1",n:"Onepu" ,t:tags("mid 2001 promotional matoranMata onu                                                    ")},
{i:"1390-1",n:"Maku"  ,t:tags("mid 2001 promotional matoranMata macku  dislike                                         ")},
{i:"1391-1",n:"Jala"  ,t:tags("mid 2001 promotional matoranMata jaller want                                            ")},
{i:"1392-1",n:"Kongu" ,t:tags("mid 2001 promotional matoranMata kongu                                                  ")},
{i:"1393-1",n:"Matoro",t:tags("mid 2001 promotional matoranMata matoro                                                 ")},

////////////////////////////
// Mata Nui (with Bohrok) //
////////////////////////////

{i:"8550-1",n:"Gahlok Va",t:tags("2002 bohrokVa ga                                                                     ")},
{i:"8551-1",n:"Kohrak Va",t:tags("2002 bohrokVa ko                                                                     ")},
{i:"8552-1",n:"Lehvak Va",t:tags("2002 bohrokVa le                                                                     ")},
{i:"8553-1",n:"Pahrak Va",t:tags("2002 bohrokVa po                                                                     ")},
{i:"8554-1",n:"Tahnok Va",t:tags("2002 bohrokVa ta                                                                     ")},
{i:"8555-1",n:"Nuhvok Va",t:tags("2002 bohrokVa onu                                                                    ")},

{i:"8560-1",n:"Pahrak",t:tags("2002 vanillaBohrok po                                                                   ")},
{i:"8561-1",n:"Nuhvok",t:tags("2002 vanillaBohrok onu                                                                  ")},
{i:"8562-1",n:"Gahlok",t:tags("2002 vanillaBohrok ga                                                                   ")},
{i:"8563-1",n:"Tahnok",t:tags("2002 vanillaBohrok ta                                                                   ")},
{i:"8564-1",n:"Lehvak",t:tags("2002 vanillaBohrok le                                                                   ")},
{i:"8565-1",n:"Kohrak",t:tags("2002 vanillaBohrok ko                                                                   ")},

{i:"8566-1",n:"Onua Nuva"  ,t:tags("mid 2002 toaNuva onua                                                              ")},
{i:"8567-1",n:"Lewa Nuva"  ,t:tags("mid 2002 toaNuva air lewa                                                          ")},
{i:"8568-1",n:"Pohatu Nuva",t:tags("mid 2002 toaNuva pohatu                                                            ")},
{i:"8570-1",n:"Gali Nuva"  ,t:tags("mid 2002 toaNuva gali                                                              ")},
{i:"8571-1",n:"Kopaka Nuva",t:tags("mid 2002 toaNuva kopaka                                                            ")},
{i:"8572-1",n:"Tahu Nuva"  ,t:tags("mid 2002 toaNuva tahu                                                              ")},

{i:"8556-1",n:"Boxor"          ,t:tags("mid 2002 large vehicle 2-in-1 matoranMata nuparu                               ")},
{i:"8557-1",n:"Exo-Toa"        ,t:tags("mid 2002 titan                                                                 ")},
{i:"8558-1",n:"Cahdok & Gahdok",t:tags("mid 2002 2-in-1 bahrag fire water                                              ")},

{i:"10023-1",n:"BIONICLE Master Builder Set",t:tags("mid 2002 booster                                                  ")},

/////////////////////////////
// Mata Nui (with Bohrok+) //
/////////////////////////////

{i:"8581-1",n:"Kopeke",t:tags("2003 matoranNuva kopeke                                                                 ")},
{i:"8582-1",n:"Matoro",t:tags("2003 matoranNuva matoro                                                                 ")},
{i:"8583-1",n:"Hahli" ,t:tags("2003 matoranNuva hahli                                                                  ")},
{i:"8584-1",n:"Hewkii",t:tags("2003 matoranNuva hewkii                                                                 ")},
{i:"8585-1",n:"Hafu"  ,t:tags("2003 matoranNuva po                                                                     ")},
{i:"8586-1",n:"Macku" ,t:tags("2003 matoranNuva macku                                                                  ")},

{i:"8573-1",n:"Nuhvok-Kal",t:tags("2003 bohrokKal onu                                                                  ")},
{i:"8574-1",n:"Tahnok-Kal",t:tags("2003 bohrokKal ta                                                                   ")},
{i:"8575-1",n:"Kohrak-Kal",t:tags("2003 bohrokKal ko                                                                   ")},
{i:"8576-1",n:"Lehvak-Kal",t:tags("2003 bohrokKal le                                                                   ")},
{i:"8577-1",n:"Pahrak-Kal",t:tags("2003 bohrokKal po                                                                   ")},
{i:"8578-1",n:"Gahlok-Kal",t:tags("2003 bohrokKal ga                                                                   ")},

{i:"8587-1",n:"Panrahk",t:tags("mid 2003 rahkshi stone                                                                 ")},
{i:"8588-1",n:"Kurahk" ,t:tags("mid 2003 rahkshi ice                                                                   ")},
{i:"8589-1",n:"Lerahk" ,t:tags("mid 2003 rahkshi air                                                                   ")},
{i:"8590-1",n:"Guurahk",t:tags("mid 2003 rahkshi water                                                                 ")},
{i:"8591-1",n:"Vorahk" ,t:tags("mid 2003 rahkshi earth                                                                 ")},
{i:"8592-1",n:"Turahk" ,t:tags("mid 2003 rahkshi fire                                                                  ")},

{i:"8593-1",n:"Makuta"        ,t:tags("mid 2003 makuta titan                                                           ")},
{i:"8594-1",n:"Jaller & Gukko",t:tags("mid 2003 matoranNuva jaller   large rahi 2-in-1                                 ")},
{i:"8595-1",n:"Takua & Pewku" ,t:tags("mid 2003 matoranNuva takanuva large rahi 2-in-1                                 ")},
{i:"8596-1",n:"Takanuva"      ,t:tags("mid 2003 toaNuva takanuva 2-in-1 large vehicle                                  ")},

{i:"3287-1",n:"Takutanuva"    ,t:tags("mid 2003 special combinerModel                                                  ")},

///////////////
// Metru Nui //
///////////////

{i:"8607-1",n:"Nuhrii" ,t:tags("2004 matoranMetru fire                                                                 ")},
{i:"8608-1",n:"Vhisola",t:tags("2004 matoranMetru water                                                                ")},
{i:"8609-1",n:"Tehutti",t:tags("2004 matoranMetru earth                                                                ")},
{i:"8610-1",n:"Ahkmou" ,t:tags("2004 matoranMetru stone badGuy                                                         ")},
{i:"8611-1",n:"Orkham" ,t:tags("2004 matoranMetru air                                                                  ")},
{i:"8612-1",n:"Ehrye"  ,t:tags("2004 matoranMetru ice                                                                  ")},

{i:"8601-1",n:"Toa Vakama",t:tags("2004 toaMetru vakama                                                                ")},
{i:"8602-1",n:"Toa Nokama",t:tags("2004 toaMetru nokama                                                                ")},
{i:"8603-1",n:"Toa Whenua",t:tags("2004 toaMetru whenua                                                                ")},
{i:"8604-1",n:"Toa Onewa" ,t:tags("2004 toaMetru onewa                                                                 ")},
{i:"8605-1",n:"Toa Matau" ,t:tags("2004 toaMetru matau                                                                 ")},
{i:"8606-1",n:"Toa Nuju"  ,t:tags("2004 toaMetru nuju                                                                  ")},

{i:"8614-1",n:"Vahki Nuurakh",t:tags("mid 2004 vahki fire                                                              ")},
{i:"8615-1",n:"Vahki Bordakh",t:tags("mid 2004 vahki water                                                             ")},
{i:"8616-1",n:"Vahki Vorzakh",t:tags("mid 2004 vahki air                                                               ")},
{i:"8617-1",n:"Vahki Zadakh" ,t:tags("mid 2004 vahki stone                                                             ")},
{i:"8618-1",n:"Vahki Rorzakh",t:tags("mid 2004 vahki earth                                                             ")},
{i:"8619-1",n:"Vahki Keerakh",t:tags("mid 2004 vahki ice                                                               ")},

{i:"8623-1",n:"Krekka" ,t:tags("mid 2004 titan                                                                         ")},
{i:"8622-1",n:"Nidhiki",t:tags("mid 2004 titan                                                                         ")},
{i:"8621-1",n:"Turaga Dume & Nivawk" ,t:tags("mid 2004 ta turagaMetru large rahi 2-in-1                                ")},
{i:"8811-1",n:"Toa Lhikan & Kikanalo",t:tags("mid 2004 special ta toaMangai large rahi 2-in-1                          ")},

{i:"10202-1",n:"Ultimate Dume",t:tags("2004 combinerModel                                                              ")},
{i:"8613-1" ,n:"Kanoka Disk Launcher Pack",t:tags("2004 ammo                                                           ")},

//////////////////////////
// Metru Nui (in ruins) //
//////////////////////////

{i:"4868-1",n:"Rahaga Gaaki"  ,t:tags("2005 rahaga ga                                                                  ")},
{i:"4869-1",n:"Rahaga Pouks"  ,t:tags("2005 rahaga po                                                                  ")},
{i:"4870-1",n:"Rahaga Kualus" ,t:tags("2005 rahaga ko                                                                  ")},
{i:"4877-1",n:"Rahaga Norik"  ,t:tags("2005 rahaga ta                                                                  ")},
{i:"4878-1",n:"Rahaga Bomonga",t:tags("2005 rahaga onu                                                                 ")},
{i:"4879-1",n:"Rahaga Iruini" ,t:tags("2005 rahaga le                                                                  ")},

// EU had visorak first, the hordika

{i:"8736-1",n:"Toa Hordika Vakama",t:tags("mid 2005 toaHordika vakama                                                  ")},
{i:"8737-1",n:"Toa Hordika Nokama",t:tags("mid 2005 toaHordika nokama                                                  ")},
{i:"8738-1",n:"Toa Hordika Whenua",t:tags("mid 2005 toaHordika whenua                                                  ")},
{i:"8739-1",n:"Toa Hordika Onewa" ,t:tags("mid 2005 toaHordika onewa                                                   ")},
{i:"8740-1",n:"Toa Hordika Matau" ,t:tags("mid 2005 toaHordika matau                                                   ")},
{i:"8741-1",n:"Toa Hordika Nuju"  ,t:tags("mid 2005 toaHordika nuju                                                    ")},

{i:"8742-1",n:"Visorak Vohtorak",t:tags("2005 visorak fire                                                             ")},
{i:"8743-1",n:"Visorak Boggarak",t:tags("2005 visorak water                                                            ")},
{i:"8744-1",n:"Visorak Oohnorak",t:tags("2005 visorak earth                                                            ")},
{i:"8745-1",n:"Visorak Roporak" ,t:tags("2005 visorak stone                                                            ")},
{i:"8746-1",n:"Visorak Keelerak",t:tags("2005 visorak air                                                              ")},
{i:"8747-1",n:"Visorak Suukorak",t:tags("2005 visorak ice                                                              ")},

{i:"8755-1",n:"Keetongu",t:tags("mid 2005 titan rahi                                                                   ")},
{i:"8756-1",n:"Sidorak" ,t:tags("mid 2005 titan male steltian                                                          ")},
{i:"8761-1",n:"Roodaka" ,t:tags("mid 2005 titan female vortixx                                                         ")},

{i:"8762-1",n:"Toa Iruini",t:tags("mid 2005 specialEdition toaHagah le                                                 ")},
{i:"8763-1",n:"Toa Norik" ,t:tags("mid 2005 specialEdition toaHagah ta                                                 ")},

{i:"8757-1" ,n:"Visorak Battle Ram" ,t:tags("mid 2005 playset                                                          ")},
{i:"8758-1" ,n:"Tower of Toa"       ,t:tags("mid 2005 playset                                                          ")},
{i:"8759-1" ,n:"Battle of Metru Nui",t:tags("mid 2005 playset                                                          ")},
{i:"8769-1" ,n:"Visorak's Gate"     ,t:tags("mid 2005 specialEdition playset                                           ")},
{i:"10203-1",n:"Voporak",t:tags("mid 2005 specialEdition titan steltian combinerModel                                  ")},
{i:"8748-1" ,n:"Rhotuka",t:tags("2005 ammo                                                                             ")},

//////////////
// Voya Nui //
//////////////

{i:"8721-1",n:"Velika",t:tags("2006 matoranInika po                                                                    ")},
{i:"8722-1",n:"Kazi"  ,t:tags("2006 matoranInika ko                                                                    ")},
{i:"8723-1",n:"Piruk" ,t:tags("2006 matoranInika le                                                                    ")},
{i:"8724-1",n:"Garan" ,t:tags("2006 matoranInika onu                                                                   ")},
{i:"8725-1",n:"Balta" ,t:tags("2006 matoranInika ta                                                                    ")},
{i:"8726-1",n:"Dalu"  ,t:tags("2006 matoranInika ga                                                                    ")},

{i:"8900-1",n:"Reidak",t:tags("2006 piraka earth                                                                       ")},
{i:"8901-1",n:"Hakann",t:tags("2006 piraka fire                                                                        ")},
{i:"8902-1",n:"Vezok" ,t:tags("2006 piraka water                                                                       ")},
{i:"8903-1",n:"Zaktan",t:tags("2006 piraka air                                                                         ")},
{i:"8904-1",n:"Avak"  ,t:tags("2006 piraka stone                                                                       ")},
{i:"8905-1",n:"Thok"  ,t:tags("2006 piraka ice                                                                         ")},

{i:"8733-1",n:"Axonn"  ,t:tags("2006 titan _displayWhite silver                                                        ")},
{i:"8734-1",n:"Brutaka",t:tags("2006 titan _displayGold  gold                                                          ")},
{i:"8764-1",n:"Vezon & Fenrakk",t:tags("2006 2-in-1 piraka large rahi                                                  ")},

{i:"8727-1",n:"Toa Jaller",t:tags("mid 2006 toaInika jaller                                                            ")},
{i:"8728-1",n:"Toa Hahli" ,t:tags("mid 2006 toaInika hahli                                                             ")},
{i:"8729-1",n:"Toa Nuparu",t:tags("mid 2006 toaInika nuparu                                                            ")},
{i:"8730-1",n:"Toa Hewkii",t:tags("mid 2006 toaInika hewkii                                                            ")},
{i:"8731-1",n:"Toa Kongu" ,t:tags("mid 2006 toaInika kongu                                                             ")},
{i:"8732-1",n:"Toa Matoro",t:tags("mid 2006 toaInika matoro                                                            ")},

{i:"8892-1",n:"Piraka Outpost"           ,t:tags("mid 2006 playset                                                     ")},
{i:"8893-1",n:"Lava Chamber Gate"        ,t:tags("mid 2006 playset                                                     ")},
{i:"8894-1",n:"Piraka Stronghold"        ,t:tags("mid 2006 playset                                                     ")},
{i:"8624-1",n:"Race for the Mask of Life",t:tags("mid 2006 specialEdition playset                                      ")},

{i:"8625-1" ,n:"Umbra" ,t:tags("mid 2006 specialEdition titan                                                          ")},

{i:"10204-1",n:"Vezon & Kardas",t:tags("2006 specialEdition combinerModel                                              ")},
{i:"8626-1" ,n:"Irnakk"        ,t:tags("2006 specialEdition combinerModel                                              ")},
{i:"8719-1" ,n:"Zamor Spheres" ,t:tags("2006 ammo                                                                      ")},

///////////////
// Mahri Nui //
///////////////

{i:"8929-1",n:"Defilak",t:tags("2007 matoranMahri le                                                                   ")},
{i:"8930-1",n:"Dekar"  ,t:tags("2007 matoranMahri po                                                                   ")},
{i:"8931-1",n:"Thulox" ,t:tags("2007 hydruka fire                                                                      ")},
{i:"8932-1",n:"Morak"  ,t:tags("2007 hydruka water                                                                     ")},

{i:"8916-1",n:"Takadox",t:tags("2007 barraki water                                                                     ")},
{i:"8917-1",n:"Kalmah" ,t:tags("2007 barraki fire                                                                      ")},
{i:"8918-1",n:"Carapar",t:tags("2007 barraki stone                                                                     ")},
{i:"8919-1",n:"Mantax" ,t:tags("2007 barraki earth                                                                     ")},
{i:"8920-1",n:"Ehlek"  ,t:tags("2007 barraki air                                                                       ")},
{i:"8921-1",n:"Pridak" ,t:tags("2007 barraki ice                                                                       ")},

{i:"8935-1",n:"Nocturn",t:tags("2007 special titan                                                                     ")},

{i:"8910-1",n:"Toa Kongu" ,t:tags("mid 2007 toaMahri kongu                                                             ")},
{i:"8911-1",n:"Toa Jaller",t:tags("mid 2007 toaMahri jaller                                                            ")},
{i:"8912-1",n:"Toa Hewkii",t:tags("mid 2007 toaMahri hewkii                                                            ")},
{i:"8913-1",n:"Toa Nuparu",t:tags("mid 2007 toaMahri nuparu                                                            ")},
{i:"8914-1",n:"Toa Hahli" ,t:tags("mid 2007 toaMahri hahli                                                             ")},
{i:"8915-1",n:"Toa Matoro",t:tags("mid 2007 toaMahri matoro                                                            ")},

{i:"8922-1",n:"Gadunka"         ,t:tags("mid 2007 titan                                                                ")},
{i:"8923-1",n:"Hydraxon"        ,t:tags("mid 2007 titan                                                                ")},
{i:"8924-1",n:"Maxilos & Spinax",t:tags("mid 2007 titan makuta 2-in-1 medium rahi                                      ")},
{i:"8939-1",n:"Lesovikk"        ,t:tags("mid 2007 special toaCordak large vehicle 2-in-1                               ")},
{i:"8940-1",n:"Karzahni"        ,t:tags("mid 2007 special 3-in-1 titan matoranMahri ta ga _displayGreen                ")},

{i:"8925-1",n:"Barraki Deepsea Patrol",t:tags("mid 2007 playset                                                        ")},
{i:"8926-1",n:"Toa Undersea Attack"   ,t:tags("mid 2007 playset                                                        ")},
{i:"8927-1",n:"Toa Terrain Crawler"   ,t:tags("mid 2007 playset                                                        ")},

{i:"8934-1",n:"Squid Ammo",t:tags("2007 ammo                                                                           ")},

///////////////
// Karda Nui //
///////////////

{i:"8944-1",n:"Tanma" ,t:tags("2008 matoranOfLight air                                                                 ")},
{i:"8945-1",n:"Solek" ,t:tags("2008 matoranOfLight ice                                                                 ")},
{i:"8946-1",n:"Photok",t:tags("2008 matoranOfLight stone                                                               ")},
{i:"8947-1",n:"Radiak",t:tags("2008 matoranOfShadow fire                                                               ")},
{i:"8948-1",n:"Gavla" ,t:tags("2008 matoranOfShadow water                                                              ")},
{i:"8949-1",n:"Kirop" ,t:tags("2008 matoranOfShadow earth                                                              ")},

{i:"8685-1",n:"Toa Kopaka",t:tags("2008 toaPhantoka kopaka                                                             ")},
{i:"8686-1",n:"Toa Lewa"  ,t:tags("2008 toaPhantoka air lewa                                                           ")},
{i:"8687-1",n:"Toa Pohatu",t:tags("2008 toaPhantoka pohatu                                                             ")},
{i:"8691-1",n:"Antroz"    ,t:tags("2008 makutaPhantoka fire                                                            ")},
{i:"8692-1",n:"Vamprah"   ,t:tags("2008 makutaPhantoka water love                                                      ")},
{i:"8693-1",n:"Chirox"    ,t:tags("2008 makutaPhantoka earth                                                           ")},

{i:"8697-1",n:"Toa Ignika"    ,t:tags("2008 toaPhantoka vehicle 2-in-1                                                 ")},
{i:"8952-1",n:"Mutran & Vican",t:tags("2008 special matoranOfShadow large makutaPhantoka 2-in-1                        ")},
{i:"8953-1",n:"Makuta Icarax" ,t:tags("2008 special titan makuta                                                       ")},

///////////////////////////
// Karda Nui (the swamp) //
///////////////////////////

{i:"8688-1",n:"Toa Gali",t:tags("mid 2008 toaMistika gali                                                              ")},
{i:"8689-1",n:"Toa Tahu",t:tags("mid 2008 toaMistika tahu                                                              ")},
{i:"8690-1",n:"Toa Onua",t:tags("mid 2008 toaMistika onua                                                              ")},
{i:"8694-1",n:"Krika" ,t:tags("mid 2008 makutaMistika white red                                                        ")},
{i:"8695-1",n:"Gorast",t:tags("mid 2008 makutaMistika green black                                                      ")},
{i:"8696-1",n:"Bitil" ,t:tags("mid 2008 makutaMistika yellow black                                                     ")},

{i:"8698-1",n:"Vultraz" ,t:tags("mid 2008 matoranOfShadow vehicle                                                      ")},
{i:"8699-1",n:"Takanuva",t:tags("mid 2008 titan takanuva                                                               ")},

{i:"8941-1",n:"Rockoh T3"     ,t:tags("mid 2008 large vehicle 2-in-1 toaPhantoka pohatu                                ")},
{i:"8943-1",n:"Axalara T9"    ,t:tags("mid 2008 large vehicle 2-in-1 toaPhantoka air lewa                              ")},
{i:"8942-1",n:"Jetrax T6"     ,t:tags("mid 2008         large vehicle 2-in-1 makutaPhantoka                            ")},
{i:"8954-1",n:"Mazeka"        ,t:tags("mid 2008 special matoranKarda ko large vehicle                                  ")},
// {i:"8942-2",n:"Jetrax T6 (LE)",t:tags("mid 2008 special large vehicle 2-in-1 makutaPhantoka red                        ")},

////////////////
// Bara Magna //
////////////////

{i:"8972-1",n:"Atakus",t:tags("2009 agori skrall                                                                       ")},
{i:"8973-1",n:"Raanu" ,t:tags("2009 agori fire                                                                         ")},
{i:"8974-1",n:"Tarduk",t:tags("2009 agori jungle                                                                       ")},
{i:"8975-1",n:"Berix" ,t:tags("2009 agori water                                                                        ")},
{i:"8976-1",n:"Metus" ,t:tags("2009 agori ice                                                                          ")},
{i:"8977-1",n:"Zesk"  ,t:tags("2009 agori sand                                                                         ")},

{i:"8978-1",n:"Skrall",t:tags("2009 vanillaGlatorian skrall                                                            ")},
{i:"8979-1",n:"Malum" ,t:tags("2009 vanillaGlatorian fire                                                              ")},
{i:"8980-1",n:"Gresh" ,t:tags("2009 vanillaGlatorian jungle                                                            ")},
{i:"8981-1",n:"Tarix" ,t:tags("2009 vanillaGlatorian water                                                             ")},
{i:"8982-1",n:"Strakk",t:tags("2009 vanillaGlatorian ice                                                               ")},
{i:"8983-1",n:"Vorox" ,t:tags("2009 vanillaGlatorian sand                                                              ")},

{i:"8990-1",n:"Fero & Skirmix",t:tags("2009 agori large animal 2-in-1                                                  ")},
{i:"8991-1",n:"Tuma"          ,t:tags("2009 large skrall                                                               ")},

{i:"8984-1",n:"Stronius",t:tags("mid 2009 glatorianLegend skrall                                                       ")},
{i:"8985-1",n:"Ackar"   ,t:tags("mid 2009 glatorianLegend fire                                                         ")},
{i:"8986-1",n:"Vastus"  ,t:tags("mid 2009 glatorianLegend jungle                                                       ")},
{i:"8987-1",n:"Kiina"   ,t:tags("mid 2009 glatorianLegend water                                                        ")},
{i:"8988-1",n:"Gelu"    ,t:tags("mid 2009 glatorianLegend ice                                                          ")},
{i:"8989-1",n:"Mata Nui",t:tags("mid 2009 glatorianLegend _displayGold                                                 ")},

{i:"8992-1",n:"Cendox V1"   ,t:tags("mid 2009 large vehicle 2-in-1 agori                                               ")},
{i:"8993-1",n:"Kaxium V3"   ,t:tags("mid 2009 large vehicle 3-in-1 agori                                               ")},
{i:"8994-1",n:"Baranus V7"  ,t:tags("mid 2009 large vehicle 3-in-1 agori animal                                        ")},
{i:"8995-1",n:"Thornatus V9",t:tags("mid 2009 large vehicle 2-in-1 glatorian                                           ")},
{i:"8996-1",n:"Skopio XV-1" ,t:tags("mid 2009 huge  vehicle 2-in-1 agori iron                                          ")},

{i:"8998-1",n:"Toa Mata Nui",t:tags("mid 2009 special titan _displayGold                                               ")},

///////////////
// All stars //
///////////////

{i:"7116-1",n:"Tahu"    ,t:tags("2010 small allStars toa       tahu                                                          ")},
{i:"7117-1",n:"Gresh"   ,t:tags("2010 small allStars glatorian jungle                                                        ")},
{i:"7135-1",n:"Takanuva",t:tags("2010 small allStars toa       takanuva                                                      ")},
{i:"7136-1",n:"Skrall"  ,t:tags("2010 small allStars skrall                                                           ")},
{i:"7137-1",n:"Piraka"  ,t:tags("2010 small allStars piraka water                                                            ")},
{i:"7138-1",n:"Rahkshi" ,t:tags("2010 small allStars rahkshi _displayGold                                                    ")},

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

/////////////
// Masters //
/////////////

// Better names...but also a lot shorter :)
{i:"70778-1",n:"Vizuna" ,t:tags("2015 protectorOf jungle                                                               ")},
{i:"70779-1",n:"Nilkuu" ,t:tags("2015 protectorOf stone                                                                ")},
{i:"70780-1",n:"Kivoda" ,t:tags("2015 protectorOf water                                                                ")},
{i:"70781-1",n:"Korgot" ,t:tags("2015 protectorOf earth                                                                ")},
{i:"70782-1",n:"Izotor" ,t:tags("2015 protectorOf ice                                                                  ")},
{i:"70783-1",n:"Narmoto",t:tags("2015 protectorOf fire                                                                 ")},

{i:"70784-1",n:"Master Lewa"  , t:tags("2015 masterOf jungle lewa                                                      ")},
{i:"70785-1",n:"Master Pohatu", t:tags("2015 masterOf pohatu                                                           ")},
{i:"70786-1",n:"Mistress Gali", t:tags("2015 masterOf gali                                                             ")}, // :3
{i:"70787-1",n:"Master Tahu"  , t:tags("2015 large masterOf tahu                                                       ")},
{i:"70788-1",n:"Master Kopaka", t:tags("2015 large masterOf kopaka                                                     ")},
{i:"70789-1",n:"Master Onua"  , t:tags("2015 large masterOf onua                                                       ")},

{i:"70790-1",n:"Lord of Skull Spiders",t:tags("mid 2015 skullHunter                                                    ")},
{i:"70791-1",n:"Skull Warrior"        ,t:tags("mid 2015 skullHunter                                                    ")},
{i:"70792-1",n:"Skull Slicer"         ,t:tags("mid 2015 skullHunter                                                    ")},
{i:"70793-1",n:"Skull Basher"         ,t:tags("mid 2015 skullHunter                                                    ")},
{i:"70794-1",n:"Skull Scorpio"        ,t:tags("mid 2015 skullHunter                                                    ")},

{i:"70795-1",n:"Mask Maker vs. Skull Grinder",t:tags("mid 2015 large 2-in-1 skullHunter protectorOf                    ")},
{i:"5002941-1",n:"BIONICLE Hero Pack",t:tags("2015 booster promotional                                                 ")},

/////////////
// Uniters //
/////////////

{i:"71300-1",n:"Uxar",t:tags("2016 creatureOf jungle                                                                            ")},
{i:"71301-1",n:"Ketar",t:tags("2016 creatureOf stone                                                                            ")},
{i:"71302-1",n:"Akida",t:tags("2016 creatureOf water                                                                            ")},
{i:"71303-1",n:"Ikir"  ,t:tags("2016 creatureOf fire                                                                            ")},
{i:"71304-1",n:"Terak",t:tags("2016 creatureOf earth                                                                            ")},

{i:"71305-1",n:"Uniter Lewa"  , t:tags("2016       uniterOf jungle lewa                                                         ")},
{i:"71306-1",n:"Uniter Pohatu", t:tags("2016       uniterOf pohatu                                                              ")},
{i:"71307-1",n:"Uniter Gali"  , t:tags("2016       uniterOf gali                                                                ")},
{i:"71308-1",n:"Uniter Tahu"  , t:tags("2016 large uniterOf tahu                                                                ")},
{i:"71309-1",n:"Uniter Onua"  , t:tags("2016 large uniterOf onua                                                                ")},
{i:"71311-1",n:"Uniter Kopaka and Melum",t:tags("2016 large uniterOf kopaka 2-in-1 creatureOf                                   ")},
{i:"71310-1",n:"Umarak, the Hunter"     ,t:tags("2016 titan                                                                     ")},

{i:"71313-1" ,n:"Lava Beast"    ,t:tags("mid 2016 beastOf                                                                       ")},
{i:"71314-1" ,n:"Storm Beast"   ,t:tags("mid 2016 beastOf                                                                       ")},
{i:"71315-1" ,n:"Quake Beast"   ,t:tags("mid 2016 beastOf                                                                       ")},
{i:"601601-1",n:"Skull Scorpion",t:tags("2016 small animal promotional                                                          ")},
{i:"601602-1",n:"Ekimu's Hawk"  ,t:tags("2016 small animal promotional                                                          ")},

{i:"71312-1" ,n:"Ekimu, the Mask Maker",t:tags("mid 2016 titan                                                                  ")},
{i:"71316-1" ,n:"Umarak, the Destroyer",t:tags("mid 2016 titan                                                                  ")},
];
