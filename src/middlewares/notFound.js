// src/middlewares/notFound.js
// Middleware para rotas não encontradas.

export default function notFound(req, res, next) {
  res.status(404).json({ message: "Rota não encontrada" });
}
