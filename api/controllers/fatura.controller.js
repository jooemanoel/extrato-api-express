// api/controllers/fatura.controller.js

import * as faturaService from '../services/fatura.service.js';

export const listar = async (req, res) => {
  try {
    const fatura = await faturaService.listar();
    res.json(fatura);
  } catch (err) {
    console.log('Erro ao buscar faturas:', err);
    res.status(500).json({ message: 'Erro ao buscar faturas.', detalhes: err.message });
  }
};
