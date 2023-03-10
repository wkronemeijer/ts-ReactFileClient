/*
Tried looking into useReducer
Problem I encountered was that anything that uses the context will be invalided when a single part of it changes.
It would mean every image would be invalidated if the search entry changed
Now there are solutions
react-redux would be one, but it felt too much of a shotgun to my problem
the other is memoWithContext, but the type of that is just to unwieldy

So we just prop drill through the list. Too bad

why not expand the list? 
list inserts the headers
buuuuut you can put more restrictions on child content, like it being an iterable and all

*/

import { createContext, useContext, Dispatch, Reducer } from "react";

import { PersistentSet } from "../../../../(System)/Collections/Persistent/PersistentSet";
import { neverPanic } from "../../../../(System)/Errors";
import { requires } from "../../../../(System)/Assert";

import { ExpandActionType } from "../../../../ReactFileClient/ExpandActionType";

import { BoncleSetSelection } from "../../Domain/SetSelection";
import { BoncleSetFilter } from "../../Domain/SetFilter";
import { BoncleDatabase } from "../../Domain/Database";
import { BoncleSet } from "../../Domain/Set";


// Yes a namespace, I know
// useBoncleSetSelectionState felt just 🤢
interface BoncleAppState {
    readonly search   : string;
    readonly setFilter: BoncleSetFilter;
    readonly selection: BoncleSetSelection;
}

type BoncleAppAction = ExpandActionType<{
    "search.set": { 
        readonly value: string; 
    };
    
    "selection.selectAll": {};
    "selection.clear": {};
    "selection.add": {
        readonly set: BoncleSet;
    };
    "selection.remove": {
        readonly set: BoncleSet;
    };
    "selection.toggle": {
        readonly set: BoncleSet;
    }
}>;

const boncles = BoncleDatabase.sets;

const BoncleAppReducer: Reducer<BoncleAppState, BoncleAppAction> = (state, action): BoncleAppState => {
    const {search, setFilter, selection} = state;
    const { kind } = action;
    switch (kind) {
        ////////////
        // Search //
        ////////////
        
        case "search.set": {
            return { ...state, search: action.value };
        }
        
        ///////////////
        // Selection //
        ///////////////
        
        case "selection.selectAll": {
            const newSelection = PersistentSet.from(boncles.filter(setFilter.test));
            return { ...state, selection: newSelection };
        }
        
        case "selection.clear": {
            return { ...state, selection: PersistentSet.default };
        }
        
        case "selection.add": {
            return { ...state, selection: selection.add(action.set) };
        }
        
        case "selection.remove": {
            return { ...state, selection: selection.delete(action.set) };
        }
        
        case "selection.toggle":
            const newSelection = selection.has(action.set) ? 
                selection.delete(action.set) :
                selection.add(action.set)
            ;
            return { ...state, selection: newSelection };
        
        /////////////////
        // Guard rails //
        /////////////////
        
        default: 
            neverPanic(kind);
    }
};

interface BoncleAppContext 
extends BoncleAppState {
    readonly dispatch : Dispatch<BoncleAppAction>;
}

const selectionContext = createContext<BoncleAppContext | undefined>(undefined);

function useBoncleAppContext(): BoncleAppContext {
    const info = useContext(selectionContext);
    requires(info, 
        `Missing provider.`);
    return info;
}
const BoncleSetSelectionContext = selectionContext.Provider;

