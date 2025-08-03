// api/modules/fatura/fatura.service.js

import * as faturaDAO from "./fatura.dao.js";

export const listar = (codigo_usuario) => {
  return faturaDAO.listar(codigo_usuario);
};

export const inserir = ({
  nome_fatura,
  data_abertura_fatura,
  data_fechamento_fatura,
  codigo_usuario,
}) => {
  if (!nome_fatura || !data_abertura_fatura || !data_fechamento_fatura) {
    throw new Error("Campos obrigatórios não informados");
  }
  return faturaDAO.inserir({
    nome_fatura,
    data_abertura_fatura,
    data_fechamento_fatura,
    codigo_usuario,
  });
};

export const editar = async (codigo_fatura, dados) => {
  const {
    nome_fatura,
    data_abertura_fatura,
    data_fechamento_fatura
  } = dados;
  if (!nome_fatura || !data_abertura_fatura || !data_fechamento_fatura) {
    throw new Error("Campos obrigatórios não informados");
  }
  const fatura = await faturaDAO.editar(codigo_fatura, {
    nome_fatura,
    data_abertura_fatura,
    data_fechamento_fatura
  });
  if (!fatura) {
    const error = new Error("Fatura não encontrada");
    error.status = 404;
    throw error;
  }
  return fatura;
};

export const apagar = async (codigo_fatura) => {
  const fatura = await faturaDAO.apagar(codigo_fatura);
  if (!fatura) {
    const error = new Error("Fatura não encontrada");
    error.status = 404;
    throw error;
  }
  return fatura;
};
