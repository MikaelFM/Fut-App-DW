import { Router } from 'express';
import { requireAuth } from "../middlewares/authMiddleware.js";
import { saveEventValidate } from "../middlewares/eventsMiddleware.js"
import { saveUserValidate } from "../middlewares/userMiddleware.js";
import { login, register, index, events, myevents, stats, debts, newEvent, editEvent, renderFinalizeEvent, logout } from "../controllers/pageController.js"
import eventsController from "../controllers/EventsController.js"
import usersController from "../controllers/UsersController.js"
import paymentsController from "../controllers/PaymentController.js"

const router = Router();

// Rotas Login
router.get('/login', login);
router.post('/login/confirm', usersController.loginValidate);
router.get('/logout', logout);

// Rotas Registro
router.get('/register', register);
router.post('/user', saveUserValidate, usersController.save);

// Rotas Tabs
router.get('/', requireAuth, index);
router.get('/events', requireAuth, events);
router.get('/myevents', requireAuth, myevents)
router.get('/stats', requireAuth, stats);
router.get('/debts', requireAuth, debts);

// Rotas CRUD Eventos
router.get('/form', requireAuth, newEvent);
router.get('/event/edit/:id', requireAuth, editEvent);
router.post('/event/finalize', requireAuth, eventsController.finalize);
router.get('/event/finalize/:id', requireAuth, renderFinalizeEvent);
router.post('/event', requireAuth, saveEventValidate, eventsController.save);
router.get('/event/delete/:id', requireAuth, eventsController.delete);
router.get('/event/confirm/:event_id', requireAuth, eventsController.confirm);

// Rotas Cobrança
router.post('/payment', requireAuth, paymentsController.create);
router.delete('/payment/:id', paymentsController.delete);
router.post('/payment/webhook', paymentsController.processPayment);

// Rotas teste
router.get('/user', usersController.getAll);
router.delete('/user/:id',usersController.delete);
router.get('/payment', paymentsController.getAll);
router.get('/payment/:id', paymentsController.getById);


export default router;