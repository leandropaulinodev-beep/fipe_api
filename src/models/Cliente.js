// src/models/Cliente.js
// Model de Cliente. Terá relação 1:1 com Endereco.

import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Cliente = sequelize.define("Cliente", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  telefone: {
    type: DataTypes.STRING(30),
    allowNull: true,
  }
}, {
  tableName: "clientes",
  timestamps: true,
});

export default Cliente;
