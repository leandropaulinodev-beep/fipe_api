// src/controllers/categoriaController.js
// Controller de categorias: CRUD básico com Sequelize.

import { asyncHandler } from "../utils/asyncHandler.js";
import Categoria from "../models/Categoria.js";

export const listar = asyncHandler(async (req, res) => {
  const categorias = await Categoria.findAll({ order: [["id", "ASC"]] });
  res.json(categorias);
});

export const obter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findByPk(id);
  if (!categoria) return res.status(404).json({ message: "Categoria não encontrada" });
  res.json(categoria);
});

export const criar = asyncHandler(async (req, res) => {
  const { nome } = req.body;
  const nova = await Categoria.create({ nome });
  res.status(201).json(nova);
});

export const atualizar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const categoria = await Categoria.findByPk(id);
  if (!categoria) return res.status(404).json({ message: "Categoria não encontrada" });
  categoria.nome = nome ?? categoria.nome;
  await categoria.save();
  res.json(categoria);
});

export const remover = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findByPk(id);
  if (!categoria) return res.status(404).json({ message: "Categoria não encontrada" });
  await categoria.destroy();
  res.status(204).send();
});
