import BaseController from "./BaseController.js";
import userService from "../services/UsersService.js";

class usersController extends BaseController {
    constructor() {
        super(userService);
    }
}

export default new usersController();