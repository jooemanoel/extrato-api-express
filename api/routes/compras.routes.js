// api/routes/compras.routes.js

import express from 'express';
import * as comprasController from '../controllers/compras.controller.js';
import { autenticarJWT } from '../services/autenticar-jwt.service.js';

const router = express.Router();
router.use(autenticarJWT);

router.get('/', comprasController.listar);
router.post('/', comprasController.inserir);
router.delete('/:id', comprasController.apagar);
router.put('/:id', comprasController.editar);

export default router;
