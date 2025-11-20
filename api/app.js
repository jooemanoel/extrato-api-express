// api/app.js

import cors from "cors";
import "dotenv/config";
import express from "express";
import rootRoutes from "./modules/root/root.routes.js";
import compraRoutes from "./modules/compras/compra.routes.js";
import faturaRoutes from "./modules/fatura/fatura.routes.js";
import usuarioRoutes from "./modules/usuario/usuario.routes.js";
import ofxRoutes from "./modules/ofx/ofx.routes.js";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use('/', rootRoutes);
  app.use('/compras', compraRoutes);
  app.use('/faturas', faturaRoutes);
  app.use('/usuario', usuarioRoutes);
  // app.use('/ofx', ofxRoutes);
  return app;
}

const app = createApp();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
