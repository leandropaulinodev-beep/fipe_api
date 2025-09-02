// src/routes/clienteRoutes.js
// Define rotas REST para clientes.

import { Router } from "express";
import { listar, obter, criar, atualizar, remover } from "../controllers/clienteController.js";

const router = Router();

router.get("/", listar);
router.get("/:id", obter);
router.post("/", criar);
router.put("/:id", atualizar);
router.delete("/:id", remover);

export default router;
