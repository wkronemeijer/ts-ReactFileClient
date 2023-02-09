import "./Style.scss";

import React = require("react");


const allIconNames = [
    "home",
    "calculate",
    "info",
    "language",
    "settings",
    "square_foot",
    "compare_arrows",
] as const;
export type IconName = (typeof allIconNames)[number];

interface MyProps {
    name: IconName;
}

export const Icon: React.FunctionComponent<MyProps> = props => 
    <i className="material-icons">{props.name}</i>
;
