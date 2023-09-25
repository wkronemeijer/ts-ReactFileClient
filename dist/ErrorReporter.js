"use strict";

window.addEventListener("error", event => {
    const { error } = event;
    const div = document.createElement("div");
    
    div.style.fontFamily = "monospace";
    div.style.fontWeight = "bold";
    div.style.color = "white";
    div.style.backgroundColor = "red";
    
    div.style.whiteSpace = "pre";
    div.append(error instanceof Error ? error.stack : String(error));
    
    document.body.append(div);
});
