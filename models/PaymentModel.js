import mongoose from "mongoose";

const cobrancaSchema = new mongoose.Schema({
    id_cobranca: {
        type: Number,
        required: true,
    },
    valor: {
        type: Number,
        required: true
    },
    dividas_pagas: {
        type: Array,
        required: true
    },
}, { timestamps: true });

export const Cobranca = mongoose.model("Cobranca", cobrancaSchema);