// src/controllers/produtoController.js
// Controller de produtos: inclui associação com Categoria.

import { asyncHandler } from "../utils/asyncHandler.js";
import Produto from "../models/Produto.js";
import Categoria from "../models/Categoria.js";

export const listar = asyncHandler(async (req, res) => {
  const produtos = await Produto.findAll({
    include: [{ model: Categoria, as: "categoria" }],
    order: [["id", "ASC"]]
  });
  res.json(produtos);
});

export const obter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const produto = await Produto.findByPk(id, {
    include: [{ model: Categoria, as: "categoria" }]
  });
  if (!produto) return res.status(404).json({ message: "Produto não encontrado" });
  res.json(produto);
});

export const criar = asyncHandler(async (req, res) => {
  const { nome, preco, estoque, categoriaId } = req.body;
  // Opcional: validar se categoria existe
  const cat = await Categoria.findByPk(categoriaId);
  if (!cat) return res.status(422).json({ message: "Categoria inválida" });
  const novo = await Produto.create({ nome, preco, estoque, categoriaId });
  res.status(201).json(novo);
});

export const atualizar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nome, preco, estoque, categoriaId } = req.body;
  const produto = await Produto.findByPk(id);
  if (!produto) return res.status(404).json({ message: "Produto não encontrado" });
  if (categoriaId) {
    const cat = await Categoria.findByPk(categoriaId);
    if (!cat) return res.status(422).json({ message: "Categoria inválida" });
    produto.categoriaId = categoriaId;
  }
  if (nome !== undefined) produto.nome = nome;
  if (preco !== undefined) produto.preco = preco;
  if (estoque !== undefined) produto.estoque = estoque;
  await produto.save();
  res.json(produto);
});

export const remover = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const produto = await Produto.findByPk(id);
  if (!produto) return res.status(404).json({ message: "Produto não encontrado" });
  await produto.destroy();
  res.status(204).send();
});
