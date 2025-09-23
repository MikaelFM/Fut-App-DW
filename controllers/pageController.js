import eventService from "../services/EventsService.js";
import userService from "../services/UsersService.js";

export const login = async (req, res) => {
    res.render('login');
}

export const register = async (req, res) => {
    res.render('register', { fields: {} });
}

export const index = async (req, res) => {
    const user = req.session.user;
    const events = await eventService.getNextEvents();
    res.render('home', { user, events });
}

export const events = async (req, res) => {
    const paginationPerPage = 5;
    const currentPage = parseInt(req.query.page) || 1;
    const [events, total] = await eventService.getPageEvents(currentPage, paginationPerPage);
    const pagination = { currentPage, total, totalPages: Math.ceil(total/paginationPerPage) };
    res.render('events', { events, pagination, user_id: req.session.user._id  });
}

export const renderFinalizeEvent = async (req, res) => {
    const event = await eventService.getById(req.params.id);
    res.render('finalize_event', { fields: event });
}

export const myevents = async (req, res) => {
    const events = await eventService.getEventOfUser(req.session.user._id);
    res.render('myevents', { events});
}

export const stats = async (req, res) => {
    const user = await userService.getById(req.session.user._id);
    const resultsColor = {'E': 'yellow', 'D': 'red', 'V': 'green'};
    const events = await eventService.getEventByUser(user.id);
    res.render('stats', { user, resultsColor, events });
}

export const debts = async (req, res) => {
    const user = await userService.getById(req.session.user._id);
    req.session.user = user;
    res.render('debts', { user });
}

export const newEvent = async (req, res) => {
    res.render('form', { fields: { id_usuario_criador: req.session.user._id, confirmados: [] } });
}

export const editEvent = async (req, res) => {
    const event = await eventService.getById(req.params.id);
    res.render('form', { fields: event });
}

export const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log('Erro ao destruir sessão:', err);
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
}