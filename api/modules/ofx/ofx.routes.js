// api/modules/ofx/ofx.routes.js

import express from "express";
import multer from "multer";
import { autenticarJWT } from "../../middleware/autenticar-jwt.js";
import * as ofxService from "./ofx.service.js";

const router = express.Router();

// Multer salva arquivos temporariamente
const upload = multer({ dest: "uploads/" });

router.use(autenticarJWT);

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const codigo_usuario = req.usuario.codigo_usuario;

    if (!req.file) {
      return res.status(400).json({ message: "Arquivo OFX não enviado" });
    }

    const json = await ofxService.parseOfx(req.file.path, codigo_usuario);

    return res.json(json);

  } catch (err) {
    console.error("Erro ao processar OFX:", err);
    return res.status(err.status || 500).json({ message: err.message });
  }
});

export default router;
