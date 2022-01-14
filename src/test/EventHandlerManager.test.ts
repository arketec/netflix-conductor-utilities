import { WorkflowManager, WorkflowMetadataManager } from '..';
import { EventHandlerAction, WorkflowTaskType } from '../types';
import chai from 'chai';
const expect = chai.expect;

import EventHandlerManager from "../EventHandlerManager";

const options = {apiEndpoint: 'http://localhost:8080/api/'}
describe('EventHandler', () => {
    let sdk: EventHandlerManager;
    before(() => {
        sdk = new EventHandlerManager(options);
    });

    it('Get all eventHandler  definitions', async () => {
        const eventHandlers = await sdk.getAllEventHandlers();
        eventHandlers[0]
    });

    it('Retrieve eventHandler definition', async () => {
        const tasks = await sdk.getEventHandlers('conductor:test_wf1642189031146:test_startWorkflow');
        tasks
    });

    it('Register new eventHandler', async () => {
        const eventHandler = await sdk.registerEventHandler({
            "name": "test_eventHandler",
            "event": "conductor:test_wf1642189031146:test_startWorkflow",
            "actions": [
              {
                "action": EventHandlerAction.startWorkflow,
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
        eventHandler/*?*/
    });
    it('Update eventHandler', async () => {
        const eventHandlerName = 'test_eventHandler';
        const eventHandlerMetadata = {
            "name": "test_eventHandler",
            "event": "conductor:test_wf1642189031146:test_startWorkflow",
            "evaluatorType": "javascript",
            "active": true,
            "actions": [
              {
                "action": EventHandlerAction.startWorkflow,
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
            let eventHandler = await sdk.registerOrUpdateEventHandler(eventHandlerMetadata);
            eventHandlerMetadata.name = 'test_eventHandler';
            eventHandler = await sdk.registerOrUpdateEventHandler(eventHandlerMetadata);
            expect(eventHandler[0].name).be.eq("test_eventHandler");
        } catch (e) {
            e/*?*/

            throw e;
        }
    });

    it('create an event task workflow', async () => {
        const workflow = await new WorkflowMetadataManager(options).registerWorkflow({
            ownerEmail: 'ittest@btisinc.com',
            name: 'test_wf1642189031146',
            tasks: [
                {
                    "name": "task_16",
                    "taskReferenceName": "task_16_in_wf",
                    "type": WorkflowTaskType.event,
                    "sink": "conductor:test_startWorkflow"
                }
            ],
        });
        workflow/*?*/
    })

    it('start an event task', async () => {
        const workflow = await new WorkflowManager(options).startWorkflow({
            name: 'test_wf1642189031146'
        })
        workflow/*?*/
    })
});
