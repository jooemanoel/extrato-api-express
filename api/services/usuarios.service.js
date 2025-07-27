// api/services/usuarios.service.js

import * as usuariosDAO from '../dao/usuarios.dao.js';

export const listarTodos = () => {
  return usuariosDAO.buscarTodos();
};

export const criar = ({ nome, senha }) => {
  if (!nome || !senha) {
    throw new Error('Nome e senha são obrigatórios.');
  }
  return usuariosDAO.inserir({ nome, senha });
};

export const deletarPorId = async (id_usuario) => {
  const usuarioDeletado = await usuariosDAO.apagarPorId(id_usuario);
  if (!usuarioDeletado) {
    const error = new Error('Usuário não encontrado');
    error.status = 404;
    throw error;
  }
  return usuarioDeletado;
};