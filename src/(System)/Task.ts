import { assert } from "./Assert";


/** A `Promise` with delayed execution. */
export type Task<T = any> = () => Promise<T>;

export namespace Task {
    /** Immediately runs a task. Used to avoid ugly IIFEs. */
    export function run(task: Task): void {
        task();
    }
    
    /** Queues a task to be run. JavaScript decides when! */
    export function queue(task: Task): void {
        setTimeout(task, 0);
    }
    
    /** Creates a task that resolves after the specified number of milliseconds. */
    export function sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
