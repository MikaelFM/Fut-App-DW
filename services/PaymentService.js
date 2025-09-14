import { MercadoPagoConfig, Payment } from 'mercadopago';
import { randomUUID } from "crypto";
import { Cobranca } from '../models/PaymentModel.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });
const payment = new Payment(client);

class PaymentService {
    async getAll(){
        return await payment.search({
            qs: {
                limit: 50,
                sort: "date_created",
                criteria: "desc",
                status: "pending"
            }
        });
    }

    async create(data) {
        const cobranca = await payment.create({
            body: {
                transaction_amount: data.valor,
                description: 'Testando API',
                payment_method_id: "pix",
                payer: {
                    email: 'mikaelfernandesmoreira@gmail.com',
                    // identification: {
                    //     type: req.identificationType,
                    //     number: req.number
                    // }
                }
            },
            requestOptions: {
                idempotencyKey: randomUUID()
            }
        });

        const doc = new Cobranca({
            id_cobranca: cobranca.id,
            valor: data.valor,
            dividas_pagas: data.dividas
        });

        await doc.save();

        return cobranca;
    }

    async getById(paymentId) {
        return await payment.get({id: paymentId});
    }

    async delete(paymentId) {
        return await payment.cancel({id: paymentId});
    }
}

export default new PaymentService();
