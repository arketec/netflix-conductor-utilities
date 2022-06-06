import { AxiosInstance } from 'axios';
import { ConductorSDKOptions, StartWorkflowOptions, Workflow } from "./index";
interface RerunWorkflowOptions {
    reRunFromWorkflowId: string;
    workflowInput: any;
    reRunFromTaskId: string;
    taskInput: any;
}
interface SkipWorkflowTaskOptions {
    taskReferenceName: string;
    taskInput: any;
    taskOutput: any;
}
declare class WorkflowManager {
    options: ConductorSDKOptions;
    client: AxiosInstance;
    constructor(options?: ConductorSDKOptions);
    /**
     * Get Workflow State by workflow Id. If includeTasks is set, then also includes all the tasks executed and scheduled.
     */
    retrieveWorkflow(workflowId: string, includeTasks?: boolean): Promise<Workflow>;
    startWorkflow(options: StartWorkflowOptions): Promise<Workflow>;
    terminateWorkflow(workflowId: string): Promise<Workflow>;
    removeWorkflow(workflowId: string): Promise<Workflow>;
    /**
     * Pause. No further tasks will be scheduled until resumed. Currently running tasks are not paused.
     * @param workflowId
     */
    pauseWorkflow(workflowId: string): Promise<Workflow>;
    /**
     * Resume normal operations after a pause.
     * @param workflowId
     */
    resumeWorkflow(workflowId: string): Promise<Workflow>;
    /**
     * Re-runs a completed workflow from a specific task.
     * @param workflowId
     * @param options
     */
    rerunWorkflow(workflowId: string, options: RerunWorkflowOptions): Promise<Workflow>;
    /**
     * Restart workflow execution from the start. Current execution history is wiped out.
     * @param workflowId
     */
    restartWorkflow(workflowId: string): Promise<Workflow>;
    /**
     * Retry the last failed task.
     * @param workflowId
     */
    retryWorkflow(workflowId: string): Promise<Workflow>;
    /**
     * Skips a task execution (specified as taskReferenceName parameter) in a running workflow and continues forward.
     * Optionally updating task's input and output as specified in the payload.
     * PUT /workflow/{workflowId}/skiptask/{taskReferenceName}?workflowId=&taskReferenceName=
     * @param workflowId
     * @param options
     */
    skipWorkflowTask(workflowId: string, options: SkipWorkflowTaskOptions): Promise<Workflow>;
}
export default WorkflowManager;
export { WorkflowManager };
