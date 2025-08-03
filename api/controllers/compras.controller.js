// api/controllers/compras.controller.js

import * as comprasService from '../services/compras.service.js';

export const listar = async (req, res) => {
  try {
    const codigo_usuario = req.usuario.codigo_usuario;
    const compras = await comprasService.listar(codigo_usuario);
    res.json(compras);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const inserir = async (req, res) => {
  try {
    const codigo_usuario = req.usuario.codigo_usuario;
    const compra = await comprasService.inserir({...req.body, codigo_usuario});
    res.status(201).json(compra);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const apagar = async (req, res) => {
  try {
    const codigo_compra = parseInt(req.params.id, 10);
    const compra = await comprasService.apagar(codigo_compra);
    res.json({ mensagem: 'Compra apagada com sucesso', compra: compra });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const editar = async (req, res) => {
  try {
    const codigo_compra = parseInt(req.params.id, 10);
    const compra = await comprasService.editar(codigo_compra, req.body);
    res.json(compra);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
