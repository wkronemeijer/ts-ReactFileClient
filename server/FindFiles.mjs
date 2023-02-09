import { devTerminal, File, Directory, ensures, terminal } from "@local/system";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { VERBOSE_FIND_FILES } from "./Config.mjs";

// I love ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

export const ProjectRoot = new Directory(__dirname).parent;
export const PublicRoot  = ProjectRoot.join("dist");
export const SourceRoot  = ProjectRoot.join("src");

const searchDir     = SourceRoot;
const pageExtension = ".page.tsx";
const newExtension  = ".rfc" // (R)eact(F)ile(C)lient 
// Alternatives include .asp, .myFirstWebsite, 
// TODO: Come up with a cool (not stupid) suffix

const searchPrefixes = ["RegistryTag"];

const searchPattern = `(${searchPrefixes.join('|')})\`(.+?)\``;
devTerminal.meta(`Searching with /${searchPattern}/.`);
const targetGroup   = 2;
const searchRegex   = new RegExp(searchPattern);

/** 
 * @param   {File}   pageFile
 * @returns {string} ReactRouter-ready string. */
function formatPage(pageFile) {
    const middle = 
        SourceRoot
        .to(pageFile)
        .toString()
        .replace(/\\/g, '/') // Windows...
        .replace(pageExtension, newExtension)
    ;
    return '/' + middle;
}

export function getPageMap() {
    const pageFiles = 
        Array.from(searchDir.recursiveGetAllFiles())
        .filter(file => file.fullName.includes(pageExtension))
    ;
    
    /** @type {Record<string, File>} */
    const pathByTag = {}; // we will json it in a bit
    
    for (const file of pageFiles) {
        const fileContents = file.readText();
        const match = searchRegex.exec(fileContents);
        if (match) {
            const tag = match[targetGroup]; // 1st capturing group
            const path = formatPage(file);
            pathByTag[tag] = path;
        }
    }
    
    const tags      = Object.keys(pathByTag);
    const maxLength = Math.max(...tags.map(tag => tag.length)) + 2; // including ''
    
    devTerminal.trace(`getPageMap: ${tags.length} page(s) were found.`);
    for (let tag in pathByTag) {
        const key   = `'${tag}'`.padEnd(maxLength);
        const value = pathByTag[tag];
        
        if (VERBOSE_FIND_FILES) {
            devTerminal.trace(`    ${key} --> ${value}`);
        }
    }
    
    return pathByTag;
}
