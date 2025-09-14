import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Conectado ao Banco de Dados");
        })
        .catch((err) => {
            console.error('Erro ao conectar ao MongoDB:', err.message);
            process.exit(1);
        })
};

export default connectDB;
