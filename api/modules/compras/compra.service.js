// api/modules/compras/compras.service.js

import * as compraDAO from "./compra.dao.js";

export const listar = (codigo_usuario) => {
  return compraDAO.listar(codigo_usuario);
};

export const listarPorData = (
  codigo_usuario,
  { data_abertura_fatura, data_fechamento_fatura }
) => {
  if (!data_abertura_fatura || !data_fechamento_fatura) {
    const error = new Error("Campos obrigatórios não informados");
    error.status = 400;
    throw error;
  }
  return compraDAO.listarPorData(
    codigo_usuario,
    data_abertura_fatura,
    data_fechamento_fatura
  );
};

export const listarPorFatura = (codigo_usuario, { codigo_fatura }) => {
  return compraDAO.listarPorFatura(codigo_usuario, codigo_fatura);
};

export const inserir = ({
  fitid,
  trntype,
  descricao_compra,
  data_compra,
  valor_compra,
  codigo_categoria_compra,
  codigo_fatura,
  codigo_usuario,
}) => {
  if (
    !fitid ||
    !trntype ||
    !descricao_compra ||
    !data_compra ||
    !valor_compra
  ) {
    const error = new Error("Campos obrigatórios não informados");
    error.status = 400;
    throw error;
  }

  return compraDAO.inserir({
    fitid,
    trntype,
    descricao_compra,
    data_compra,
    valor_compra,
    codigo_categoria_compra,
    codigo_fatura,
    codigo_usuario,
  });
};

export const inserirEmLote = (codigo_usuario, compras) => {
  compras = compras.map((compra) => ({
    ...compra,
    codigo_usuario,
  }));
  return compraDAO.inserirEmLote(compras);
};

export const editar = async (fitid, dados) => {
  const {
    descricao_compra,
    data_compra,
    valor_compra,
    codigo_categoria_compra,
    codigo_fatura,
  } = dados;

  if (!descricao_compra || !data_compra || !valor_compra) {
    const error = new Error("Campos obrigatórios não informados");
    error.status = 400;
    throw error;
  }

  const compra = await compraDAO.editar(fitid, {
    descricao_compra,
    data_compra,
    valor_compra,
    codigo_categoria_compra,
    codigo_fatura,
  });

  if (!compra) {
    const error = new Error("Compra não encontrada");
    error.status = 404;
    throw error;
  }
  return compra;
};

export const apagar = async (fitid) => {
  const compra = await compraDAO.apagar(fitid);
  console.log("compra.service - apagar", compra);
  if (!compra) {
    const error = new Error("Compra não encontrada");
    error.status = 404;
    throw error;
  }
  return compra;
};

export const apagarPorFatura = async (codigo_fatura) => {
  const compra = await compraDAO.apagarPorFatura(codigo_fatura);
  console.log("compra.service - apagarPorFatura", compra);
  return compra;
};
