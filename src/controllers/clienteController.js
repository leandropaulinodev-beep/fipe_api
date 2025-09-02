// src/controllers/clienteController.js
// Controller de clientes: CRUD + relação 1:1 com Endereco.

import { asyncHandler } from "../utils/asyncHandler.js";
import Cliente from "../models/Cliente.js";
import Endereco from "../models/Endereco.js";

export const listar = asyncHandler(async (req, res) => {
  const clientes = await Cliente.findAll({
    include: [{ model: Endereco, as: "endereco" }],
    order: [["id", "ASC"]]
  });
  res.json(clientes);
});

export const obter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cliente = await Cliente.findByPk(id, {
    include: [{ model: Endereco, as: "endereco" }]
  });
  if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });
  res.json(cliente);
});

export const criar = asyncHandler(async (req, res) => {
  const { nome, email, telefone, endereco } = req.body;
  const novo = await Cliente.create({ nome, email, telefone });
  if (endereco) {
    await Endereco.create({ ...endereco, clienteId: novo.id });
  }
  const comEndereco = await Cliente.findByPk(novo.id, {
    include: [{ model: Endereco, as: "endereco" }]
  });
  res.status(201).json(comEndereco);
});

export const atualizar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, endereco } = req.body;
  const cliente = await Cliente.findByPk(id, { include: [{ model: Endereco, as: "endereco" }] });
  if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });

  if (nome !== undefined) cliente.nome = nome;
  if (email !== undefined) cliente.email = email;
  if (telefone !== undefined) cliente.telefone = telefone;
  await cliente.save();

  if (endereco) {
    if (cliente.endereco) {
      await cliente.endereco.update(endereco);
    } else {
      await Endereco.create({ ...endereco, clienteId: cliente.id });
    }
  }

  const atualizado = await Cliente.findByPk(cliente.id, {
    include: [{ model: Endereco, as: "endereco" }]
  });
  res.json(atualizado);
});

export const remover = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cliente = await Cliente.findByPk(id);
  if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });
  await cliente.destroy();
  res.status(204).send();
});
