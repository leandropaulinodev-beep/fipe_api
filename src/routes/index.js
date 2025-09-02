// src/routes/index.js
// Agrega as rotas da API. Fica fácil plugar novas áreas (auth, pedidos, etc.).

import { Router } from "express";
import produtoRoutes from "./produtoRoutes.js";
import categoriaRoutes from "./categoriaRoutes.js";
import clienteRoutes from "./clienteRoutes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ status: "ok", message: "API Estoque Node ativa 🚀" });
});

router.use("/produtos", produtoRoutes);
router.use("/categorias", categoriaRoutes);
router.use("/clientes", clienteRoutes);

export default router;
