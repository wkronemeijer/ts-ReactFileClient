import "./Style.scss";

import { RegistryTag } from "../../ReactFileClient/PageRegistry/RegistryTag";
import { register } from "../../ReactFileClient/PageRegistry/Registry";

import { BoncleDatabase } from "./Domain/Database";
import { BoncleApp } from "./Display/App";

register(RegistryTag`Boncle Collection`, <>
    <BoncleApp/>
</>);
