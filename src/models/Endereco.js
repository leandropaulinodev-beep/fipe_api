// src/models/Endereco.js
// Model de Endereco. Associação 1:1 com Cliente (Cliente.hasOne Endereco).

import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Cliente from "./Cliente.js";

const Endereco = sequelize.define("Endereco", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  rua: { type: DataTypes.STRING(150), allowNull: false },
  numero: { type: DataTypes.STRING(30), allowNull: false },
  bairro: { type: DataTypes.STRING(100), allowNull: true },
  cidade: { type: DataTypes.STRING(100), allowNull: false },
  estado: { type: DataTypes.STRING(2), allowNull: false, comment: "UF, ex.: SP" },
  cep: { type: DataTypes.STRING(20), allowNull: true },
}, {
  tableName: "enderecos",
  timestamps: true,
});

// Associações 1:1
Cliente.hasOne(Endereco, {
  foreignKey: { name: "clienteId", allowNull: false, unique: true },
  as: "endereco",
  onDelete: "CASCADE"
});

Endereco.belongsTo(Cliente, {
  foreignKey: { name: "clienteId", allowNull: false },
  as: "cliente"
});

export default Endereco;
