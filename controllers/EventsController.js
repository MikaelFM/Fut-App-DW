import BaseController from "./BaseController.js";
import eventService from "../services/EventsService.js";

class eventsController extends BaseController {
    constructor() {
        super(eventService);
    }
}

export default new eventsController();