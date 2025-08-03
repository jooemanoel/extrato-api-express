// api/modules/compras/compras.dao.js

import sql from "../../config/db.js";

export const listar = async (codigo_usuario) => {
  return await sql`
    SELECT codigo_compra, descricao_compra, data_compra, valor_compra, codigo_categoria_compra 
    FROM public.compra 
    WHERE codigo_usuario = ${codigo_usuario} 
    ORDER BY data_compra DESC, descricao_compra DESC;`;
};

export const inserir = async ({
  descricao_compra,
  data_compra,
  valor_compra,
  codigo_categoria_compra,
  codigo_usuario
}) => {
  const [compra] = await sql`
    INSERT INTO public.compra
      (descricao_compra, data_compra, valor_compra, codigo_categoria_compra, codigo_usuario)
    VALUES (
      ${descricao_compra},
      ${data_compra},
      ${valor_compra},
      ${codigo_categoria_compra},
      ${codigo_usuario}
    )
    RETURNING codigo_compra;
  `;
  return compra;
};

export const editar = async (codigo_compra, {
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
    WHERE codigo_compra = ${codigo_compra}
    RETURNING codigo_compra, descricao_compra, data_compra, valor_compra, codigo_categoria_compra;
  `;
  return compra;
};

export const apagar = async (codigo_compra) => {
  const [compra] = await sql`
    DELETE FROM compra
    WHERE codigo_compra = ${codigo_compra}
    RETURNING codigo_compra, descricao_compra`;
  return compra;
};
