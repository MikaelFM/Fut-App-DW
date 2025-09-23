import BaseService from "./BaseService.js";
import { Usuarios } from "../models/UsersModel.js";

class UserService extends BaseService {
    constructor() {
        super(Usuarios);
    }

    async findByEmail(email) {
        return await this.model.findOne({ email });
    }

    async updateHistoryUser(participante, event) {
        let user = await this.getById(participante.user_id);

        if (!user) return;

        if (participante.team !== ""){
            if (event.time_vencedor === "E"){
                user.empates++;
                user.ultimos_resultados.unshift("E");
            } else if (event.time_vencedor == participante.team){
                user.vitorias++;
                user.ultimos_resultados.unshift("V");
            } else {
                user.derrotas++;
                user.ultimos_resultados.unshift("D");
            }

            if (user.ultimos_resultados.length > 5) {
                user.ultimos_resultados = user.ultimos_resultados.slice(0, 5);
            }
        }

        user.jogos++;
        user.total_dividas += event.valor;
        user.dividas.push({
            id: event.id,
            titulo: event.titulo,
            local: event.local,
            data: event.data,
            valor: event.valor,
        })

        user.save();
    }
}

export default new UserService();
