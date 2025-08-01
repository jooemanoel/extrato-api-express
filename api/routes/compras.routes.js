// api/routes/compras.routes.js

import express from 'express';
import * as comprasController from '../controllers/compras.controller.js';

const router = express.Router();

router.get('/', comprasController.listar);
router.post('/', comprasController.inserir);
router.delete('/:id', comprasController.apagar);
router.get('/:id', comprasController.buscar);
router.put('/:id', comprasController.editar);

export default router;
