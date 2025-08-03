// api/services/compras.service.js

import * as comprasDAO from "../dao/compras.dao.js";

export const listar = (codigo_usuario) => {
  return comprasDAO.listar(codigo_usuario);
};

export const inserir = ({
  descricao_compra,
  data_compra,
  valor_compra,
  codigo_categoria_compra,
  codigo_usuario
}) => {
  if (!descricao_compra || !data_compra || !valor_compra) {
    throw new Error("Campos obrigatórios não informados");
  }
  return comprasDAO.inserir({
    descricao_compra,
    data_compra,
    valor_compra,
    codigo_categoria_compra,
    codigo_usuario
  });
};

export const apagar = async (codigo_compra) => {
  const compra = await comprasDAO.apagar(codigo_compra);
  if (!compra) {
    const error = new Error("Compra não encontrada");
    error.status = 404;
    throw error;
  }
  return compra;
};

export const editar = async (codigo_compra, dados) => {
  const {
    descricao_compra,
    data_compra,
    valor_compra,
    codigo_categoria_compra,
  } = dados;
  if (!descricao_compra || !data_compra || !valor_compra) {
    throw new Error("Campos obrigatórios não informados");
  }
  const compra = await comprasDAO.editar(codigo_compra, {
    descricao_compra,
    data_compra,
    valor_compra,
    codigo_categoria_compra,
  });
  if (!compra) {
    const error = new Error("Compra não encontrada");
    error.status = 404;
    throw error;
  }
  return compra;
};
