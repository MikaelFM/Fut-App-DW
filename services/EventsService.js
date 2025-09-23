import BaseService from "./BaseService.js";
import {Eventos} from "../models/EventsModel.js";
import { getFilterNextEvents } from "../utils/utils.js";

class EventsService extends BaseService {
    constructor() {
        super(Eventos);
    }

    async getEventByUser(userId) {
        const events = await this.model.find({"confirmados.user_id": userId, finalizado: true})
            .sort({data: -1})
            .limit(20)
            .lean();

        events.forEach(event => {
            let timeUsuario = event.confirmados.filter(u => u.user_id == userId)[0].team;
            let timeVencedor = event.time_vencedor;
            event.resultado_usuario = timeVencedor === "E" ? "E" : (timeVencedor == timeUsuario ? "V" : "D");
        })

        return events;
    }

    async getEventOfUser(userId) {
        return await this.model.find({id_usuario_criador: userId}).sort({data: 1});
    }

    async getPageEvents(pageNumber, recordsPerPage) {
        const skip = (pageNumber - 1) * recordsPerPage;
        const query = getFilterNextEvents();
        const events = await this.model.find(query).skip(skip).limit(recordsPerPage);
        const totalEvents = await this.model.countDocuments(query);
        return [events, totalEvents];
    }

    async getNextEvents() {
        const query = getFilterNextEvents();
        return await this.model.find(query).sort({data: 1}).limit(3);
    }

    async confirmPresence(eventId, user) {
        const event = await this.model.findById(eventId);

        const exists = event.confirmados.some(u => u.user_id === user.user_id);

        if (exists) {
            await this.model.updateOne(
                { _id: eventId },
                { $pull: { confirmados: { user_id: user.user_id } } }
            );
            return;
        }

        await this.model.updateOne(
            { _id: eventId },
            { $addToSet: { confirmados: user } }
        );

    }

    async saveScoreEvent(eventId, golsTime1, golsTime2){
        const event = await this.getById(eventId);
        const winningTeam = golsTime1 > golsTime2 ? 1 : (golsTime1 < golsTime2 ? 2 : "E");
        event.gols_time_1 = golsTime1;
        event.gols_time_2 = golsTime2;
        event.time_vencedor = winningTeam;
        event.finalizado = true;
        return await event.save();
    }
}

export default new EventsService();
