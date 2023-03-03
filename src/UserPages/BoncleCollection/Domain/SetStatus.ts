import { StringEnum_create, StringEnum_Member } from "../../../(System)/Data/StringEnum";



export type  BoncleSetStatus = StringEnum_Member<typeof BoncleSetStatus>;
export const BoncleSetStatus = StringEnum_create([
    // Only really have space for 3-5 options
    // (if we go for a segmented control)
    "dontHave",
    "mayHave",
    "have",
    "partiallyBuilt",
    "built",
    // Maybe we have multiple axes here
] as const);


/*
Soapbox time!

opinion: dislike / neutral / like / love
parts: none / some / all
building: in pieces / partial / completely built
desire: dont want / neutral / want

now hers the thing:
want -> like ??? you may eventually want things you don't like
built -> -want
built -> all-parts
partial-built -> 

which feels like there is another thing lurking underneath...

dontHave
have parts
have all parts
under construction
built




*/
