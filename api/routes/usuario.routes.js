// api/routes/usuario.routes.js

import express from 'express';
import * as usuarioController from '../controllers/usuario.controller.js';
import { autenticarJWT } from '../services/autenticar-jwt.service.js';

const router = express.Router();

router.post('/cadastro', usuarioController.inserir);
router.post('/login', usuarioController.login);
router.get('/perfil', autenticarJWT, usuarioController.obterPerfil);

export default router;
