// backend/src/features/primary-attention/mappers/primaryAttention.mappers.js
// =============================================================================
// MAPPERS — Atenção Primária
//
// DISTINCTION FROM dto/:
//   dto/      → HTTP boundary ↔ persistence (every request).
//   mappers/  → ANALYTICS-oriented shapes (time series, meta-compliance).
//               Used by the analytics phase (next).
//
// meta is structured { operador, valor }; compliance is evaluated by operator.
//
// Following: SWEBOK v4 §3 — Separation of concerns; ISO 25010 — Maintainability.
// =============================================================================

import { MESES, INDICADORES, INDICADOR_DEF } from '../constants/primaryAttention.constants.js';

/**
 * Reshape monthly documents (one bloco) into a per-indicator 12-month series.
 *
 * @param {object[]} docs  - lean documents for a single bloco
 * @param {string}   bloco - block key
 * @returns {object}
 */
export const toIndicatorSeries = (docs, bloco) => {
  const defs = INDICADORES[bloco] ?? [];
  const byMes = Object.fromEntries((docs ?? []).map((d) => [d.mes, d.valores?.[bloco] ?? {}]));

  const result = {};
  for (const def of defs) {
    result[def.key] = {
      label:         def.label,
      tipo:          def.tipo,
      unidadeMedida: def.unidadeMedida,
      parametro:     def.parametro,
      fonte:         def.fonte,
      meta:          def.meta,
      serie: MESES.map((mes) => ({ mes, valor: byMes[mes]?.[def.key] ?? null })),
    };
  }
  return result;
};

/**
 * Evaluate whether a value meets a structured meta { operador, valor }.
 *
 * @param {number|null} valor
 * @param {{ operador: string, valor: number }|null} metaDef
 * @returns {boolean|null} null when value or meta absent
 */
export const evaluateMeta = (valor, metaDef) => {
  if (valor === null || valor === undefined || !metaDef) return null;
  switch (metaDef.operador) {
    case '>=': return valor >= metaDef.valor;
    case '<=': return valor <= metaDef.valor;
    case '=':  return valor === metaDef.valor;
    default:   return null;
  }
};

/**
 * Per-month meta compliance for a single indicator.
 *
 * @param {object[]} docs
 * @param {string}   bloco
 * @param {string}   indicadorKey
 * @returns {{ mes: string, valor: number|null, meta: object|null, dentroDaMeta: boolean|null }[]}
 */
export const toMetaComparison = (docs, bloco, indicadorKey) => {
  const def = INDICADOR_DEF[`${bloco}.${indicadorKey}`];
  if (!def) return [];
  const byMes = Object.fromEntries((docs ?? []).map((d) => [d.mes, d.valores?.[bloco] ?? {}]));

  return MESES.map((mes) => {
    const valor = byMes[mes]?.[indicadorKey] ?? null;
    return { mes, valor, meta: def.meta, dentroDaMeta: evaluateMeta(valor, def.meta) };
  });
};