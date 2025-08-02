// api/dao/usuario.dao.js

import sql from "../config/db.js";

export const inserir = async ({ nome_usuario, senha_usuario }) => {
  const [usuario] = await sql`
    INSERT INTO public.usuario 
    (nome_usuario, senha_usuario) 
    VALUES(${nome_usuario}, ${senha_usuario}) 
    RETURNING codigo_usuario;
    `;
  return usuario;
};

export const login = async (nome_usuario) => {
  const [usuario] = await sql`
    SELECT codigo_usuario, nome_usuario, senha_usuario 
    FROM public.usuario 
    WHERE nome_usuario = ${nome_usuario};
    `;
  return usuario; // pode ser undefined
};
