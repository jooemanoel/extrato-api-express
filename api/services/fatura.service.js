// api/services/fatura.service.js

import * as faturaDAO from "../dao/fatura.dao.js"

export const listar = () => {
  return faturaDAO.listar();
};
