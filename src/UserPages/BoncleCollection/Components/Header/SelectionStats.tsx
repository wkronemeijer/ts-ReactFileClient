import { memo } from "react";
import { BoncleDisplayElement } from "../../Domain/Definitions/StandardEnums";

export const BoncleSelectionStats = memo((props: {}): JSX.Element => {
    return <div className="BoncleSelectionStats">
        <div className="Title">Selection statistics</div>
        <div className="Shortcuts">
            <button>Select all</button>
            <button>Select wanted</button>
            <button>Invert selection</button>
            <button>Deselect all</button>
        </div>
        <div className="DisplayElementComparison">
            {BoncleDisplayElement.values.map(displayElement => 
            <div key={displayElement} className={displayElement}>
                {displayElement}
            </div>)}
        </div>
    </div>
});
