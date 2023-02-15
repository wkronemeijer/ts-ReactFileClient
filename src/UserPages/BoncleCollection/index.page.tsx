import "./Style.scss";

import { RegistryTag } from "../../ReactFileClient/PageRegistry/RegistryTag";
import { register } from "../../ReactFileClient/PageRegistry/Registry";

import { BoncleDatabase } from "./Domain/BoncleDatabase";
import { BoncleApp } from "./Components/App";

register(RegistryTag`Boncle Collection`, <>
    <BoncleApp/>
</>);
