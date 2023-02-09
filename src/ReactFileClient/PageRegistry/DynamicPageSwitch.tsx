// Bits and bobs

import { Route, Routes } from "react-router-dom";
import { useRegistryPages } from "./Registry";
import { LoadingFallback } from "./Routes/LoadingFallback";
import { RegistryIndex } from "./Routes/RegistryIndex";

export function DynamicPageSwitch(): JSX.Element {
    const pages = useRegistryPages();
    // TODO: Open question: does RegistryIndex have the <Route/>, or does the page switch?
    return <Routes>
        <Route path="/" element={<RegistryIndex/>}/>
        {pages.map(page => page.toRoute())}
        <Route path="*" element={<LoadingFallback/>}/>
    </Routes>;
}
