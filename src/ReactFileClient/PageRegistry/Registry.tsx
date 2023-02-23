import { Dictionary_hasInstance } from "../../(System)/Collections/Dictionary";
import { ReactNode, useEffect, useState } from "react";
import { RegistryTag } from "./RegistryTag";
import { requires } from "../../(System)/Assert";
import { runTask } from "../../(System)/Threading/Task";
import { compare } from "../../(System)/Traits/Comparable/Compare";
import { panic } from "../../(System)/Errors";
import { Page } from "./Page";

type UserContent = 
    | ReactNode
    | (() => JSX.Element)
;

function UserContent_bake(Content: UserContent): ReactNode {
    return (typeof Content === "function") ? <Content /> : Content;
}

const infoByTag = new Map<RegistryTag, {
    readonly title: string;
    readonly body : ReactNode;
}>;

export function register(tagAndTitle: RegistryTag, content: UserContent): void;
export function register(tagAndTitle: [tag: RegistryTag, title: string], content: UserContent): void;
export function register(tagAndOrTitle: RegistryTag | [RegistryTag, string], Content: UserContent): void {
    let tag  : RegistryTag;
    let title: string;
    
    if (tagAndOrTitle instanceof Array) {
        tag   = tagAndOrTitle[0];
        title = tagAndOrTitle[1];
    } else {
        tag   = tagAndOrTitle;
        title = tagAndOrTitle;
    }
    
    const body = UserContent_bake(Content)
    infoByTag.set(tag, { title, body });
}

// Cheeky method to make it so that all pages are registered before all the tags are sorted.
// Probably need something more sound...but it works for now.
let triggerLoad!: (() => void); 

const registry_future = 
    new Promise<void>(resolve => void (triggerLoad = resolve))
    .then(() => fetch("/api/GetPageMap"))
    .then(response => response.json())
    .then((object: unknown) => {
        requires(Dictionary_hasInstance(object), `Response was not an object.`);
        
        const routeByTag = new Map<RegistryTag, string>;
        for (let key in object) {
            const value: unknown = object[key];
            requires(typeof key   === "string");
            requires(typeof value === "string");
            
            routeByTag.set(key as RegistryTag, value);
        }
        
        const registeredTags = new Set(infoByTag.keys());
        const routedTags     = new Set(routeByTag.keys());
        const combinedTags   = new Set([...registeredTags, ...routedTags]);
        
        const pages = new Array<Page>();
        for (const tag of combinedTags) {
            if (!registeredTags.has(tag)) {
                console.log(`Tag '${tag}' has a body but no route.`);
            } else if (!routedTags.has(tag)) {
                console.log(`Tag '${tag}' has a route but no body.`);
            } else {
                const { title, body } = infoByTag.get(tag)  ?? panic();
                const route           = routeByTag.get(tag) ?? panic();
                pages.push(new Page({ tag, title, route, body }));
            }
        }
        pages.sort((a, b) => compare(a.title, b.title));
        return pages;
    })
;

export function useRegistryPages(): readonly Page[] {
    triggerLoad(); // Additional resolve()s are ignored.
    const [pages, setPages] = useState<readonly Page[]>([]);
    useEffect(() => {
        let cancelled = false;
        runTask(async () => {
            const registry = await registry_future;
            if (!cancelled) {
                setPages(registry);
            }
        });
        return () => void (cancelled = true);
    }, [setPages]);
    return pages;
}
