// api/services/compras.service.js

import * as comprasDAO from '../dao/compras.dao.js';

export const listarTodos = () => {
  return comprasDAO.buscarTodos();
};

export const criar = ({ nome, senha }) => {
  if (!nome || !senha) {
    throw new Error('Nome e senha são obrigatórios.');
  }
  return comprasDAO.inserir({ nome, senha });
};

export const deletarPorId = async (id_usuario) => {
  const usuarioDeletado = await comprasDAO.apagarPorId(id_usuario);
  if (!usuarioDeletado) {
    const error = new Error('Usuário não encontrado');
    error.status = 404;
    throw error;
  }
  return usuarioDeletado;
};