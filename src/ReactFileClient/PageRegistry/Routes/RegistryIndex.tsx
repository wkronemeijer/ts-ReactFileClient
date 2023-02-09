import { SetTitle } from "../../Meta/SetTitle";
import { useRegistryPages } from "../Registry";

export function RegistryIndex(): JSX.Element {
    const pages = useRegistryPages();
    return <main>
        <SetTitle title="Index"/>
        <h1>Index of ReactFileClient</h1>
        {pages.length === 0 &&         
        <p>(Loading pages...)</p>}
        <ul>{pages.map(page => 
            <li key={page.tag}>{page.toLink()}</li>)}
        </ul>
    </main>
}
