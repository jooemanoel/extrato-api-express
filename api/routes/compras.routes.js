// api/routes/compras.routes.js

import express from 'express';
import * as comprasController from '../controllers/compras.controller.js';

const router = express.Router();

router.get('/', comprasController.listar);

export default router;
