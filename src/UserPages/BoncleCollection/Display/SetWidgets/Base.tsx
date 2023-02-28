import { memo, ReactNode } from "react";
import { joinClasses } from "../../../../ReactFileClient/ClassHelper";

export const BoncleSetWidget = memo(function setWidget(props: {
    readonly for: string;
    readonly value: string;
    readonly extraClass?: string;
    readonly children: ReactNode;
}): JSX.Element {
    const { for: subclass, value, extraClass, children } = props;
    return <div 
        className={joinClasses(
            "BoncleSetWidget", 
            subclass, 
            value, 
            extraClass,
        )}
        title={value}
    >
        {children}
    </div>
});
