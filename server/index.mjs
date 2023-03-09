import Express, { static as expressStatic } from "express";

import { PublicRoot, SourceRoot } from "./FindFiles.mjs";
import { ApiRouter } from "./Api.mjs";
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

const re = /(\.png|\.jpe?g)/;

function shouldLogRequest(path) {
    return !re.test(path);
}

function toSexagesimal(n) {
    return n.toString().padStart(2, '0');
}

app.use((req, _res, next) => {
    if (shouldLogRequest(req.path)) {
        const msg  = [];
        const time = new Date();
        
        msg.push("[");
        msg.push(toSexagesimal(time.getHours()));
        msg.push(":");
        msg.push(toSexagesimal(time.getMinutes()));
        msg.push(":");
        msg.push(toSexagesimal(time.getSeconds()));
        msg.push("] ");
        msg.push(req.method);
        msg.push(" ");
        msg.push(req.path);
        
        console.log(msg.join(""));
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
