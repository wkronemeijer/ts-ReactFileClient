import { ensures } from "../Assert";

const indentSize = 4;
const newline    = '\n';

export interface StringBuildable {
    // method name is hard
    // it is analogous to Serialize(Serializer)
    buildString(result: StringBuilder): void;
}

// TODO: IDEA: replaceAll('\n', indentation)

/** Accumulates many strings efficiently to form one long string. */
export class StringBuilder {
    static stringify(buildable: StringBuildable): string {
        const result = new this();
        buildable.buildString(result);
        return result.toString();
    }
    
    private parts: string[] = [];
    private currentLevel = 0;
    private primedForIndent = true;
    
    private getIndentation(): string {
        return ' '.repeat(this.currentLevel * indentSize);
    }
    
    private scanForNewlines(s: string) {
        if (s.includes('\n')) {
            this.primedForIndent = true;
        }
    }
    
    /** Increases indentation by 1. */
    indent(): void {
        this.currentLevel++;
    }
    
    /** Decreases indentation by 1. */
    dedent(): void {
        this.currentLevel--;
        ensures(this.currentLevel >= 0, "Too many dedents.");
    }
    
    /** Resets to indentation to 0. */
    resetIndentation(): void {
        this.currentLevel = 0;
    }
    
    /** Appends the string to the buffer. */
    append(string: string): void {
        const isIndented = this.currentLevel > 0;
        if (isIndented && this.primedForIndent) { 
            this.parts.push(this.getIndentation());
            this.primedForIndent = false;
        }
        this.parts.push(string);
        if (isIndented) {
            this.scanForNewlines(string);
        }
    }
    
    /** Appends optionally a string, and a line terminator to the buffer. */
    appendLine(string?: string): void {
        if (string !== undefined) {
            this.append(string);
        }
        this.append(newline);
    }
    
    /** Converts the buffer into one string. */
    toString(): string {
        return this.parts.join("");
    }
}
