import sql from '../config/db.js';

export const buscarTodos = async () => {
  return await sql`SELECT codigo_compra, descricao_compra, timestamp_compra, valor, codigo_categoria_compra FROM public.compra;`;
};

export const inserir = async ({ nome, senha }) => {
  const [usuario] = await sql`
    INSERT INTO usuarios (nome, senha)
    VALUES (${nome}, ${senha})
    RETURNING id_usuario, nome`;
  return usuario;
};

export const apagarPorId = async (id_usuario) => {
  const [usuarioDeletado] = await sql`
    DELETE FROM usuarios
    WHERE id_usuario = ${id_usuario}
    RETURNING id_usuario, nome`;
  return usuarioDeletado; // pode ser undefined se não existir
};