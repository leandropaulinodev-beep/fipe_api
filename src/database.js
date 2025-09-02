// src/database.js
// Arquivo responsável por criar a conexão Sequelize com MySQL.
// Usa variáveis de ambiente para separar config de código (boa prática).

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const {
  DB_HOST = "localhost",
  DB_PORT = "3306",
  DB_NAME = "api_estoque",
  DB_USER = "root",
  DB_PASS = "root",
  NODE_ENV = "development",
} = process.env;

// Cria a instância do Sequelize.
// dialect = 'mysql' pois estamos usando mysql2.
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "mysql",
  logging: NODE_ENV === "development" ? console.log : false, // log SQL apenas em dev
});

export default sequelize;
