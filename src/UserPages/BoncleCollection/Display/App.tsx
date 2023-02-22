import { Reducer, useMemo, useReducer, useState } from "react";

import { PersistentSet } from "../../../(System)/Collections/Persistent/PersistentSet";

import { useDebounce } from "../../../ReactFileClient/Hooks/useDebounce";
import { useStable } from "../../../ReactFileClient/Hooks/useStable";

import { BoncleSetSelection, BoncleSetSelection_Empty } from "../Domain/SetSelection";
import { BoncleSelectionStats } from "./Header/SelectionStats";
import { BoncleCenterpiece } from "./Header/Centerpiece";
import { BoncleTagSearch } from "./Header/TagSearch";
import { BoncleSetFilter } from "../Domain/SetFilter";
import { BoncleAppFooter } from "./AppFooter";
import { BoncleDatabase } from "../Domain/Database";
import { BoncleSetList } from "./SetList";
import { neverPanic } from "../../../(System)/Errors";
import { BoncleSetListItem } from "./SetListItem";

export function BoncleApp(_props: {}): JSX.Element {
    const [selection, setSelection] = useState(BoncleSetSelection_Empty);
    const [search   , setSearch   ] = useState("");
    
    const currentSearch = useDebounce(search);
    
    
    const filter = useMemo(() => 
        BoncleSetFilter.fromString(currentSearch)
    , [currentSearch]);
    
    const visible = useMemo(() => 
        BoncleDatabase.sets.filter(set => 
            filter.test(set) || 
            selection.has(set) 
        )
    , [filter, selection]);
    // ^ Downside: this is every state update
    // Upside: anything you select is never hidden.
    // (also unselecting hidden things is bound to be annoying)
    
    return <div className="BoncleApp">
        <div className="Header">
            <BoncleTagSearch
                value={search}
                onChange={setSearch}
            />
            <BoncleCenterpiece />
            <BoncleSelectionStats
                visible={visible}
                selection={selection}
                setSelection={setSelection}
            />
        </div>
        <BoncleSetList 
            visible={visible}
            selection={selection}
            setSelection={setSelection}
            insertHeaders={filter.isEmpty}
        />
        <div className="Absorb"/>
        <BoncleAppFooter/>
    </div>
}
