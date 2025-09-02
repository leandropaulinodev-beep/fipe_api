// src/models/index.js
// Reúne todos os models. Importar este arquivo garante que as associações sejam carregadas.

import "./Categoria.js";
import "./Produto.js";
import "./Cliente.js";
import "./Endereco.js";
import "./User.js";

// Não exportamos nada porque as instâncias estão registradas no Sequelize por import side-effects.
