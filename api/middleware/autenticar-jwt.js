// api/services/autenticar-jwt.service.js

import jwt from 'jsonwebtoken';

export const autenticarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { codigo_usuario, nome_usuario } = payload;
    req.usuario = { codigo_usuario, nome_usuario };
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};
