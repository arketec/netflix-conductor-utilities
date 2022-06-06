/// <reference types="node" />
import { RunningTaskCoreInfo, TaskState, UpdatingTaskResult } from "./types";
import { AxiosResponse } from "axios";
import ConductorWorker from "./ConductorWorker";
export interface KeepTaskTimerOptions {
    keepAliveTimer: {
        enable: boolean;
        interval: number;
        callbackAfterSeconds: number;
    };
}
export declare type RunningTaskOptions = RunningTaskCoreInfo & KeepTaskTimerOptions;
export default class RunningTask<Result = void> {
    options: RunningTaskOptions;
    worker: ConductorWorker<Result>;
    done: boolean;
    start: number | undefined;
    keepRunningTimer: NodeJS.Timeout | undefined;
    constructor(worker: ConductorWorker<Result>, options: RunningTaskCoreInfo & Partial<KeepTaskTimerOptions>);
    updateTaskInfo(partialUpdateTaskInfo: Partial<UpdatingTaskResult> & {
        status: TaskState;
    }): Promise<AxiosResponse<any>>;
    private __setKeepTaskTimerForNotifyConductor;
    private __clearKeepTaskTimerForNotifyConductor;
    startTask(): void;
    sendLog(msg: string, others?: Partial<UpdatingTaskResult>): Promise<AxiosResponse<any>>;
    stopTask(): void;
}
