import "./Style.scss";

import { register } from "../../ReactFileClient/PageRegistry/Registry";
import { RegistryTag } from "../../ReactFileClient/PageRegistry/RegistryTag";
import { BoncleApp } from "./Components/BoncleApp";
import { BoncleDatabase } from "./Domain/RawBoncleData";

register(RegistryTag`Boncle Collection`, <>
    <p>Hello, world!</p>
    <BoncleApp boncles={BoncleDatabase}/>
</>);
