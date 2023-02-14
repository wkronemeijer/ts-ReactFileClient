import { BoncleSet } from "../Domain/Set";
import { BonclePreview } from "./BonclePreview";


export function BoncleApp(props: {
    readonly boncles: readonly BoncleSet[];
}): JSX.Element {
    return <div className="BoncleApp">
        {props.boncles.map(set => 
        <BonclePreview key={set.setNumber} setNumber={set.setNumber}/>)}
    </div>;
}
