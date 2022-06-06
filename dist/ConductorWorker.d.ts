/// <reference types="node" />
import RunningTask, { KeepTaskTimerOptions } from "./RunningTask";
import { AxiosInstance } from "axios";
import { EventEmitter } from "events";
interface ProcessingTask<Result = void> {
    taskId: string;
    task: RunningTask<Result>;
}
export interface ConductorWorkerOptions {
    url?: string;
    apiPath?: string;
    workerid?: string;
    maxConcurrent?: number;
    runningTaskOptions?: Partial<KeepTaskTimerOptions>;
    /**
     * Because the “POST /tasks/{taskId}/ack“ api was removed in ConductorV3,
     * workers have been no longer to acknowledge a Conductor Server.
     */
    needAckTask?: boolean;
}
export declare type WorkFunction<OUTPUT = void, INPUT = any> = (input: INPUT, runningTask: RunningTask<OUTPUT>) => Promise<OUTPUT>;
declare class ConductorWorker<OUTPUT = void, INPUT = any> extends EventEmitter {
    url: string;
    apiPath: string;
    workerid?: string;
    client: AxiosInstance;
    polling: boolean;
    maxConcurrent: number;
    runningTasks: ProcessingTask<OUTPUT>[];
    needAckTask: boolean;
    runningTaskOptions: Partial<KeepTaskTimerOptions>;
    constructor(options?: ConductorWorkerOptions);
    __canPollTask(): boolean;
    pollAndWork(taskType: string, fn: WorkFunction<OUTPUT, INPUT>): Promise<void>;
    start(taskType: string, fn: WorkFunction<OUTPUT, INPUT>, interval?: number): void;
    stop(): void;
}
export default ConductorWorker;
export { ConductorWorker, RunningTask };
