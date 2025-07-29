// api/services/compras.service.js

import * as comprasDAO from "../dao/compras.dao.js";

export const listar = () => {
  return comprasDAO.listar();
};

export const inserir = ({
  descricao_compra,
  timestamp_compra,
  valor_compra,
  codigo_categoria_compra,
}) => {
  if (!descricao_compra || !timestamp_compra || !valor_compra) {
    throw new Error("Campos obrigatórios não informados");
  }
  return comprasDAO.inserir({
    descricao_compra,
    timestamp_compra,
    valor_compra,
    codigo_categoria_compra,
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

export const buscar = async (codigo_compra) => {
  return await comprasDAO.buscar(codigo_compra);
};

export const editar = async (codigo_compra, dados) => {
  const {
    descricao_compra,
    timestamp_compra,
    valor_compra,
    codigo_categoria_compra,
  } = dados;
  if (!descricao_compra || !timestamp_compra || !valor_compra) {
    throw new Error("Campos obrigatórios não informados");
  }
  const compra = await comprasDAO.editar(codigo_compra, {
    descricao_compra,
    timestamp_compra,
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
