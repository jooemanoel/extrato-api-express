// api/controllers/usuario.controller.js

import * as usuarioService from '../services/usuario.service.js';

export const inserir = async (req, res) => {
  try {
    const usuario = await usuarioService.inserir(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, usuario } = await usuarioService.login(req.body);
    res.status(202).json({ token, usuario });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const obterPerfil = (req, res) => {
  res.json(req.usuario);
};