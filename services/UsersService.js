import BaseService from "./BaseService.js";
import { Usuarios } from "../models/UsersModel.js";

class UserService extends BaseService {
    constructor() {
        super(Usuarios);
    }

    async incrementGoals(id, value = 1) {
        return await this.model.findByIdAndUpdate(
            id,
            { $inc: { gols: value } },
            { new: true }
        );
    }

    async incrementAssists(id, value = 1) {
        return await this.model.findByIdAndUpdate(
            id,
            { $inc: { assistencias: value } },
            { new: true }
        );
    }
}

export default new UserService();
