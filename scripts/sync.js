// scripts/sync.js
// Script opcional para sincronizar DB manualmente via npm run sync:db

import sequelize from "../src/database.js";
import "../src/models/index.js";

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Sincronização concluída.");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
