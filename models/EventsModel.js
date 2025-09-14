import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O campo nome é obrigatório"],
        maxlength: [100, "O campo nome deve ter no máximo 100 caracteres"]
    },
    data: {
        type: Date,
        required: [true, "O campo data é obrigatório"]
    },
    hora: {
        type: String,
        required: [true, "O campo hora é obrigatório"],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Informe uma hora válida no formato HH:MM"]
    },
    local: {
        type: String,
        required: [true, "O campo local é obrigatório"],
        maxlength: [100, "O campo local deve ter no máximo 100 caracteres"]
    },
    numero_jogadores: {
        type: Number,
        required: [true, "O campo número de jogadores é obrigatório"],
        min: [2, "O número mínimo de jogadores é 2"],
        max: [30, "O número máximo de jogadores é 30"]
    },
    valor: {
        type: Number,
        required: [true, "O campo valor é obrigatório"],
        min: [0, "O valor não pode ser negativo"]
    },
    observacoes: {
        type: String,
        required: false,
        maxlength: [500, "O campo observações deve ter no máximo 500 caracteres"],
        default: ""
    }
}, { timestamps: true });

export const Eventos = mongoose.model("Eventos", eventoSchema);
