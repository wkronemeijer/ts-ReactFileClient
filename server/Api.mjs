import { Router } from "express";

import { getPageMap } from "./FindFiles.mjs";
import { API_DELAY } from "./Config.mjs";

export const ApiRouter = Router();

if (API_DELAY > 5) {
    ApiRouter.use((req, res, next) => { 
        setTimeout(next, API_DELAY);
    });
}

ApiRouter.get("/GetPageMap", (req, res) => {
    // Call again each time, because the server is restarted less often than the client is compiled
    res.json(getPageMap());
});
