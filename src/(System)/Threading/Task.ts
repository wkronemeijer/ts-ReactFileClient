/** A `Promise` with delayed execution. */
export type Task<T = any> = () => Promise<T>;

/** Immediately runs a task. Used to avoid ugly IIFEs. */
export function runTask(task: Task): void {
    task();
}

/** Queues a task to be run. JavaScript decides when! */
export function queueTask(task: Task): void {
    setTimeout(task, 0);
}

/** Resolves after the specified number of milliseconds. */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
