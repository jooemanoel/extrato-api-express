// api/services/usuario.service.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as usuarioDAO from "../dao/usuario.dao.js";

export const inserir = async ({ nome_usuario, senha_usuario }) => {
  if (!nome_usuario || !senha_usuario) {
    throw new Error("Campos obrigatórios não informados");
  }
  const senhaCriptografada = await bcrypt.hash(senha_usuario, 10);
  return usuarioDAO.inserir({
    nome_usuario: nome_usuario.toUpperCase(),
    senha_usuario: senhaCriptografada,
  });
};
export const login = async ({ nome_usuario, senha_usuario }) => {
  const usuario = await usuarioDAO.login(nome_usuario.toUpperCase());
  if (!usuario) {
    const error = new Error("Usuário não encontrado");
    error.status = 404;
    throw error;
  }
  const validarSenha = await bcrypt.compare(senha_usuario, usuario.senha_usuario);
  if (!validarSenha) {
    const error = new Error("Senha inválida");
    error.status = 401;
    throw error;
  }
  const payload = {
    codigo_usuario: usuario.codigo_usuario,
    nome_usuario: usuario.nome_usuario,
  };
  // const token = jwt.sign(payload, process.env.JWT_SECRET, {
  //   expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  // });
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return { token, usuario: payload };
};
