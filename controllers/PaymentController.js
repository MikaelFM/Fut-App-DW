import PaymentService from "../services/PaymentService.js";

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
            const result = await PaymentService.create(req.body);
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
}

export default new paymentController();