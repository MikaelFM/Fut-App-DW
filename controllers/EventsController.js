import BaseController from "./BaseController.js";
import eventService from "../services/EventsService.js";
import userService from "../services/UsersService.js";

class eventsController extends BaseController {
    constructor() {
        super(eventService);
    }

    save = this.handle(async (req, res, next) => {
        try {
            await eventService.save(req.body);
            return res.redirect('/myevents');
        } catch (err) {
            let errors = {};

            if (err.name === "ValidationError") {
                for (let error in err.errors) {
                    errors[error] = err.errors[error].message;
                }
            }

            return res.render('form', { fields: req.body, errors });
        }
    });

    confirm = this.handle(async (req, res, next) => {
        await eventService.confirmPresence(req.params.event_id, {
            user_id: req.session.user._id,
            user_name: req.session.user.nome,
            team: ''
        });

        res.redirect(req.headers.referer);
    })

    finalize = this.handle(async (req, res, next) => {
        const event = await eventService.saveScoreEvent(req.body.event_id, req.body.gols_time_1, req.body.gols_time_2);
        for (let participante of event.confirmados) {
            await userService.updateHistoryUser(participante, event);
        }
        res.redirect('/myevents');
    })
}

export default new eventsController();