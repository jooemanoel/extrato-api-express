// api/controllers/fatura.controller.js

import * as faturaService from '../services/fatura.service.js';

export const listar = async (req, res) => {
  try {
    const fatura = await faturaService.listar();
    res.json(fatura);
  } catch (err) {
    console.error('Erro ao buscar faturas:', err);
    res.status(500).json({ erro: 'Erro ao buscar faturas.', detalhes: err.message });
  }
};
