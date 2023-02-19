import { useMemo, useState } from "react";

import { PersistentSet } from "../../../(System)/Collections/Persistent/PersistentSet";
import { from } from "../../../(System)/Collections/Linq";

import { useDebounce } from "../../../ReactFileClient/Hooks/useDebounce";

import { BoncleSelectionStats } from "./Header/SelectionStats";
import { BoncleCenterpiece } from "./Header/Centerpiece";
import { BoncleTagSearch } from "./Header/TagSearch";
import { BoncleSetNumber } from "../Domain/SetNumber";
import { BoncleSetFilter } from "../Domain/SetFilter";
import { BoncleAppFooter } from "./AppFooter";
import { BoncleDatabase } from "../Domain/BoncleDatabase";
import { BoncleSetList } from "./SetList";

const boncles = from(BoncleDatabase.values()).toArray();

type  FavoriteSet = PersistentSet<BoncleSetNumber>;
const FavoriteSet = PersistentSet<BoncleSetNumber>;

export function BoncleApp(_props: {}): JSX.Element {
    const [showHeaders, setShowHeaders] = useState(false);
    const [favorites  , setFavorites  ] = useState<FavoriteSet>(FavoriteSet.default);
    const [search     , setSearch     ] = useState<string>("");
    const currentSearch = useDebounce(search);
    
    const setFilter = useMemo(() => 
        BoncleSetFilter.fromString(currentSearch)
    , [currentSearch]);
    
    return <div className="BoncleApp">
        <div className="Header">
            <BoncleTagSearch 
                value={search} 
                onChange={setSearch}
            />
            <BoncleCenterpiece/>
            <BoncleSelectionStats/>
        </div>
        <BoncleSetList 
            boncles={setFilter.filter(boncles)} 
            showHeaders={setFilter.isEmpty}
        />
        <div className="Absorb"/>
        <BoncleAppFooter/>
    </div>
}
