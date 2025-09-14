import BaseService from "./BaseService.js";
import { Eventos } from "../models/EventsModel.js";

class EventsService extends BaseService {
    constructor() {
        super(Eventos);
    }

    async addConfirmed(id, playerName) {
        return await this.model.findByIdAndUpdate(
            id,
            { $addToSet: { confirmados: playerName } },
            { new: true }
        );
    }

    async removeConfirmed(id, playerName) {
        return await this.model.findByIdAndUpdate(
            id,
            { $pull: { confirmados: playerName } },
            { new: true }
        );
    }
}

export default new EventsService();
