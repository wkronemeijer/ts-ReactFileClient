export function String_isEmpty(str: string): boolean {
    return str.length === 0;
}

export function String_isTrimmed(str: string): boolean {
    return str.trim() === str;
}

export function String_isWhitespace(str: string): boolean {
    return String_isEmpty(str.trim());
}

export function String_unPascalCase(str: string): string {
    return (
        str
        .replace(/[A-Z]/g, s => ' ' + s)
        .trim()
    );
}

const String_condense_whitespace = /\s+/g;

export function String_condense(self: string): string {
    return self.replaceAll(String_condense_whitespace, ' ').trim();
}

export function String_getCharCodes(self: string): number[] {
    const length = self.length;
    const result = new Array<number>(length);
    for (let i = 0; i < length; i++) {
        result[i] = self.charCodeAt(i);
    }
    return result;
}
