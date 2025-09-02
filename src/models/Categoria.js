// src/models/Categoria.js
// Model simples de Categoria. Equivalente a uma tabela 'categorias'.

import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Categoria = sequelize.define("Categoria", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: {
    type: DataTypes.STRING(120),
    allowNull: false,
    validate: { notEmpty: true },
    comment: "Nome da categoria (ex.: Bebidas, Higiene, etc.)."
  },
}, {
  tableName: "categorias",
  timestamps: true, // cria colunas createdAt/updatedAt automaticamente
});

export default Categoria;
