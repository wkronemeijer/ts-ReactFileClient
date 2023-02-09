

export function __expose(namedValue: { name: string }): void {
    Object.defineProperty(window, namedValue.name, { value: namedValue });
}
