import { identity } from "../(System)/Function";
import { Falsy } from "../(System)/Types/Truthy";

/** 
 * Joins strings for the `class` attribute. 
 * 
 * @example 
 * <div className={joinClasses("MyComponent", 
 *     "DarkMode",
 *     isLarge && "isLarge",
 * )}>...</div>
 */
export function joinClasses(
    ...args: (string | Falsy)[]
): string {
    return (
        args
        .filter(identity) // Reminder: Boolean("") == false
        .join(' ')
    );
}
