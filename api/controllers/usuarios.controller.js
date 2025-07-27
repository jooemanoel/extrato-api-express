// api/controllers/usuarios.controller.js

import * as usuariosService from '../services/usuarios.service.js';

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosService.listarTodos();
    res.json(usuarios);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ erro: 'Erro ao buscar usuários.', detalhes: err.message });
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const novoUsuario = await usuariosService.criar(req.body);
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário.' });
  }
};

export const deletarUsuario = async (req, res) => {
  const id_usuario = parseInt(req.params.id, 10);
  if (isNaN(id_usuario)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }
  try {
    const usuarioDeletado = await usuariosService.deletarPorId(id_usuario);
    res.json({ mensagem: 'Usuário deletado com sucesso', usuario: usuarioDeletado });
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ erro: err.message });
    } else {
      console.error('Erro ao deletar usuário:', err);
      res.status(500).json({ erro: 'Erro ao deletar usuário.' });
    }
  }
};