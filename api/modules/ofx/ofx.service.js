import { parse } from "ofx-js";
import * as compraDAO from "../compras/compra.dao.js";

function formatarData(dt) {
  const clean = dt.replace(/[\[\]-].*$/, "");
  return `${clean.substring(0, 4)}-${clean.substring(4,6)}-${clean.substring(6,8)}`;
}

function valorParaCentavos(valor) {
  return Math.round(parseFloat(valor) * 100);
}

export async function parseOfxBuffer(buffer, codigo_usuario, codigo_fatura) {
  const text = buffer.toString("utf8");

  const parsed = await parse(text);

  const lista =
    parsed?.OFX?.CREDITCARDMSGSRSV1?.CCSTMTTRNRS?.CCSTMTRS?.BANKTRANLIST?.STMTTRN || [];

  let inseridas = 0;
  let jaExistiam = 0;
  const inseridasLista = [];

  for (const item of lista) {
    const compra = await compraDAO.inserir({
      fitid: item.FITID,
      trntype: item.TRNTYPE || "OTHER",
      descricao_compra: item.MEMO || "Sem descrição",
      data_compra: formatarData(item.DTPOSTED),
      valor_compra: valorParaCentavos(item.TRNAMT),
      codigo_categoria_compra: null,
      codigo_usuario,
      codigo_fatura,   // <-- agora salva com a fatura
    });

    if (compra) {
      inseridas++;
      inseridasLista.push(compra);
    } else {
      jaExistiam++;
    }
  }

  return {
    codigo_usuario,
    codigo_fatura,
    total_transacoes: lista.length,
    inseridas,
    ja_existiam: jaExistiam,
    inseridas_lista: inseridasLista
  };
}
