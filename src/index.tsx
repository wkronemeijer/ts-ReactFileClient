import "./Reset.scss";
import "./Base.scss";

import "./Pages.generated";

import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import ReactDOM = require("react-dom/client");

import { panic } from "./(System)/Errors";

import { DynamicPageSwitch } from "./ReactFileClient/PageRegistry/DynamicPageSwitch";
import { ErrorBoundary } from "./ReactFileClient/Meta/ErrorBoundary";

const container = document.getElementById("Viewport") ?? panic();
const root = ReactDOM.createRoot(container);
root.render(
    <StrictMode>
    <ErrorBoundary>
    <BrowserRouter>
            <DynamicPageSwitch/>
    </BrowserRouter>
    </ErrorBoundary>
    </StrictMode>
);
