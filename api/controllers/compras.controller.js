// api/controllers/compras.controller.js

import * as comprasService from '../services/compras.service.js';

export const listar = async (req, res) => {
  try {
    const compras = await comprasService.listarTodos();
    res.json(compras);
  } catch (err) {
    console.error('Erro ao buscar compras:', err);
    res.status(500).json({ erro: 'Erro ao buscar compras.', detalhes: err.message });
  }
};
