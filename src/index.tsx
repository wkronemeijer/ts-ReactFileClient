import "./Reset.scss";
import "./Base.scss";
import "./UserPages/**/*.scss";

import "./Pages.generated";

import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { panic } from "./(System)/Errors";

import { DynamicPageSwitch } from "./ReactFileClient/PageRegistry/DynamicPageSwitch";
import { ErrorBoundary } from "./ReactFileClient/Meta/ErrorBoundary";

const container = document.getElementById("Viewport") ?? panic();
const root = createRoot(container);
root.render(
    <StrictMode>
    <ErrorBoundary>
    <BrowserRouter>
        <DynamicPageSwitch/>
    </BrowserRouter>
    </ErrorBoundary>
    </StrictMode>
);
