// api/controllers/compras.controller.js

import * as comprasService from '../services/compras.service.js';

export const listar = async (req, res) => {
  try {
    const compras = await comprasService.listar();
    res.json(compras);
  } catch (err) {
    console.error('Erro ao buscar compras:', err);
    res.status(500).json({ erro: 'Erro ao buscar compras.', detalhes: err.message });
  }
};

export const inserir = async (req, res) => {
  try {
    const compra = await comprasService.inserir(req.body);
    res.status(201).json(compra);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao inserir compra.' });
  }
};

export const apagar = async (req, res) => {
  const codigo_compra = parseInt(req.params.id, 10);
  if (isNaN(codigo_compra)) {
    return res.status(400).json({ erro: 'Código Inválido' });
  }
  try {
    const compra = await comprasService.apagar(codigo_compra);
    res.json({ mensagem: 'Compra apagada com sucesso', compra: compra });
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ erro: err.message });
    } else {
      console.error('Erro ao apagar compra:', err);
      res.status(500).json({ erro: 'Erro ao apagar compra.' });
    }
  }
};

export const buscar = async (req, res) => {
  const codigo_compra = parseInt(req.params.id, 10);
  if (isNaN(codigo_compra)) {
    return res.status(400).json({ erro: 'Código inválido' });
  }

  try {
    const compra = await comprasService.buscar(codigo_compra);
    if (!compra) {
      return res.status(404).json({ erro: 'Compra não encontrada' });
    }
    res.json(compra);
  } catch (err) {
    console.error('Erro ao buscar compra:', err);
    res.status(500).json({ erro: 'Erro ao buscar compra.' });
  }
};

export const editar = async (req, res) => {
  const codigo_compra = parseInt(req.params.id, 10);
  if (isNaN(codigo_compra)) {
    return res.status(400).json({ erro: 'Código inválido' });
  }

  try {
    const compra = await comprasService.editar(codigo_compra, req.body);
    res.json(compra);
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ erro: err.message });
    } else {
      console.error('Erro ao editar compra:', err);
      res.status(500).json({ erro: 'Erro ao editar compra.' });
    }
  }
};
