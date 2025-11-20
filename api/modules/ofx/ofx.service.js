// api/modules/ofx/ofx.service.js

import fs from "fs/promises";
import { parse } from "ofx-js";
import * as compraDAO from "../compras/compra.dao.js";

/**
 * Converte data OFX (ex: 20250120120000[-3]) para YYYY-MM-DD
 */
function formatarData(dt) {
  // Remove timezone ou sufixos ex: [-3]
  const clean = dt.replace(/[\[\]-].*$/, "");
  const ano = clean.substring(0, 4);
  const mes = clean.substring(4, 6);
  const dia = clean.substring(6, 8);
  return `${ano}-${mes}-${dia}`;
}

/**
 * Converte TRNAMT (string float) para inteiro em centavos
 */
function valorParaCentavos(valor) {
  return Math.round(parseFloat(valor) * 100);
}

/**
 * Lê e processa um arquivo OFX, salvando compras no banco.
 */
export async function parseOfx(filePath, codigo_usuario) {
  try {
    const text = await fs.readFile(filePath, "utf8");

    // Parse do OFX pelo parser oficial
    const parsed = await parse(text);

    const lista =
      parsed?.OFX?.CREDITCARDMSGSRSV1?.CCSTMTTRNRS?.CCSTMTRS?.BANKTRANLIST?.STMTTRN || [];

    if (!Array.isArray(lista)) {
      return {
        codigo_usuario,
        total_transacoes: 0,
        inseridas: 0,
        ja_existiam: 0,
        inseridas_lista: []
      };
    }

    let inseridas = 0;
    let jaExistiam = 0;
    const inseridasLista = [];

    for (const item of lista) {
      const fitid = item.FITID;
      const trntype = item.TRNTYPE || "OTHER";
      const descricao = item.MEMO || "Sem descrição";
      const data = formatarData(item.DTPOSTED);
      const valor = valorParaCentavos(item.TRNAMT);

      const compra = await compraDAO.inserir({
        fitid,
        trntype,
        descricao_compra: descricao,
        data_compra: data,
        valor_compra: valor,
        codigo_categoria_compra: null, // usuário categoriza depois
        codigo_usuario
      });

      if (compra) {
        inseridas++;
        inseridasLista.push({
          fitid,
          trntype,
          descricao,
          data,
          valor
        });
      } else {
        jaExistiam++;
      }
    }

    return {
      codigo_usuario,
      total_transacoes: lista.length,
      inseridas,
      ja_existiam: jaExistiam,
      inseridas_lista: inseridasLista
    };

  } finally {
    // Remove arquivo temporário mesmo em caso de erro
    fs.unlink(filePath).catch(() => {});
  }
}
