// api/modules/compras/compras.service.js

import * as compraDAO from "./compra.dao.js";

export const listar = (codigo_usuario) => {
  return compraDAO.listar(codigo_usuario);
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
  return compraDAO.inserir({
    descricao_compra,
    data_compra,
    valor_compra,
    codigo_categoria_compra,
    codigo_usuario
  });
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
  const compra = await compraDAO.editar(codigo_compra, {
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

export const apagar = async (codigo_compra) => {
  const compra = await compraDAO.apagar(codigo_compra);
  if (!compra) {
    const error = new Error("Compra não encontrada");
    error.status = 404;
    throw error;
  }
  return compra;
};
