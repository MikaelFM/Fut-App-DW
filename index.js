import connectDB from "./config/database.js"
import app from "./app.js"

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
})