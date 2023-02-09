import Express, { static as expressStatic } from "express";
import { ApiRouter } from "./Api.mjs";

import { PublicRoot, SourceRoot } from "./FindFiles.mjs";
import { PORT } from "./Config.mjs";

// A server was born
const app = Express();

/////////////
// Pathing //
/////////////

const faviconPath = PublicRoot.join("favicon.png").toString();
const   indexPath = PublicRoot.join("index.html").toString();

////////////////////////
// Configuring routes //
////////////////////////

// Static
app.use("/", expressStatic(PublicRoot.toString()));
app.use("/", expressStatic(SourceRoot.toString()));

// Exception for favicon, browser still try to load this one.
app.get("/favicon.ico", (_, res) => res.sendFile(faviconPath));

// Escape hatch
app.use("/api", ApiRouter);

// SPA: Everything else goes to the index
app.get("*", (_, res) => res.sendFile(indexPath));

/////////////////////////
// Starting the server //
/////////////////////////

app.listen(PORT);
console.log(`>>> Connect to http://localhost:${PORT}/ <<<`)
