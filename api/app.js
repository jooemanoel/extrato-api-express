// api/app.js

import cors from "cors";
import "dotenv/config";
import express from "express";
import rootRoutes from "./routes/root.routes.js";
import comprasRoutes from "./routes/compras.routes.js";
import faturaRoutes from "./routes/fatura.routes.js";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use('/', rootRoutes);
  app.use('/compras', comprasRoutes);
  app.use('/faturas', faturaRoutes);
  return app;
}

const app = createApp();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
