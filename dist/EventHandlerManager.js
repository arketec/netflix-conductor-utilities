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
exports.EventHandlerManager = void 0;
const assert_1 = __importDefault(require("assert"));
const axios_1 = __importDefault(require("axios"));
class EventHandlerManager {
    constructor(options = {}) {
        this.options = options;
        const { apiEndpoint } = this.options;
        assert_1.default(apiEndpoint, 'apiEndpoint is empty');
        this.client = axios_1.default.create({
            baseURL: apiEndpoint,
            responseType: 'json',
        });
    }
    getAllEventHandlers() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.client.get('/event');
            return data;
        });
    }
    getEventHandlers(eventName) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/event/${eventName}`;
            const response = yield this.client.get(url);
            const { data } = response;
            return data;
        });
    }
    registerEventHandler(eventHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.post(`/event`, eventHandler);
            const eventHandlerObject = yield this.getEventHandlers(eventHandler.event);
            assert_1.default(eventHandlerObject.find(x => x.name === eventHandler.name), 'Create a EventHandler, but can not find EventHandler');
            return eventHandlerObject;
        });
    }
    registerOrUpdateEventHandler(eventHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = eventHandler.event;
            yield this.client.put(`/event`, eventHandler);
            return this.getEventHandlers(event);
        });
    }
}
exports.EventHandlerManager = EventHandlerManager;
exports.default = EventHandlerManager;
//# sourceMappingURL=EventHandlerManager.js.map