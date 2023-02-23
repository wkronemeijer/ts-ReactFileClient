import { memo, ReactNode } from "react";
import { joinClasses } from "../../../../ReactFileClient/ClassHelper";

export const BoncleSetWidget = memo((props: {
    readonly for: string;
    readonly value: string;
    readonly extraClass?: string;
    readonly children: ReactNode;
}): JSX.Element => {
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
