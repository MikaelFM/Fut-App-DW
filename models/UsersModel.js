    import mongoose from "mongoose";

    const usuarioSchema = new mongoose.Schema({
        nome: {
            type: String,
            required: [true, "O campo nome é obrigatório"],
            maxlength: [50, "O campo nome deve ter no máximo 50 caracteres"]
        },
        email: {
            unique: true,
            type: String,
            required: [true, "O campo e-mail é obrigatório"],
            maxlength: [50, "O campo e-mail deve ter no máximo 20 caracteres"],
            match: [/.+\@.+\..+/, "Por favor, informe um e-mail válido"]
        },
        senha: {
            type: String,
            required: [true, "O campo senha é obrigatório"],
            minlength: [8, "O campo senha deve ter ao menos 8 caracteres"],
            maxlength: [20, "O campo senha deve ter no máximo 20 caracteres"],
        },
        gols: {
            type: Number,
            required: false,
            default: 0
        },
        assistencias: {
            type: Number,
            required: false,
            default: 0
        },
        dividas: {
            type: Array,
            default: [
                {
                    data: '10/09/2025',
                    valor: 0.1
                },
                {
                    data: '14/09/2025',
                    valor: 10
                }
            ],
        },
        total_dividas: {
            type: Number,
            default: 10.1
        }
    }, { timestamps: true });

    export const Usuarios = mongoose.model("Usuarios", usuarioSchema);