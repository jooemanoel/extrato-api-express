// api/modules/usuario/usuario.routes.js

import express from 'express';
import { autenticarJWT } from '../../middleware/autenticar-jwt.js';
import * as usuarioService from './usuario.service.js';

const router = express.Router();

router.post('/cadastro', async (req, res) => {
  try {
    const usuario = await usuarioService.inserir(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { token, usuario } = await usuarioService.login(req.body);
    res.status(202).json({ token, usuario });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});
router.get('/perfil', autenticarJWT, (req, res) => {
  res.json(req.usuario);
});

export default router;
