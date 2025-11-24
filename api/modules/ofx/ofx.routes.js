import express from "express";
import multer from "multer";
import { autenticarJWT } from "../../middleware/autenticar-jwt.js";
import * as ofxService from "./ofx.service.js";

const router = express.Router();
router.use(autenticarJWT);

// armazenamento em memória — compatível com serverless
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const codigo_usuario = req.usuario.codigo_usuario;
    const codigo_fatura = req.body.codigo_fatura;  // <-- chegou aqui

    if (!req.file) {
      return res.status(400).json({ message: "Arquivo OFX não enviado" });
    }

    // Agora enviamos o buffer em vez do caminho
    const json = await ofxService.parseOfxBuffer(
      req.file.buffer,
      codigo_usuario,
      codigo_fatura
    );

    return res.json(json);

  } catch (err) {
    console.error("Erro ao processar OFX:", err);
    return res.status(err.status || 500).json({ message: err.message });
  }
});

export default router;
