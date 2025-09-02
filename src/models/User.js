// src/models/User.js
// Modelo básico de User para futura autenticação (JWT/Session).
// Aqui apenas declaramos a estrutura, sem rotas de auth.

import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
}, {
  tableName: "users",
  timestamps: true,
});

export default User;
