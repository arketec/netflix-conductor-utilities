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
const TaskMetadataManager_1 = __importDefault(require("../TaskMetadataManager"));
describe('TaskMetadata', () => {
    let sdk;
    before(() => {
        sdk = new TaskMetadataManager_1.default({ apiEndpoint: 'http://localhost:8080/api/' });
    });
    it('Get all task definitions', () => __awaiter(void 0, void 0, void 0, function* () {
        const tasks = yield sdk.getAllTasks();
        tasks[0];
    }));
    it('Retrieve task definition', () => __awaiter(void 0, void 0, void 0, function* () {
        const tasks = yield sdk.getTask('task_16');
        tasks;
    }));
    it('Delete a task definition', () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield sdk.registerTask({
            ownerEmail: 'yujiechen0514@gmail.com',
            name: 'test_task2',
        });
        task; /*?*/
        yield sdk.deleteTask(task.name);
    }));
    it('Update a task definition', () => __awaiter(void 0, void 0, void 0, function* () {
        const taskName = 'test_task3';
        try {
            const taskMeta = {
                ownerEmail: 'yujiechen0514@gmail.com',
                name: taskName,
                inputKeys: ['a']
            };
            yield sdk.registerTask(taskMeta);
            let task = yield sdk.getTask(taskName);
            expect(task.inputKeys).be.not.empty;
            if (task.inputKeys) {
                expect(task.inputKeys.length).be.eq(1);
            }
            // update
            taskMeta.inputKeys.push('b');
            yield sdk.updateTask(taskMeta);
            task = yield sdk.getTask(taskName);
            expect(task.inputKeys).be.not.empty;
            if (task.inputKeys) {
                expect(task.inputKeys.length).be.eq(2);
            }
        }
        catch (e) {
        }
        finally {
            yield sdk.deleteTask(taskName);
        }
    }));
});
//# sourceMappingURL=TaskMetadataManager.test.js.map