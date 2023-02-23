import "./Style.scss";

import { RegistryTag } from "../../ReactFileClient/PageRegistry/RegistryTag";
import { register } from "../../ReactFileClient/PageRegistry/Registry";

import { BoncleApp } from "./Display/App";

register(RegistryTag`Boncle Collection`, <>
    <BoncleApp/>
</>);
