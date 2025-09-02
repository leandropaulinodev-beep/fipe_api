// src/server.js
// Ponto de entrada da aplicação Express. Configura middlewares e rotas.
// Também garante que o banco esteja "syncado" ao subir (cria tabelas se não existirem).

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import sequelize from "./database.js";
import "./models/index.js"; // importa models e associações
import router from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(helmet());          // segurança básica
app.use(cors());            // habilita CORS
app.use(morgan("dev"));     // logs de requisições
app.use(express.json());    // parse de JSON no body

// Rotas da API
app.use("/api", router);

// 404 e error handler
app.use(notFound);
app.use(errorHandler);

// Função para iniciar servidor
async function start() {
  try {
    // Sincroniza modelos com o banco (não apaga nada). Altere para { force: true } para recriar tabelas.
    await sequelize.sync({ alter: true });
    console.log("Banco sincronizado com sucesso ✅");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT} 🚀`);
    });
  } catch (err) {
    console.error("Falha ao conectar/sincronizar DB:", err);
    process.exit(1);
  }
}

start();
