// src/models/Produto.js
// Model de Produto. Relaciona-se com Categoria (belongsTo).

import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Categoria from "./Categoria.js";

const Produto = sequelize.define("Produto", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { notEmpty: true },
    comment: "Nome do produto (ex.: Coca-Cola Lata 350ml)."
  },
  preco: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    defaultValue: 0.00,
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
}, {
  tableName: "produtos",
  timestamps: true,
});

// Associação: Produto pertence a uma Categoria (chave estrangeira categoriaId).
Produto.belongsTo(Categoria, {
  foreignKey: { name: "categoriaId", allowNull: false },
  as: "categoria"
});

// Categoria tem muitos Produtos (one-to-many).
Categoria.hasMany(Produto, {
  foreignKey: "categoriaId",
  as: "produtos"
});

export default Produto;
