// src/routes/produtoRoutes.js
// Define rotas REST para produtos.

import { Router } from "express";
import { listar, obter, criar, atualizar, remover } from "../controllers/produtoController.js";

const router = Router();

router.get("/", listar);
router.get("/:id", obter);
router.post("/", criar);
router.put("/:id", atualizar);
router.delete("/:id", remover);

export default router;
