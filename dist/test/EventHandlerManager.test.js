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
const __1 = require("..");
const types_1 = require("../types");
const chai_1 = __importDefault(require("chai"));
const expect = chai_1.default.expect;
const EventHandlerManager_1 = __importDefault(require("../EventHandlerManager"));
const options = { apiEndpoint: 'http://localhost:8080/api/' };
describe('EventHandler', () => {
    let sdk;
    before(() => {
        sdk = new EventHandlerManager_1.default(options);
    });
    it('Get all eventHandler  definitions', () => __awaiter(void 0, void 0, void 0, function* () {
        const eventHandlers = yield sdk.getAllEventHandlers();
        eventHandlers[0];
    }));
    it('Retrieve eventHandler definition', () => __awaiter(void 0, void 0, void 0, function* () {
        const tasks = yield sdk.getEventHandlers('conductor:test_wf1642189031146:test_startWorkflow');
        tasks;
    }));
    it('Register new eventHandler', () => __awaiter(void 0, void 0, void 0, function* () {
        const eventHandler = yield sdk.registerEventHandler({
            "name": "test_eventHandler",
            "event": "conductor:test_wf1642189031146:test_startWorkflow",
            "actions": [
                {
                    "action": types_1.EventHandlerAction.startWorkflow,
                    "start_workflow": {
                        "name": "kitchensink",
                        "correlationId": "string",
                        "input": {
                            "additionalProp1": {},
                            "additionalProp2": {},
                            "additionalProp3": {}
                        }
                    },
                    "expandInlineJSON": true
                }
            ]
        });
        eventHandler; /*?*/
    }));
    it('Update eventHandler', () => __awaiter(void 0, void 0, void 0, function* () {
        const eventHandlerName = 'test_eventHandler';
        const eventHandlerMetadata = {
            "name": "test_eventHandler",
            "event": "conductor:test_wf1642189031146:test_startWorkflow",
            "evaluatorType": "javascript",
            "active": true,
            "actions": [
                {
                    "action": types_1.EventHandlerAction.startWorkflow,
                    "start_workflow": {
                        "name": "kitchensink",
                        "correlationId": "string",
                        "input": {
                            "additionalProp1": {},
                            "additionalProp2": {},
                            "additionalProp3": {}
                        }
                    },
                    "expandInlineJSON": true
                }
            ]
        };
        try {
            let eventHandler = yield sdk.registerOrUpdateEventHandler(eventHandlerMetadata);
            eventHandlerMetadata.name = 'test_eventHandler';
            eventHandler = yield sdk.registerOrUpdateEventHandler(eventHandlerMetadata);
            expect(eventHandler[0].name).be.eq("test_eventHandler");
        }
        catch (e) {
            e; /*?*/
            throw e;
        }
    }));
    it('create an event task workflow', () => __awaiter(void 0, void 0, void 0, function* () {
        const workflow = yield new __1.WorkflowMetadataManager(options).registerWorkflow({
            ownerEmail: 'ittest@btisinc.com',
            name: 'test_wf1642189031146',
            tasks: [
                {
                    "name": "task_16",
                    "taskReferenceName": "task_16_in_wf",
                    "type": types_1.WorkflowTaskType.event,
                    "sink": "conductor:test_startWorkflow"
                }
            ],
        });
        workflow; /*?*/
    }));
    it('start an event task', () => __awaiter(void 0, void 0, void 0, function* () {
        const workflow = yield new __1.WorkflowManager(options).startWorkflow({
            name: 'test_wf1642189031146'
        });
        workflow; /*?*/
    }));
});
//# sourceMappingURL=EventHandlerManager.test.js.map