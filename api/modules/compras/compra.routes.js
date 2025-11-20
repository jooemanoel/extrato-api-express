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
    const compras = await compraService.listarPorData(
      codigo_usuario, 
      req.body
    );
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

router.put("/:fitid", async (req, res) => {
  try {
    const fitid = req.params.fitid;
    const compra = await compraService.editar(fitid, req.body);
    res.json(compra);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

router.delete("/:fitid", async (req, res) => {
  try {
    const fitid = req.params.fitid;
    const compra = await compraService.apagar(fitid);
    res.json({ mensagem: "Compra apagada com sucesso", compra });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

export default router;
