// api/modules/fatura/fatura.routes.js

import express from "express";
import { autenticarJWT } from "../../middleware/autenticar-jwt.js";
import * as faturaService from "./fatura.service.js";

const router = express.Router();
router.use(autenticarJWT);

router.get("/", async (req, res) => {
  try {
    const codigo_usuario = req.usuario.codigo_usuario;
    const fatura = await faturaService.listar(codigo_usuario);
    res.json(fatura);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const codigo_usuario = req.usuario.codigo_usuario;
    const fatura = await faturaService.inserir({
      ...req.body,
      codigo_usuario,
    });
    res.status(201).json(fatura);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

router.put("/:codigo_fatura", async (req, res) => {
  try {
    const codigo_fatura = parseInt(req.params.codigo_fatura, 10);
    const fatura = await faturaService.editar(codigo_fatura, req.body);
    res.json(fatura);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

router.delete("/:codigo_fatura", async (req, res) => {
  try {
    const codigo_fatura = parseInt(req.params.codigo_fatura, 10);
    const fatura = await faturaService.apagar(codigo_fatura);
    res.json({ mensagem: "fatura apagada com sucesso", fatura: fatura });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

export default router;
