// src/middlewares/errorHandler.js
// Middleware central de erro: qualquer erro que "next(err)" chegará aqui.

export default function errorHandler(err, req, res, next) {
  console.error("[Erro]", err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Erro interno no servidor",
  });
}
