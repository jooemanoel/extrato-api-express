// api/modules/compras/compras.dao.js

import sql from "../../config/db.js";

export const listar = async (codigo_usuario) => {
  return await sql`
    SELECT fitid, trntype, descricao_compra, data_compra, valor_compra, codigo_categoria_compra
    FROM public.compra
    WHERE codigo_usuario = ${codigo_usuario}
    ORDER BY data_compra DESC, descricao_compra DESC;
  `;
};

export const listarPorData = async (codigo_usuario, data_abertura_fatura, data_fechamento_fatura) => {
  return await sql`
    SELECT fitid, trntype, descricao_compra, data_compra, valor_compra, codigo_categoria_compra
    FROM public.compra
    WHERE codigo_usuario = ${codigo_usuario}
    AND data_compra BETWEEN ${data_abertura_fatura} AND ${data_fechamento_fatura}
    ORDER BY data_compra DESC, descricao_compra DESC;
  `;
};

export const inserir = async ({
  fitid,
  trntype,
  descricao_compra,
  data_compra,
  valor_compra,
  codigo_categoria_compra,
  codigo_usuario
}) => {
  const [compra] = await sql`
    INSERT INTO public.compra
      (fitid, trntype, descricao_compra, data_compra, valor_compra, codigo_categoria_compra, codigo_usuario)
    VALUES (
      ${fitid},
      ${trntype},
      ${descricao_compra},
      ${data_compra},
      ${valor_compra},
      ${codigo_categoria_compra},
      ${codigo_usuario}
    )
    ON CONFLICT (fitid) DO NOTHING
    RETURNING fitid;
  `;
  return compra;
};

export const editar = async (fitid, {
  descricao_compra,
  data_compra,
  valor_compra,
  codigo_categoria_compra,
}) => {
  const [compra] = await sql`
    UPDATE public.compra
    SET descricao_compra = ${descricao_compra},
        data_compra = ${data_compra},
        valor_compra = ${valor_compra},
        codigo_categoria_compra = ${codigo_categoria_compra}
    WHERE fitid = ${fitid}
    RETURNING fitid, trntype, descricao_compra, data_compra, valor_compra, codigo_categoria_compra;
  `;
  return compra;
};

export const apagar = async (fitid) => {
  const [compra] = await sql`
    DELETE FROM public.compra
    WHERE fitid = ${fitid}
    RETURNING fitid, descricao_compra;
  `;
  return compra;
};
