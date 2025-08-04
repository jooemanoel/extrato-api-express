// api/modules/compras/compras.routes.js

import express from "express";
import { autenticarJWT } from "../../middleware/autenticar-jwt.js";
import * as compraService from "./compra.service.js";

const router = express.Router();
router.use(autenticarJWT);

router.get("/", async (req, res) => {
  try {
    const codigo_usuario = req.usuario.codigo_usuario;
    const compras = await compraService.listar(codigo_usuario);
    res.json(compras);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

router.post("/por-data", async (req, res) => {
  try {
    const codigo_usuario = req.usuario.codigo_usuario;
    const compras = await compraService.listarPorData(codigo_usuario, req.body);
    res.json(compras);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const codigo_usuario = req.usuario.codigo_usuario;
    const compra = await compraService.inserir({
      ...req.body,
      codigo_usuario,
    });
    res.status(201).json(compra);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

router.put("/:codigo_compra", async (req, res) => {
  try {
    const codigo_compra = parseInt(req.params.codigo_compra, 10);
    const compra = await compraService.editar(codigo_compra, req.body);
    res.json(compra);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

router.delete("/:codigo_compra", async (req, res) => {
  try {
    const codigo_compra = parseInt(req.params.codigo_compra, 10);
    const compra = await compraService.apagar(codigo_compra);
    res.json({ mensagem: "Compra apagada com sucesso", compra: compra });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

export default router;
