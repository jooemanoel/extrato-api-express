// api/routes/usuarios.routes.js

import express from 'express';
import * as usuariosController from '../controllers/usuarios.controller.js';

const router = express.Router();

router.get('/', usuariosController.listarUsuarios);
router.post('/', usuariosController.criarUsuario);
router.delete('/:id', usuariosController.deletarUsuario);

export default router;
