import { createStringEnum } from "./Collections/Object";
import { requires } from "./Assert";


type Method = keyof typeof Method;
const Method = createStringEnum([
    "GET",
    "POST",
] as const);

type ContentType = keyof typeof ContentType;
const ContentType = createStringEnum([
    "text/plain",
    "application/json",
] as const);

interface RequestOptions {
    /** The MIME type of the expected reponse. */
    contentType: ContentType;
}

// Just re-use the type from lib.d.ts
type XhrBody = Parameters<XMLHttpRequest["send"]>[0];

/** Sends an XHR to the given URL */
export function sendXhrRequest(
    /** The HTTP method to use. */
    method: Method, 
    /** The URL to send the request to. */
    url: string, 
    /** The body of the request, if any. */
    body?: XhrBody, 
    /** Optional options of the request. */
    options?: Partial<RequestOptions>,
): Promise<XMLHttpRequest> {
    requires(method in Method, `Unknown HTTP method "${method}`);
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.addEventListener('load' , event => resolve(xhr) );
        xhr.addEventListener('error', event => reject(event));
        
        xhr.open(method, url);
        
        const type = options?.contentType;
        if (type) {
            requires(type in ContentType, `Unknown content type "${type}".`);
            xhr.setRequestHeader("Content-Type", type);
        }
        
        xhr.send(body);
    });
}

/** Sends a request to the given url, encoding the payload (if present) and decoding the reponse as JSON. */
export async function sendJsonRequest<T = unknown>(method: Method, url: string, payload?: unknown): Promise<T> {
    const body = (payload !== undefined) ? JSON.stringify(payload) : undefined;
    const xhr = await sendXhrRequest(method, url, body, { contentType: "application/json" });
    return JSON.parse(xhr.responseText);
}

