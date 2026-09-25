// backend/src/features/specialized-attention/mappers/specializedAttention.mappers.js
// =============================================================================
// MAPPERS — Atenção Especializada
//
// DISTINCTION FROM dto/:
//   dto/      → transforms between the HTTP boundary and the persistence layer
//               (request body ↔ document ↔ API response). Used by every request.
//   mappers/  → transforms documents into ANALYTICS-oriented shapes (time series,
//               actual-vs-meta comparisons). Used by the analytics phase (next).
//
// These are pure functions — no Mongoose, no HTTP. Unit-testable in isolation.
//
// Following: SWEBOK v4 §3 — Separation of concerns; ISO 25010 — Maintainability.
// =============================================================================

import { MESES, INDICADORES, INDICADOR_DEF } from '../constants/specializedAttention.constants.js';

/**
 * Reshape an array of monthly documents (one unidade) into a per-indicator
 * 12-month series, ready for charting.
 *
 * Output:
 *   {
 *     numeroAtendimentos: { label, tipo, unidadeMedida, meta, serie: [{ mes, valor }] },
 *     ...
 *   }
 *
 * @param {object[]} docs    - lean documents for a single unidade
 * @param {string}   unidade - unit key (e.g. 'upa')
 * @returns {object}
 */
export const toIndicatorSeries = (docs, unidade) => {
  const defs = INDICADORES[unidade] ?? [];
  const byMes = Object.fromEntries((docs ?? []).map((d) => [d.mes, d.valores?.[unidade] ?? {}]));

  const result = {};
  for (const def of defs) {
    result[def.key] = {
      label:         def.label,
      tipo:          def.tipo,
      unidadeMedida: def.unidadeMedida,
      meta:          def.meta,
      serie: MESES.map((mes) => ({
        mes,
        valor: byMes[mes]?.[def.key] ?? null,
      })),
    };
  }
  return result;
};

/**
 * For a 'tempo' or 'percentual' indicator with a defined meta, compute
 * per-month compliance (valor within meta).
 *
 * @param {object[]} docs
 * @param {string}   unidade
 * @param {string}   indicadorKey
 * @returns {{ mes: string, valor: number|null, meta: number|null, dentroDaMeta: boolean|null }[]}
 */
export const toMetaComparison = (docs, unidade, indicadorKey) => {
  const def = INDICADOR_DEF[`${unidade}.${indicadorKey}`];
  if (!def) return [];
  const byMes = Object.fromEntries((docs ?? []).map((d) => [d.mes, d.valores?.[unidade] ?? {}]));

  return MESES.map((mes) => {
    const valor = byMes[mes]?.[indicadorKey] ?? null;
    let dentroDaMeta = null;
    if (valor !== null && def.meta !== null) {
      // For 'tempo': lower is better (≤ meta). For 'percentual': context-dependent; default ≤.
      dentroDaMeta = def.tipo === 'tempo' ? valor <= def.meta : valor >= def.meta;
    }
    return { mes, valor, meta: def.meta, dentroDaMeta };
  });
};