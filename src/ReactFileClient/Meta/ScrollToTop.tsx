// Taken straight from the source, https://reactrouter.com/web/guides/scroll-restoration

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function gotoWindowTop(behavior: ScrollToOptions["behavior"]) {
    window.scrollTo({ behavior, left: 0, top: 0 });
}

export function ScrollToTop(): JSX.Element | null {
    const { pathname } = useLocation();
    
    useEffect(() => {
        gotoWindowTop("auto");
    }, [pathname]);
    
    return null;
}
