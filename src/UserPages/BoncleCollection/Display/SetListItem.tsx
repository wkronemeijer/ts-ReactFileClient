import { memo, useCallback } from "react";

import { joinClasses } from "../../../ReactFileClient/ClassHelper";

import { BoncleSetWidget_Possession } from "./SetWidgets/Possession";
import { BoncleSetSelection_Change } from "../Domain/SetSelection";
import { BoncleSetWidget_Element } from "./SetWidgets/Element";
import { BoncleSetWidget_Opinion } from "./SetWidgets/Opinion";
import { BoncleSet } from "../Domain/Set";

export const BoncleSetListItem = memo(function boncleSetListItem(props: {
    readonly set: BoncleSet;
    readonly isSelected: boolean;
    readonly setSelection: BoncleSetSelection_Change;
}): JSX.Element {
    const { set, isSelected, setSelection } = props;
    const { title } = set;
    
    const Preview_onClick = useCallback(() => 
        setSelection(selection => selection.toggle(set))
    , [set, setSelection]);
    
    return <div 
        className={joinClasses(
            "BoncleSetListItem", 
            set.displayElement, 
            set.generation,
            isSelected && "Selected",
        )}
        style={{ backgroundImage: `url(${set.previewUrl})` }}
    >
        <div className="Content">
            <div className="Header Flank">
                <span className="Title">{title}</span>
                <span className="SetNumber">
                    <a 
                        href={set.bricksetUrl}
                        target="_blank"
                    >{set.setNumber}</a>
                </span>
            </div>
            <div className="Preview" onClick={Preview_onClick}>
                <img
                    className="Media"
                    src={set.previewUrl} 
                    alt={set.previewAlt}
                    title={set.previewTitle}
                    draggable={false}
                />
            </div>
            <div className="Footer Flank Widgets">
                <BoncleSetWidget_Opinion    opinion   ={set.opinion    }/>
                <BoncleSetWidget_Element    element   ={set.trueElement}/>
                <BoncleSetWidget_Possession possession={set.possession }/>
            </div>
        </div>
    </div>
});
