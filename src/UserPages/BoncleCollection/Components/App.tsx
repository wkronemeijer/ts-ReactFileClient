import { useState } from "react";
import { from } from "../../../(System)/Collections/Linq";
import { PersistentSet } from "../../../(System)/Collections/Persistent/PersistentSet";
import { BoncleDatabase } from "../Domain/BoncleDatabase";
import { BoncleSetNumber } from "../Domain/SetNumber";
import { BoncleSetList } from "./SetList";


const boncles = from(BoncleDatabase.values()).toArray();


type  FavoriteSet = PersistentSet<BoncleSetNumber>;
const FavoriteSet = PersistentSet<BoncleSetNumber>;

export function BoncleApp(props: {}): JSX.Element {
    const [favorites, setFavorites] = useState<FavoriteSet>(FavoriteSet.default);
    const [search   , setSearch   ] = useState<string>("");
    
    return <div className="BoncleApp">
        <BoncleSetList boncles={boncles}/>
    </div>;
}
