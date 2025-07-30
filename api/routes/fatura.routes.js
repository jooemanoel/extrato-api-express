// api/routes/compras.routes.js

import express from 'express';
import * as faturaController from '../controllers/fatura.controller.js';

const router = express.Router();

router.get('/', faturaController.listar);

export default router;
