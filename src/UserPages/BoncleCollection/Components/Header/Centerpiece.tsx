import { memo, useCallback } from "react";

export const BoncleCenterpiece = memo((): JSX.Element => {
    const onClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    
    return <div className="BoncleCenterpiece">
        <button onClick={onClick}>
            <img 
                className="BigLogo"
                src="./Icons/Logo.png"
                alt="The BIONICLE logo"
            />
        </button>
    </div>
});
