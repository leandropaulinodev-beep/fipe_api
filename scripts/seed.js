// scripts/seed.js
// Cria alguns registros iniciais para facilitar os testes.

import sequelize from "../src/database.js";
import "../src/models/index.js";
import Categoria from "../src/models/Categoria.js";
import Produto from "../src/models/Produto.js";
import Cliente from "../src/models/Cliente.js";
import Endereco from "../src/models/Endereco.js";

(async () => {
  try {
    await sequelize.sync({ alter: true });

    const cat = await Categoria.create({ nome: "Bebidas" });
    const prod = await Produto.create({ nome: "Coca-Cola Lata 350ml", preco: 4.99, estoque: 100, categoriaId: cat.id });
    const cli = await Cliente.create({ nome: "Leandro Paulino", email: "leandro@test.com", telefone: "11 99999-9999" });
    await Endereco.create({ clienteId: cli.id, rua: "Rua Exemplo", numero: "123", cidade: "São Paulo", estado: "SP", cep: "01000-000" });

    console.log("Seed concluído com sucesso.");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
