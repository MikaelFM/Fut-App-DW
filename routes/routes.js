import { Router } from 'express';
// import { authValidate, usernameValidate } from "../middlewares/authMiddleware.js";
import { saveUserValidate } from "../middlewares/userMiddleware.js";
import { index, newEvent } from "../controllers/pageController.js"
import eventsController from "../controllers/EventsController.js"
import usersController from "../controllers/UsersController.js"
import paymentsController from "../controllers/PaymentController.js"

const router = Router();

// router.get('/login', login)
router.get('/', index);

router.get('/event', eventsController.getAll);
router.post('/event', eventsController.save);
router.delete('/event/:id', eventsController.delete);

router.get('/user', usersController.getAll);
router.post('/user', saveUserValidate, usersController.save);
router.delete('/user/:id', usersController.delete);

router.get('/payment', paymentsController.getAll);
router.get('/payment/:id', paymentsController.getById);
router.post('/payment', paymentsController.create);
router.delete('/payment/:id', paymentsController.delete);



// router.post('/user/save', usernameValidate, saveUser);

export default router;