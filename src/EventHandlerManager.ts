import assert from 'assert';
import axios, {AxiosInstance} from 'axios';
import {ConductorSDKOptions, EventHandlerDefinition} from "./index";

class EventHandlerManager {
    options: ConductorSDKOptions;
    client: AxiosInstance;

    constructor(options: ConductorSDKOptions = {}) {
        this.options = options;

        const {apiEndpoint} = this.options;
        assert(apiEndpoint, 'apiEndpoint is empty');

        this.client = axios.create({
            baseURL: apiEndpoint,
            responseType: 'json',
        });
    }

    async getAllEventHandlers() {
        const {data} = await this.client.get<EventHandlerDefinition[]>('/event');
        return data;
    }

    async getEventHandlers(eventName: string) {
        const url = `/event/${eventName}`;
        const response = await this.client.get<EventHandlerDefinition[]>(url);
        const {data} = response
        return data;
    }

    async registerEventHandler(eventHandler: EventHandlerDefinition) {
        await this.client.post<EventHandlerDefinition>(`/event`, eventHandler);
        const eventHandlerObject = await this.getEventHandlers(eventHandler.event);
        assert(eventHandlerObject.find(x => x.name === eventHandler.name), 'Create a EventHandler, but can not find EventHandler');
        return eventHandlerObject;
    }

    async registerOrUpdateEventHandler(eventHandler: EventHandlerDefinition) {
        const event = eventHandler.event
        await this.client.put<void>(`/event`, eventHandler);
        return this.getEventHandlers(event);
    }
}

export default EventHandlerManager;
export {EventHandlerManager};
