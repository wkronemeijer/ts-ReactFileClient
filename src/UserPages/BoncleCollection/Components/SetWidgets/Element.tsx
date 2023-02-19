import { memo, ReactNode } from "react";
import { BoncleElement } from "../../Domain/Definitions/StandardEnums";
import { BoncleSetWidget } from "./Base";

export const BoncleSetWidget_Element = memo((props: {
    readonly element: BoncleElement;
}): JSX.Element => {
    const { element } = props;
    
    const iconUrl   = `./Icons/Elements/${element}.png`;
    const iconAlt   = `A picture of the element ${element}.`;
    const iconTitle = element;
    
    return <BoncleSetWidget for="Element" value={element}>
        <img
            className="Media"
            src={iconUrl}
            alt={iconAlt}
            title={iconTitle}
        />
    </BoncleSetWidget>;
});
