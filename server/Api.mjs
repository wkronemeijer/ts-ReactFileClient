import { Router } from "express";
import { API_DELAY } from "./Config.mjs";
import { getPageMap } from "./FindFiles.mjs";

export const ApiRouter = Router();

if (API_DELAY > 0) {
    ApiRouter.use((req, res, next) => { 
        setTimeout(next, API_DELAY);
    });
}

ApiRouter.get("/GetPageMap", (req, res) => {
    // Call again each time, because the server is restarted less often than the client is compiled
    res.json(getPageMap());
});
