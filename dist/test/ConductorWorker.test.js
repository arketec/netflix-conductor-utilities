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
const WorkflowManager_1 = __importDefault(require("../WorkflowManager"));
const __1 = require("..");
function delay(ms = 10000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
describe('WorkflowManager', function () {
    this.timeout(10000);
    const taskMetadataManager = new __1.TaskMetadataManager({ apiEndpoint: 'http://localhost:8080/api/' });
    const workflowMetadataManager = new __1.WorkflowMetadataManager({ apiEndpoint: 'http://localhost:8080/api/' });
    const workflowManager = new WorkflowManager_1.default({ apiEndpoint: 'http://localhost:8080/api/' });
    const taskType = 'test';
    const wfName = `test_wf_${taskType}`;
    before(() => __awaiter(this, void 0, void 0, function* () {
        yield taskMetadataManager.registerTask({
            ownerEmail: 'yujiechen0514@gmail.com',
            name: taskType,
        });
        yield workflowMetadataManager.registerOrUpdateWorkflow({
            ownerEmail: 'yujiechen0514@gmail.com',
            name: wfName,
            tasks: [
                {
                    "name": taskType,
                    "taskReferenceName": taskType,
                    "type": __1.WorkflowTaskType.simple,
                }
            ],
        });
    }));
    it('Start workflow request', () => __awaiter(this, void 0, void 0, function* () {
        // arrange
        const worker = new __1.ConductorWorker({
            url: 'http://localhost:8080',
            apiPath: '/api',
            workerid: 'node-worker',
        });
        let called = false;
        // act
        worker.start(taskType, () => {
            return new Promise((resolve, reject) => {
                const handler = setTimeout(() => {
                    clearTimeout(handler);
                    called = true;
                    resolve();
                }, 500);
            });
        }, 1000);
        yield workflowManager.startWorkflow({
            name: wfName,
        });
        // assert
        yield delay(4000);
        worker.stop();
        expect(called).be.eq(true);
    }));
});
//# sourceMappingURL=ConductorWorker.test.js.map