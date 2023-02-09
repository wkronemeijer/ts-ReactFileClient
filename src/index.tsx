import "./Reset.scss";
import "./Base.scss";

import "./Pages.generated";

import ReactDOM = require("react-dom/client");

import { BrowserRouter } from "react-router-dom";
import { panic } from "./(System)/Errors";
import { ErrorBoundary } from "./ReactFileClient/Meta/ErrorBoundary";
import { DynamicPageSwitch } from "./ReactFileClient/PageRegistry/DynamicPageSwitch";

console.log("Initializing...");
{
    const container = document.getElementById("Viewport") ?? panic();
    const root = ReactDOM.createRoot(container);
    root.render(<ErrorBoundary>
        <BrowserRouter>
            <DynamicPageSwitch/>
        </BrowserRouter>
    </ErrorBoundary>);
}
console.log("Initialization complete.");
