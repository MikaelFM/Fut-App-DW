import BaseController from "./BaseController.js";
import userService from "../services/UsersService.js";
import bcrypt from "bcrypt";

class usersController extends BaseController {
    constructor() {
        super(userService);
    }

    save = this.handle(async (req, res, next) => {
        try {
            await userService.save(req.body);
            return res.redirect('/login');
        } catch (err) {
            let errors = {};

            if (err.name === "ValidationError") {
                for (let error in err.errors) {
                    errors[error] = err.errors[error].message;
                }
            }

            if (err.code === 11000) {
                errors['email'] = 'Já existe uma conta registrada com este e-mail';
            }

            return res.render('register', { fields: req.body, errors });
        }
    });

    loginValidate = this.handle(async (req, res, next) => {
        const { email, senha } = req.body;
        const user = await userService.findByEmail(email);

        if (!user) {
            return res.render('login', { error: 'Usuário não encontrado' });
        }

        const isValid = await bcrypt.compare(senha, user.senha);
        if (!isValid) {
            return res.render('login', { error: 'Senha incorreta' });
        }

        req.session.user = user;
        res.redirect('/');
    });

}

export default new usersController();