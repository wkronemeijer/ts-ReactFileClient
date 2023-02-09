
/** 
 * Joins strings for the `class` attribute. 
 * 
 * Example usage:
 * 
 *      <div className={joinClasses("MyComponent", 
 *          "DarkMode",
 *          isLarge && "isLarge",
 *      )}>...</div>
 * 
 */
export function joinClasses(
    ...args: (string | false | null | undefined)[]
): string {
    return (
        args
        .filter(x => x) // Reminder: Boolean("") == false
        .join(' ')
    );
}
