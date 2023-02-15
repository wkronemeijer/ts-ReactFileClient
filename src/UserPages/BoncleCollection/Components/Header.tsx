import { ReactNode } from "react";


export function BoncleHeader(props: {
    
    
    readonly children: ReactNode
}): JSX.Element {
    const { children } = props;
    return <div className="BoncleHeader">
        {children}
    </div>
}
