import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "O campo título é obrigatório"],
        maxlength: [20, "O campo nome título ter no máximo 20 caracteres"]
    },
    data: {
        type: Date,
        required: [true, "O campo data é obrigatório"]
    },
    hora_inicio: {
        type: String,
        required: [true, "O campo hora de início é obrigatório"],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Informe uma hora válida no formato HH:MM"]
    },
    hora_fim: {
        type: String,
        required: [true, "O campo hora de término é obrigatório"],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Informe uma hora válida no formato HH:MM"]
    },
    local: {
        type: String,
        required: [true, "O campo local é obrigatório"],
        maxlength: [30, "O campo local deve ter no máximo 30 caracteres"]
    },
    numero_jogadores: {
        type: Number,
        required: [true, "O campo número de jogadores é obrigatório"],
        min: [8, "O número mínimo de jogadores é 8"],
        max: [20, "O número máximo de jogadores é 20"]
    },
    valor: {
        type: Number,
        required: [true, "O campo valor é obrigatório"],
        min: [0, "O valor não pode ser negativo"]
    },
    data_limite_confirmacao: {
        type: Date,
        required: [true, "O campo data limite de confirmação é obrigatório"]
    },
    hora_limite_confirmacao: {
        type: String,
        required: [true, "O campo hora limite de confirmação é obrigatório"],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Informe uma hora válida no formato HH:MM"]
    },
    observacoes: {
        type: String,
        required: false,
        maxlength: [500, "O campo observações deve ter no máximo 500 caracteres"],
        default: ""
    },
    confirmados: {
        type: Array,
        default: []
    },
    gols_time_1: {
        type: Number,
        default: 0
    },
    gols_time_2: {
        type: Number,
        default: 0
    },
    time_vencedor: {
        type: String,
        default: 0
    },
    finalizado: {
        type: Boolean,
        default: false
    },
    id_usuario_criador: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const Eventos = mongoose.model("Eventos", eventoSchema);
