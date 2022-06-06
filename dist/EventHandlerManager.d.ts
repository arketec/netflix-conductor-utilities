import { AxiosInstance } from 'axios';
import { ConductorSDKOptions, EventHandlerDefinition } from "./index";
declare class EventHandlerManager {
    options: ConductorSDKOptions;
    client: AxiosInstance;
    constructor(options?: ConductorSDKOptions);
    getAllEventHandlers(): Promise<EventHandlerDefinition[]>;
    getEventHandlers(eventName: string): Promise<EventHandlerDefinition[]>;
    registerEventHandler(eventHandler: EventHandlerDefinition): Promise<EventHandlerDefinition[]>;
    registerOrUpdateEventHandler(eventHandler: EventHandlerDefinition): Promise<EventHandlerDefinition[]>;
}
export default EventHandlerManager;
export { EventHandlerManager };
