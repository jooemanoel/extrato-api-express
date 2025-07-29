import sql from "../config/db.js";

export const listar = async () => {
  return await sql`SELECT codigo_compra, descricao_compra, timestamp_compra, valor_compra, codigo_categoria_compra FROM public.compra;`;
};

export const inserir = async ({
  descricao_compra,
  timestamp_compra,
  valor_compra,
  codigo_categoria_compra,
}) => {
  const [compra] = await sql`
    INSERT INTO public.compra
      (descricao_compra, timestamp_compra, valor_compra, codigo_categoria_compra)
    VALUES (
      ${descricao_compra},
      ${timestamp_compra},
      ${valor_compra},
      ${codigo_categoria_compra}
    )
    RETURNING codigo_compra;
  `;
  return compra;
};

export const apagar = async (codigo_compra) => {
  const [compra] = await sql`
    DELETE FROM compra
    WHERE codigo_compra = ${codigo_compra}
    RETURNING codigo_compra, descricao_compra`;
  return compra; // pode ser undefined se não existir
};

export const buscar = async (codigo_compra) => {
  const [compra] = await sql`
    SELECT codigo_compra, descricao_compra, timestamp_compra, valor_compra, codigo_categoria_compra
    FROM public.compra
    WHERE codigo_compra = ${codigo_compra};
  `;
  return compra; // pode ser undefined
};

export const editar = async (codigo_compra, {
  descricao_compra,
  timestamp_compra,
  valor_compra,
  codigo_categoria_compra,
}) => {
  const [compra] = await sql`
    UPDATE public.compra
    SET descricao_compra = ${descricao_compra},
        timestamp_compra = ${timestamp_compra},
        valor_compra = ${valor_compra},
        codigo_categoria_compra = ${codigo_categoria_compra}
    WHERE codigo_compra = ${codigo_compra}
    RETURNING codigo_compra, descricao_compra, timestamp_compra, valor_compra, codigo_categoria_compra;
  `;
  return compra; // pode ser undefined se não existir
};
