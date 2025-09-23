    import mongoose from "mongoose";
    import bcrypt from "bcrypt";

    const usuarioSchema = new mongoose.Schema({
        nome: {
            type: String,
            required: [true, "O campo nome é obrigatório"],
            maxlength: [50, "O campo nome deve ter no máximo 50 caracteres"]
        },
        sobrenome: {
            type: String,
            required: [true, "O campo sobrenome é obrigatório"],
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
        },
        dividas: {
            type: Array,
            default: []
        },
        total_dividas: {
            type: Number,
            default: 0
        },
        jogos: {
            type: Number,
            default: 0
        },
        vitorias: {
            type: Number,
            default: 0
        },
        empates: {
            type: Number,
            default: 0
        },
        derrotas: {
            type: Number,
            default: 0
        },
        ultimos_resultados: {
            type: Array,
            default: []
        },

    }, { timestamps: true });

    usuarioSchema.pre("save", async function (next) {
        if (!this.isModified("senha")) return next();

        try {
            const salt = await bcrypt.genSalt(10);
            this.senha = await bcrypt.hash(this.senha, salt);
            next();
        } catch (err) {
            next(err);
        }
    });

    export const Usuarios = mongoose.model("Usuarios", usuarioSchema);