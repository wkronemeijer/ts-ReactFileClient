import Express, { static as expressStatic } from "express";
import { ApiRouter } from "./Api.mjs";

import { PublicRoot, SourceRoot } from "./FindFiles.mjs";
import { PORT } from "./Config.mjs";
import { devTerminal, StringBuilder } from "@local/system";

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

function toSexagesimal(n) {
    return n.toString().padStart(2, '0');
}

app.use((req, _res, next) => {
    if (!req.path.endsWith(".jpg")) {
        const msg  = new StringBuilder;
        const time = new Date();
        
        msg.append("[");
        msg.append(toSexagesimal(time.getHours()));
        msg.append(":");
        msg.append(toSexagesimal(time.getMinutes()));
        msg.append(":");
        msg.append(toSexagesimal(time.getSeconds()));
        msg.append("] ");
        msg.append(req.method);
        msg.append(" ");
        msg.append(req.path);
        
        devTerminal.trace(msg.toString());
    }
    next();
});

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
