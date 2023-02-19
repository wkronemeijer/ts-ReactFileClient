import { memo, useMemo } from "react";

import { from } from "../../../(System)/Collections/Linq";
import { fst } from "../../../(System)/Function";

import { joinClasses } from "../../../ReactFileClient/ClassHelper";

import { BoncleSetWidget_Possession } from "./SetWidgets/Possession";
import { BoncleSetWidget_Element } from "./SetWidgets/Element";
import { BoncleSetWidget_Opinion } from "./SetWidgets/Opinion";
import { BoncleTag } from "../Domain/Definitions/Tag";
import { BoncleSet } from "../Domain/Set";

export const BoncleSetListItem = memo((props: {
    readonly set: BoncleSet;
}): JSX.Element => {
    const { set } = props;
    const { title, tags, displayElement, setNumber, theme } = set;
    
    const imageUrl   = `./ImageCache/${setNumber}.jpg`;
    const imageAlt   = `A picture of LEGO set number ${setNumber}.`;
    const imageTitle = useMemo(() =>
        from(tags)
        .where(BoncleTag.isPublic)
        .toString()
    , [tags]);
    
    const bricksetUrl = `https://brickset.com/sets/${setNumber}`;
    
    return <div 
        className={joinClasses("BoncleSetListItem", displayElement, theme)}
        style={{ backgroundImage: `url(${imageUrl})` }}
    >
        <div className="Content">
            <div className="Header Flank">
                <span className="Title">{title}</span>
                <span className="SetNumber">
                    <a 
                        href={bricksetUrl}
                        target="_blank"
                    >{setNumber}</a>
                </span>
            </div>
            {/* <BoncleSetPreview setNumber={setNumber} /> */}
            <div className="Preview">
                <img
                    className="Media"
                    src={imageUrl} 
                    alt={imageAlt}
                    title={imageTitle}
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
