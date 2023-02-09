import { createContext, ReactNode, useContext } from "react";
import { Link, Route } from "react-router-dom";
import { ensures } from "../../(System)/Assert";
import { RegistryTag } from "./RegistryTag";
import { SetTitle } from "../Meta/SetTitle";
import { joinClasses } from "../ClassHelper";



const PageContext = createContext<Page | undefined>(undefined);

export function useCurrentPage(): Page {
    const current = useContext(PageContext);
    ensures(current, `Must be used within a page context.`);
    return current;
}

interface Page_Options {
    readonly tag  : RegistryTag;
    readonly title: string;
    readonly route: string;
    readonly body : ReactNode;
}

/** 
 * A page, creating a three-way binding between a route, a tag, and a body. 
 * Tags missing routers are reported when the page map is retrieved.
 */
export class Page {
    readonly tag  : RegistryTag;
    readonly title: string;
    readonly route: string;
    readonly body : ReactNode;
    
    readonly className: string;
    
    constructor(options: Page_Options) { 
        // Object.assign(this, options);
        // Would be nice, but can't track definite assignment :/
        
        this.tag   = options.tag;
        this.title = options.title;
        this.route = options.route;
        this.body  = options.body;
        
        this.className = this.tag.replaceAll(' ', '-');
        
        // Starting to feel like Java, everything is mentioned 4 times
    }
    
    toString() {
        return `Page\`${this.tag}\``;
    }
    
    toRoute(): ReactNode {
        return <Route key={this.tag} path={this.route} element={
            <PageContext.Provider value={this}>
                <SetTitle title={this.title}/>
                <main 
                    className={joinClasses("RfcPage", this.className)}
                    data-page-tag={this.tag}
                >
                    {this.body}
                </main>
            </PageContext.Provider>
        }/>;
    }
    
    toLink(): ReactNode {
        return <Link key={this.tag} to={this.route}>{this.title}</Link>
    }
}
