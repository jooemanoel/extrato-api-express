// api/modules/fatura/fatura.dao.js

import sql from "../../config/db.js";

export const listar = async (codigo_usuario) => {
  return await sql`
    SELECT codigo_fatura, nome_fatura, data_abertura_fatura, data_fechamento_fatura 
    FROM public.fatura 
    WHERE codigo_usuario = ${codigo_usuario} 
    ORDER BY data_abertura_fatura DESC;`;
};

export const inserir = async ({
  nome_fatura,
  data_abertura_fatura,
  data_fechamento_fatura,
  codigo_usuario
}) => {
  const [fatura] = await sql`
  INSERT INTO public.fatura
  (nome_fatura, data_abertura_fatura, data_fechamento_fatura, codigo_usuario)
  VALUES (
  ${nome_fatura},
  ${data_abertura_fatura},
  ${data_fechamento_fatura},
  ${codigo_usuario}
  ) RETURNING codigo_fatura;`;
  return fatura;
};

export const editar = async (codigo_fatura, {
  nome_fatura,
  data_abertura_fatura,
  data_fechamento_fatura
}) => {
  const [fatura] = await sql`
    UPDATE public.fatura
    SET nome_fatura = ${nome_fatura}, 
    data_abertura_fatura = ${data_abertura_fatura}, 
    data_fechamento_fatura = ${data_fechamento_fatura}
    WHERE codigo_fatura = ${codigo_fatura}
    RETURNING codigo_fatura, nome_fatura, data_abertura_fatura, data_fechamento_fatura;
  `;
  return fatura;
};

export const apagar = async (codigo_fatura) => {
  const [fatura] = await sql`
    DELETE FROM public.fatura
    WHERE codigo_fatura = ${codigo_fatura}
    RETURNING codigo_fatura, nome_fatura`;
  return fatura;
};
