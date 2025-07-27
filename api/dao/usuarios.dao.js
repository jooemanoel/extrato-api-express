import sql from '../config/db.js';

export const buscarTodos = async () => {
  return await sql`SELECT id_usuario, nome FROM usuarios`;
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