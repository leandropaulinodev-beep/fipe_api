// src/utils/asyncHandler.js
// Helper para capturar erros de funções assíncronas sem repetir try/catch em todo lugar.
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
