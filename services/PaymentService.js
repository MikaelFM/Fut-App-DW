import { MercadoPagoConfig, Payment } from 'mercadopago';
import { randomUUID } from "crypto";
import { Cobranca } from '../models/PaymentModel.js';
import { Usuarios } from '../models/UsersModel.js';
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

    async create(user) {
        const cobranca = await payment.create({
            body: {
                transaction_amount: 0.02, //valor fixo para testes,
                description: 'App FUT',
                payment_method_id: "pix",
                payer: {
                    email: user.email
                }
            },
            requestOptions: {
                idempotencyKey: randomUUID()
            }
        });

        const doc = new Cobranca({
            id_cobranca: cobranca.id,
            id_usuario: user._id,
            valor: user.total_dividas,
            dividas: user.dividas
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

    async aprovePayment(paymentId) {
        const cobranca = await Cobranca.findOne({ id_cobranca: paymentId });

        if (!cobranca) {
            throw new Error("Cobranca not found");
        };

        const usuario = await Usuarios.findById(cobranca.id_usuario);
        const idsDividasPagas = cobranca.dividas.map(c => c.id);

        usuario.total_dividas -= cobranca.valor;

        usuario.dividas = usuario.dividas.filter(
            divida => !idsDividasPagas.includes(divida.id)
        );

        await usuario.save();

        return await Cobranca.deleteOne({ id_cobranca: paymentId });
    }
}

export default new PaymentService();
