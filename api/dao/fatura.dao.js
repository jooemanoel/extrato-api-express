import sql from "../config/db.js";

export const listar = async () => {
  return await sql`SELECT codigo_fatura, data_abertura_fatura, nome_fatura FROM public.fatura ORDER BY data_abertura_fatura DESC;`;
};
