"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const expect = chai_1.default.expect;
const WorkflowMetadataManager_1 = __importDefault(require("../WorkflowMetadataManager"));
const __1 = require("..");
describe('WorkflowMetadata', () => {
    let sdk;
    before(() => {
        sdk = new WorkflowMetadataManager_1.default({ apiEndpoint: 'http://localhost:8080/api/' });
    });
    it('Get all workflow  definitions', () => __awaiter(void 0, void 0, void 0, function* () {
        const workflows = yield sdk.getAllWorkflows();
        workflows[0];
    }));
    it('Retrieve workflow definition', () => __awaiter(void 0, void 0, void 0, function* () {
        const tasks = yield sdk.getWorkflow('kitchensink');
        tasks;
    }));
    it('Register new workflow', () => __awaiter(void 0, void 0, void 0, function* () {
        const workflow = yield sdk.registerWorkflow({
            ownerEmail: 'yujiechen0514@gmail.com',
            name: 'test_wf' + new Date().getTime(),
            tasks: [
                {
                    "name": "task_16",
                    "taskReferenceName": "task_16_in_wf",
                    "type": __1.WorkflowTaskType.simple,
                }
            ],
        });
        workflow; /*?*/
    }));
    it('Update workflow', () => __awaiter(void 0, void 0, void 0, function* () {
        const workflowName = 'test_workflow';
        const workflowMetadata = {
            ownerEmail: 'yujiechen0514@gmail.com',
            name: workflowName,
            tasks: [
                {
                    name: 'task_16',
                    taskReferenceName: 'task_16_in_wf',
                    type: __1.WorkflowTaskType.simple,
                }
            ],
        };
        try {
            let workflow = yield sdk.registerOrUpdateWorkflow(workflowMetadata);
            workflowMetadata.tasks[0].name = 'task_17';
            workflow = yield sdk.registerOrUpdateWorkflow(workflowMetadata);
            expect(workflow.tasks[0].name).be.eq("task_17");
        }
        catch (e) {
            e; /*?*/
            throw e;
        }
    }));
});
//# sourceMappingURL=WorkflowMetadataManager.test.js.map