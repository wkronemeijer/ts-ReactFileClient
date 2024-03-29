// Sources:
// https://biosector01.com/wiki/Sets
// https://biosector01.com/wiki/Hero_Factory#List_of_Sets

// https://biosector01.com/wiki/Template:SetsNav
// https://hf.biosector01.com/wiki/Template:SetsNav


import { BoncleSetTemplateTree, BoncleSetTemplateTree_flatten } from "../SetTemplateTree";
import { common, tags, listOf } from "../Tagging/TagTools";

const nestedDb: BoncleSetTemplateTree = {
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

[common(tags("mid 2001"))]: {
    [common(tags("promotional matoranMata"))]: listOf(
        {i:"1393-1",n:"Matoro",t:tags("| ko  |            |")},
        {i:"1391-1",n:"Jaller",t:tags("| ta  |            |")},
        {i:"1390-1",n:"Macku" ,t:tags("| ga  | loveToHave |")},
        {i:"1392-1",n:"Kongu" ,t:tags("| le  |            |")},
        {i:"1388-1",n:"Hewkii",t:tags("| po  | likeToHave |")},
        {i:"1389-1",n:"Onepu" ,t:tags("| onu |            |")},
    ), 
    [common(tags("turagaMata"))]: listOf(
        {i:"8544-1",n:"Nuju"  ,t:tags("| built        |")},
        {i:"8540-1",n:"Vakama",t:tags("| missingParts |")},
        {i:"8543-1",n:"Nokama",t:tags("| want         |")},
        {i:"8541-1",n:"Matau" ,t:tags("|              |")},
        {i:"8542-1",n:"Onewa" ,t:tags("| built        |")},
        {i:"8545-1",n:"Whenua",t:tags("| like         |")},
    ), 
    [common(tags("toaMata"))]: listOf(
        {i:"8536-1",n:"Kopaka",t:tags("| have       |")},
        {i:"8534-1",n:"Tahu"  ,t:tags("| like have  |")},
        {i:"8533-1",n:"Gali"  ,t:tags("| built      |")},
        {i:"8535-1",n:"Lewa"  ,t:tags("| built      |")},
        {i:"8531-1",n:"Pohatu",t:tags("| built      |")},
        {i:"8532-1",n:"Onua"  ,t:tags("| built      |")},
    ), 
    [common(tags("2-in-1 large rahi"))]: listOf(
        {i:"8538-1",n:"Muaka & Kane-ra",t:tags("| red    |")},
        {i:"8548-1",n:"Nui-Jaga"       ,t:tags("| blue   |")},
        {i:"8549-1",n:"Tarakava"       ,t:tags("| blue   |")},
        {i:"8537-1",n:"Nui-Rama"       ,t:tags("| lime   |")},
        {i:"8539-1",n:"Manas"          ,t:tags("| yellow |")},
    ), 
},

////////////////////////////
// Mata Nui (with Bohrok) //
////////////////////////////

[common(tags("2002"))]: {
    [common(tags("bohrokVa"))]: listOf(
        {i:"8551-1",n:"Kohrak Va",t:tags("| ice   | have  |")},
        {i:"8554-1",n:"Tahnok Va",t:tags("| fire  | built |")},
        {i:"8550-1",n:"Gahlok Va",t:tags("| water | have  |")},
        {i:"8552-1",n:"Lehvak Va",t:tags("| air   |       |")},
        {i:"8553-1",n:"Pahrak Va",t:tags("| stone | have  |")},
        {i:"8555-1",n:"Nuhvok Va",t:tags("| earth | have  |")},
    ), 
    [common(tags("bohrok"))]: listOf(
        {i:"8565-1",n:"Kohrak",t:tags("| ice   | built |")},
        {i:"8563-1",n:"Tahnok",t:tags("| fire  |       |")},
        {i:"8562-1",n:"Gahlok",t:tags("| water | built |")},
        {i:"8564-1",n:"Lehvak",t:tags("| air   |       |")},
        {i:"8560-1",n:"Pahrak",t:tags("| stone |       |")},
        {i:"8561-1",n:"Nuhvok",t:tags("| earth |       |")},
    ), 
},

[common(tags("mid 2002"))]: {
    [common(tags("toaNuva"))]: listOf(
        {i:"8571-1",n:"Kopaka",t:tags("| like      |")},
        {i:"8572-1",n:"Tahu"  ,t:tags("| built     |")},
        {i:"8570-1",n:"Gali"  ,t:tags("| like      |")},
        {i:"8567-1",n:"Lewa"  ,t:tags("|           |")},
        {i:"8568-1",n:"Pohatu",t:tags("| hate      |")},
        {i:"8566-1",n:"Onua"  ,t:tags("| i want it |")},
    ), 
    [common(tags("|"))]: listOf(
        {i:"8556-1" ,n:"Nuparu & Boxor"    ,t:tags("| matoranMata & large vehicle | love |")},
        {i:"8557-1" ,n:"Exo-Toa"           ,t:tags("| titan                       |      |")},
        {i:"8558-1" ,n:"Cahdok & Gahdok"   ,t:tags("| fire bahrag & water bahrag  |      |")},
        {i:"10023-1",n:"Master Builder Set",t:tags("| rahi                        |      |")},
    ), 
},

/////////////////////////////
// Mata Nui (with Bohrok+) //
/////////////////////////////

[common(tags("2003"))]: {
    [common(tags("matoranNuva"))]: listOf(
        {i:"8581-1",n:"Kopeke",t:tags("| ko |           |")},
        {i:"8582-1",n:"Matoro",t:tags("| ko |           |")},
        {i:"8583-1",n:"Hahli" ,t:tags("| ga | built     |")},
        {i:"8586-1",n:"Macku" ,t:tags("| ga | like      |")},
        {i:"8584-1",n:"Hewkii",t:tags("| po | like      |")},
        {i:"8585-1",n:"Hafu"  ,t:tags("| po | like      |")},
    ), 
    [common(tags("bohrokKal"))]: listOf(
        {i:"8575-1",n:"Kohrak-Kal",t:tags("| white | of sonics      |")},
        {i:"8574-1",n:"Tahnok-Kal",t:tags("| red   | of electricity |")},
        {i:"8578-1",n:"Gahlok-Kal",t:tags("| blue  | of magnetism   |")},
        {i:"8576-1",n:"Lehvak-Kal",t:tags("| green | of vacuum      |")},
        {i:"8577-1",n:"Pahrak-Kal",t:tags("| brown | of plasma      |")},
        {i:"8573-1",n:"Nuhvok-Kal",t:tags("| black | of gravity     |")},
    ), 
},

[common(tags("mid 2003"))]: {
    [common(tags("rahkshi"))]: listOf(
        // Rahkshi elements are funny
        {i:"8588-1",n:"Kurahk" ,t:tags("| white |       |")},
        {i:"8592-1",n:"Turahk" ,t:tags("| red   | built |")},
        {i:"8590-1",n:"Guurahk",t:tags("| blue  | want  |")},
        {i:"8589-1",n:"Lerahk" ,t:tags("| green |       |")},
        {i:"8587-1",n:"Panrahk",t:tags("| brown |       |")}, 
        {i:"8591-1",n:"Vorahk" ,t:tags("| black |       |")},
    ), 
    [common(tags("|"))]: listOf(
        {i:"8594-1",n:"Jaller & Gukko"    ,t:tags("|     matoranNuva & large rahi    |")},
        {i:"8595-1",n:"Takua & Pewku"     ,t:tags("| red matoranNuva & large rahi    |")},
        {i:"8596-1",n:"Takanuva & Ussanui",t:tags("|         toaNuva & large vehicle |")},
        {i:"8593-1",n:"Teridax"           ,t:tags("| titan makuta                    |")},
    ), 
},

///////////////
// Metru Nui //
///////////////

[common(tags("2004"))]:{
    [common(tags("matoranMetru"))]: listOf(
        {i:"8612-1",n:"Ehrye"  ,t:tags("| ko  | built       |")},
        {i:"8607-1",n:"Nuhrii" ,t:tags("| ta  | have        |")},
        {i:"8608-1",n:"Vhisola",t:tags("| ga  | brokenParts |")},
        {i:"8611-1",n:"Orkham" ,t:tags("| le  |             |")},
        {i:"8610-1",n:"Ahkmou" ,t:tags("| po  | have        |")},
        {i:"8609-1",n:"Tehutti",t:tags("| onu |             |")},
    ), 
    [common(tags("toaMetru | have"))]: listOf(
        {i:"8606-1",n:"Nuju"  ,t:tags("| have  |")},
        {i:"8601-1",n:"Vakama",t:tags("| built |")},
        {i:"8602-1",n:"Nokama",t:tags("| built |")},
        {i:"8605-1",n:"Matau" ,t:tags("| built |")},
        {i:"8604-1",n:"Onewa" ,t:tags("| built |")},
        {i:"8603-1",n:"Whenua",t:tags("| built |")},
    ), 
},

[common(tags("mid 2004"))]:{
    [common(tags("vahki"))]: listOf(
        {i:"8619-1",n:"Keerakh",t:tags("| white | have |")},
        {i:"8614-1",n:"Nuurakh",t:tags("| red   |      |")},
        {i:"8615-1",n:"Bordakh",t:tags("| blue  | have |")},
        {i:"8616-1",n:"Vorzakh",t:tags("| green |      |")},
        {i:"8617-1",n:"Zadakh" ,t:tags("| brown | have |")},
        {i:"8618-1",n:"Rorzakh",t:tags("| black | have |")},
    ), 
    [common(tags("male titan"))]: listOf(
        {i:"8623-1",n:"Krekka" ,t:tags("| blue  |")},
        {i:"8622-1",n:"Nidhiki",t:tags("| green |")},
    ), 
    [common(tags("2-in-1 & large rahi"))]: listOf(
        {i:"8621-1",n:"Dume & Nivawk"    ,t:tags("| ta turagaMetru | dislike it |")},
        {i:"8811-1",n:"Lhikan & Kikanalo",t:tags("| ta toaMangai   | love it    |")},
    ), 
},

//////////////////////////
// Metru Nui (in ruins) //
//////////////////////////

[common(tags("2005"))]: {
    [common(tags("rahaga"))]: listOf(
        {i:"4870-1",n:"Kualus ",t:tags("| ko  |       |")},
        {i:"4877-1",n:"Norik  ",t:tags("| ta  | have  |")},
        {i:"4868-1",n:"Gaaki  ",t:tags("| ga  | built |")},
        {i:"4879-1",n:"Iruini ",t:tags("| le  |       |")},
        {i:"4869-1",n:"Pouks  ",t:tags("| po  |       |")},
        {i:"4878-1",n:"Bomonga",t:tags("| onu |       |")},
    ), 
    [common(tags("visorak"))]: listOf(
        {i:"8747-1",n:"Suukorak",t:tags("| white | like  |")},
        {i:"8742-1",n:"Vohtorak",t:tags("| red   |       |")},
        {i:"8743-1",n:"Boggarak",t:tags("| blue  | built |")},
        {i:"8746-1",n:"Keelerak",t:tags("| green |       |")},
        {i:"8745-1",n:"Roporak" ,t:tags("| brown |       |")},
        {i:"8744-1",n:"Oohnorak",t:tags("| black |       |")},
    ), 
},

[common(tags("mid 2005"))]: {
    // EU had visorak first, the hordika
    [common(tags("toaHordika"))]: listOf(
        {i:"8741-1",n:"Nuju"  ,t:tags("| like       |")},
        {i:"8736-1",n:"Vakama",t:tags("|            |")},
        {i:"8737-1",n:"Nokama",t:tags("| reallyWant |")},
        {i:"8740-1",n:"Matau" ,t:tags("|            |")},
        {i:"8739-1",n:"Onewa" ,t:tags("| want       |")},
        {i:"8738-1",n:"Whenua",t:tags("| built      |")},
    ), 
    [common(tags("titan"))]: listOf(
        {i:"8755-1",n:"Keetongu",t:tags("| rahi           |            |")},
        {i:"8756-1",n:"Sidorak" ,t:tags("| male steltian  |            |")},
        {i:"8761-1",n:"Roodaka" ,t:tags("| female vortixx | reallyWant |")},
    ), 
    [common(tags("toaHagah"))]: listOf(
        {i:"8763-1",n:"Norik" ,t:tags("| ta |       |")},
        {i:"8762-1",n:"Iruini",t:tags("| le | built |")},
    ), 
},

//////////////
// Voya Nui //
//////////////

[common(tags("2006"))]:{
    [common(tags("matoranInika"))]: listOf(
        {i:"8722-1",n:"Kazi"  ,t:tags("| ko  |      |")},
        {i:"8725-1",n:"Balta" ,t:tags("| ta  |      |")},
        {i:"8726-1",n:"Dalu"  ,t:tags("| ga  |      |")},
        {i:"8723-1",n:"Piruk" ,t:tags("| le  | want |")},
        {i:"8721-1",n:"Velika",t:tags("| po  |      |")},
        {i:"8724-1",n:"Garan" ,t:tags("| onu |      |")},
    ), 
    [common(tags("piraka"))]: listOf(
        // Skakdi do have elements, just need a tool
        {i:"8905-1",n:"Thok"  ,t:tags("| ice   |       |")},
        {i:"8901-1",n:"Hakann",t:tags("| fire  |       |")},
        {i:"8902-1",n:"Vezok" ,t:tags("| water | built |")},
        {i:"8903-1",n:"Zaktan",t:tags("| air   |       |")},
        {i:"8904-1",n:"Avak"  ,t:tags("| stone | built |")},
        {i:"8900-1",n:"Reidak",t:tags("| earth |       |")},
    ), 
    [common(tags("titan"))]: listOf(
        {i:"8733-1",n:"Axonn"  ,t:tags("| silver |      |")},
        {i:"8734-1",n:"Brutaka",t:tags("| gold   | want |")},
    ), 
    [common(tags("|"))]: listOf(
        {i:"8764-1",n:"Vezon & Fenrakk",t:tags("| silver piraka & large red rahi |")},
    ), 
},

[common(tags("mid 2006"))]:{
    [common(tags("toaInika"))]: listOf(
        {i:"8732-1",n:"Matoro",t:tags("| like    |")},
        {i:"8727-1",n:"Jaller",t:tags("| dislike |")},
        {i:"8728-1",n:"Hahli" ,t:tags("|         |")},
        {i:"8731-1",n:"Kongu" ,t:tags("|         |")},
        {i:"8730-1",n:"Hewkii",t:tags("|         |")},
        {i:"8729-1",n:"Nuparu",t:tags("| dislike |")},
    ), 
    [common(tags("titan"))]: listOf(
        {i:"8625-1",n:"Umbra",t:tags("| like |")},
    ),
},

///////////////
// Mahri Nui //
///////////////

[common(tags("2007"))]: {
    [common(tags("matoranMahri"))]: listOf(
        {i:"8929-1",n:"Defilak",t:tags("| le |       |")},
        {i:"8930-1",n:"Dekar"  ,t:tags("| po | built |")},
    ), 
    [common(tags("hydruka"))]: listOf(
        {i:"8931-1",n:"Thulox" ,t:tags("| red  |      |")},
        {i:"8932-1",n:"Morak"  ,t:tags("| blue | want |")},
    ), 
    [common(tags("barraki"))]: listOf(
        {i:"8921-1",n:"Pridak" ,t:tags("| white | want  |")},
        {i:"8917-1",n:"Kalmah" ,t:tags("| red   | want  |")},
        {i:"8916-1",n:"Takadox",t:tags("| blue  | built |")},
        {i:"8920-1",n:"Ehlek"  ,t:tags("| green | want  |")},
        {i:"8918-1",n:"Carapar",t:tags("| brown | want  |")},
        {i:"8919-1",n:"Mantax" ,t:tags("| black | want  |")},
    ), 
    [common(tags("|"))]: listOf(
        {i:"8935-1",n:"Nocturn",t:tags("| titan cyan lime |")},
    ), 
},

[common(tags("| mid 2007 |"))]: {
    [common(tags("| toaMahri |"))]: listOf(
        {i:"8915-1",n:"Matoro",t:tags("| want  |")},
        {i:"8911-1",n:"Jaller",t:tags("| built | 2-in-1 | & rahi |")},
        {i:"8914-1",n:"Hahli" ,t:tags("| built |")},
        {i:"8910-1",n:"Kongu" ,t:tags("| built |")},
        {i:"8912-1",n:"Hewkii",t:tags("|       |")},
        {i:"8913-1",n:"Nuparu",t:tags("|       |")},
    ), 
    [common(tags("| titan |"))]: listOf(
        {i:"8923-1",n:"Hydraxon"        ,t:tags("|        | silver                    | like |")},
        {i:"8924-1",n:"Maxilos & Spinax",t:tags("| 2-in-1 | red Teridax & silver rahi | like |")},
        {i:"8922-1",n:"Gadunka"         ,t:tags("|        | blue rahi                 | like |")},
    ), 
    [common(tags("|"))]: listOf(
        {i:"8940-1",n:"Karzahni & al.",t:tags(`| 4-in-1 | love want | \
            & green titan     \
            & ta matoranMahri \
            & ga matoranMahri \
            & stationary      \
        |`)},
        {i:"8939-1",n:"Lesovikk",t:tags("| 2-in-1 | toaCordak & large vehicle | want |")},
    ), 
},

///////////////
// Karda Nui //
///////////////

[common(tags("2008"))]: {
    [common(tags("matoranOfLight"))]: listOf(
        {i:"8945-1",n:"Solek" ,t:tags("| white  |       |")},
        {i:"8944-1",n:"Tanma" ,t:tags("| lime   | built |")},
        {i:"8946-1",n:"Photok",t:tags("| orange | want  |")},
    ),
    [common(tags("matoranOfShadow"))]: listOf(
        {i:"8947-1",n:"Radiak",t:tags("| red   | male   | like  |")},
        {i:"8948-1",n:"Gavla" ,t:tags("| blue  | female |       |")},
        {i:"8949-1",n:"Kirop" ,t:tags("| black | male   | built |")},
    ), 
    [common(tags("toaPhantoka"))]: listOf(
        {i:"8685-1",n:"Kopaka" ,t:tags("| white  | like  |")},
        {i:"8686-1",n:"Lewa"   ,t:tags("| lime   | built |")},
        {i:"8687-1",n:"Pohatu" ,t:tags("| orange | like  |")},
    ), 
    [common(tags("| makutaPhantoka |"))]: listOf(
        {i:"8691-1",n:"Antroz" ,t:tags("| red   |            |")},
        {i:"8692-1",n:"Vamprah",t:tags("| blue  | built      |")}, 
        {i:"8693-1",n:"Chirox" ,t:tags("| black | want       |")},
    ), 
    [common(tags("2-in-1"))]: listOf(
        {i:"8697-1",n:"Toa Ignika"    ,t:tags("| toaPhantoka                & large vehicle      |")},
        {i:"8952-1",n:"Mutran & Vican",t:tags("| large green makutaPhantoka & le matoranOfShadow |")},
    ),
    [common(tags("|"))]: listOf(
        {i:"8953-1",n:"Icarax",t:tags("| red titan makuta |")},
    ), 
},

///////////////////////////
// Karda Nui (the swamp) //
///////////////////////////

[common(tags("mid 2008"))]: {
    [common(tags("toaMistika"))]: listOf(
        {i:"8689-1",n:"Tahu"  ,t:tags("| dislike |")},
        {i:"8688-1",n:"Gali"  ,t:tags("| want    |")},
        {i:"8690-1",n:"Onua"  ,t:tags("| built   |")},
    ), 
    [common(tags("makutaMistika"))]: listOf(
        {i:"8694-1",n:"Krika" ,t:tags("| white  | want        |")},
        {i:"8695-1",n:"Gorast",t:tags("| green  |             |")},
        {i:"8696-1",n:"Bitil" ,t:tags("| yellow | brokenParts |")},
    ), 
    [common(tags(""))]: listOf(
        {i:"8699-1",n:"Takanuva",t:tags("| titan Takanuva | like |")},
    ), 
    [common(tags("2-in-1"))]: listOf(
        {i:"8954-1",n:"Mazeka"    ,t:tags("| matoranKarda ko       & large stationary |")},
        {i:"8698-1",n:"Vultraz"   ,t:tags("| red matoranOfShadow   & large vehicle    |")},
        {i:"8943-1",n:"Axalara T9",t:tags("| toaPhantoka Lewa      & large vehicle    |")},
        {i:"8941-1",n:"Rockoh T3" ,t:tags("| toaPhantoka Pohatu    & large vehicle    |")},
        {i:"8942-1",n:"Jetrax T6" ,t:tags("| makutaPhantoka Antroz & large vehicle    |")},
    ), 
},

////////////////
// Bara Magna //
////////////////

[common(tags("2009"))]: {
    [common(tags("| agori |"))]: listOf(
        {i:"8976-1",n:"Metus" ,t:tags("| of ice    |      |")},
        {i:"8973-1",n:"Raanu" ,t:tags("| of fire   |      |")},
        {i:"8975-1",n:"Berix" ,t:tags("| of water  |      |")},
        {i:"8974-1",n:"Tarduk",t:tags("| of jungle | like |")},
        {i:"8977-1",n:"Zesk"  ,t:tags("| of sand   | want |")},
        {i:"8972-1",n:"Atakus",t:tags("| skrall    |      |")},
    ), 
    [common(tags("male glatorian"))]: listOf(
        {i:"8982-1",n:"Strakk",t:tags("| of ice    | built   |")},
        {i:"8979-1",n:"Malum" ,t:tags("| of fire   | want    |")},
        {i:"8981-1",n:"Tarix" ,t:tags("| of water  |         |")},
        {i:"8980-1",n:"Gresh" ,t:tags("| of jungle |         |")},
        {i:"8983-1",n:"Vorox" ,t:tags("| of sand   | want    |")},
        {i:"8978-1",n:"Skrall",t:tags("| skrall    | built   |")},
    ), 
    [common(tags("skrall"))]: listOf(
        {i:"8990-1",n:"Fero & Skirmix",t:tags("| 2-in-1 | agori & large red animal |")},
        {i:"8991-1",n:"Tuma"          ,t:tags("|        | green titan              |")},
    ), 
},

[common(tags("mid 2009"))]: {
    [common(tags("glatorianLegend"))]: listOf(
        {i:"8988-1",n:"Gelu"    ,t:tags("| male   | of ice    |            |")},
        {i:"8985-1",n:"Ackar"   ,t:tags("| male   | of fire   |            |")},
        {i:"8987-1",n:"Kiina"   ,t:tags("| female | of water  | built      |")},
        {i:"8986-1",n:"Vastus"  ,t:tags("| male   | of jungle |            |")},
        {i:"8989-1",n:"Mata Nui",t:tags("| male   | of gold   | ToaMataNui |")},
        {i:"8984-1",n:"Stronius",t:tags("|        | skrall    |            |")},
    ), 
    [common(tags("|"))]: listOf(
        {i:"8998-1",n:"Toa Mata Nui",t:tags("| gold titan | ToaMataNui ")},
    ), 
    [common(tags("| 2-in-1 | large vehicle |"))]: listOf(
        {i:"8992-1",n:"Cendox V1"   ,t:tags("|        | & red agori                    |           |")},
        {i:"8993-1",n:"Kaxium V3"   ,t:tags("| 3-in-1 | & blue agori    & blue agori   |           |")},
        {i:"8994-1",n:"Baranus V7"  ,t:tags("| 3-in-1 | & medium animal & orange agori |           |")},
        {i:"8996-1",n:"Skopio XV-1" ,t:tags("|        | & iron agori                   | i like it |")},
        {i:"8995-1",n:"Thornatus V9",t:tags("|        | & red glatorian                |           |")},
    ), 
}, 

///////////////
// All stars //
///////////////

[common(tags("2010 small"))]: listOf(
    {i:"7135-1",n:"Takanuva",t:tags("| toa            | want  |")},
    {i:"7116-1",n:"Tahu"    ,t:tags("| toa            | built |")},
    {i:"7138-1",n:"Rahkshi" ,t:tags("| yellow rahkshi | want  |")},
    {i:"7137-1",n:"Piraka"  ,t:tags("| blue piraka    |       |")},
    {i:"7117-1",n:"Gresh"   ,t:tags("| glatorian      |       |")},
    {i:"7136-1",n:"Skrall"  ,t:tags("| skrall         |       |")},
), 

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

[common(tags("2015"))]: {
    [common(tags("protectorOf"))]: listOf(
        // Better names...but also a lot shorter :)
        {i:"70782-1",n:"Izotor" ,t:tags("| of ice    | have |")},
        {i:"70783-1",n:"Narmoto",t:tags("| of fire   | have |")},
        {i:"70780-1",n:"Kivoda" ,t:tags("| of water  | have |")},
        {i:"70778-1",n:"Vizuna" ,t:tags("| of jungle | have |")},
        {i:"70779-1",n:"Nilkuu" ,t:tags("| of stone  | have |")},
        {i:"70781-1",n:"Korgot" ,t:tags("| of earth  | have |")},
    ), 
    [common(tags("masterOf"))]: listOf(
        {i:"70784-1",n:"Lewa"  , t:tags("|       | of jungle | have |")},
        {i:"70785-1",n:"Pohatu", t:tags("| built |           | have |")},
        {i:"70786-1",n:"Gali"  , t:tags("| built |           | have |")},
        {i:"70787-1",n:"Tahu"  , t:tags("| built |           | have |")},
        {i:"70788-1",n:"Kopaka", t:tags("|       |           | have |")},
        {i:"70789-1",n:"Onua"  , t:tags("|       |           | have |")},
    ), 
},

[common(tags("mid 2015"))]: {
    [common(tags("skullHunter"))]: listOf(
        {i:"70791-1",n:"Skull Warrior",t:tags("| ice    | have |")},
        {i:"70792-1",n:"Skull Slicer" ,t:tags("| jungle | have |")},
        {i:"70793-1",n:"Skull Basher" ,t:tags("| earth  | have |")},
        {i:"70794-1",n:"Skull Scorpio",t:tags("| stone  | have |")},
    ), 
    [common(tags("|"))]: listOf(
        {i:"70790-1",n:"Skull Spiderlord",t:tags("| small rahi |")},
        {i:"70795-1",n:"Mask Maker vs. Skull Grinder",t:tags(`| 2-in-1 | have | \
            & large skullHunter \
            & Ekimu protectorOf \
        |`)},
    ), 
},

/////////////
// Uniters //
/////////////

[common(tags("2016"))]: {
    [common(tags("creatureOf"))]: listOf(
        {i:"71303-1",n:"Ikir" ,t:tags("| of fire   |      |")},
        {i:"71302-1",n:"Akida",t:tags("| of water  |      |")},
        {i:"71300-1",n:"Uxar" ,t:tags("| of jungle | want |")},
        {i:"71301-1",n:"Ketar",t:tags("| of stone  |      |")},
        {i:"71304-1",n:"Terak",t:tags("| of earth  |      |")},
    ), 
    [common(tags("uniterOf"))]: listOf(
        {i:"71311-1",n:"Kopaka & Melum",t:tags("| 2-in-1 | built | & creatureOf ice |")},
        {i:"71308-1",n:"Tahu"          ,t:tags("|        | like  |                  |")}, 
        {i:"71307-1",n:"Gali"          ,t:tags("|        |       |                  |")},
        {i:"71305-1",n:"Lewa"          ,t:tags("|        | have  | of jungle        |")},
        {i:"71306-1",n:"Pohatu"        ,t:tags("|        |       |                  |")},
        {i:"71309-1",n:"Onua"          ,t:tags("|        | built |                  |")},
    ), 
    [common(tags("|"))]: listOf(
        {i:"71310-1",n:"Umarak",t:tags("| black titan |")},
    ),
},

[common(tags("mid 2016"))]:{
    [common(tags("beastOf"))]: listOf(
        {i:"71314-1",n:"Storm Beast",t:tags("|        |")},
        {i:"71313-1",n:"Lava Beast" ,t:tags("| red    |")},
        {i:"71315-1",n:"Quake Beast",t:tags("| purple |")},
    ), 
    [common(tags("titan"))]: listOf(
        {i:"71312-1" ,n:"Ekimu" ,t:tags("| gold cyan | i like it |")},
        {i:"71316-1" ,n:"Umarak",t:tags("| black red |           |")},
    ),
},

///////////////////////////
//                       //
// ███████╗██╗███╗   ██╗ //
// ██╔════╝██║████╗  ██║ //
// █████╗  ██║██╔██╗ ██║ //
// ██╔══╝  ██║██║╚██╗██║ //
// ██║     ██║██║ ╚████║ //
// ╚═╝     ╚═╝╚═╝  ╚═══╝ //
//                       //
///////////////////////////
};

export const __boncleTemplateDatabase = BoncleSetTemplateTree_flatten(nestedDb);
