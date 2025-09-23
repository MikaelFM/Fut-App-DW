import PaymentService from "../services/PaymentService.js";
import UserService from "../services/UsersService.js";

class paymentController {
    getAll = async (req, res) => {
        try {
            const result = await PaymentService.getAll();
            res.status(200).json({ result: result });
        } catch (error) {
            res.status(400).send(error);
        }
    }

    getById = async (req, res) => {
        try {
            const result = await PaymentService.getById(req.params.id);
            res.status(200).json({ result: result });
        } catch (error) {
            res.status(400).send(error);
        }
    }

    create = async (req, res) => {
        try {
            const result = await PaymentService.create(req.session.user);
            res.status(200).json({ result: result });
        } catch (error) {
            res.status(400).send(error);
        }
    }

    delete = async (req, res) => {
        try {
            const result = await PaymentService.delete(req.params.id);
            res.status(200).json({ result: result });
        } catch (error) {
            res.status(400).send(error);
        }
    }

    processPayment = async (req, res) => {
        try {
            const json = req.body;

            if (json?.action === 'payment.updated'){
                const payment = await PaymentService.getById(json.data.id);

                if(!payment){
                    throw new Error("Pagamento not found");
                }

                if(payment.status === 'approved'){
                    await PaymentService.aprovePayment(json.data.id);
                    return res.status(200).send({ msg: 'success' });
                }
            }

            return res.status(401).send({ msg: 'pagamento não processado' });
        } catch (error){
            res.status(400).send({ error });
        }
    }
}

export default new paymentController();