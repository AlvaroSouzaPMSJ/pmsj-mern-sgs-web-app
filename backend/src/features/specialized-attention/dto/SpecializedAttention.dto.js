// backend/src/features/specialized-attention/dto/specializedAttention.dto.js
// =============================================================================
// DTO — Atenção Especializada
//
// toDocument : request body → persistence object. Whitelists only the indicator
//              keys defined for the selected unidade (anti-mass-assignment).
//              Coerces all values to Number; 'tempo' inputs already arrive in minutes.
// toResponse : Mongoose doc → API response shape (+ computed unidadeLabel, statusLabel).
//
// Following: SWEBOK v4 §3 — DTO pattern; OWASP API3:2023 — property-level whitelist.
// =============================================================================

import { INDICADOR_KEYS, UNIDADE_LABELS, STATUS_LABELS, UNIDADE_KEYS } from '../constants/specializedAttention.constants.js';

const toNumberOrNull = (v) => {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(String(v).replace(/[^\d.,-]/g, '').replace(',', '.'));
  return isNaN(n) ? null : n;
};

// ─── Input: request body → document ───────────────────────────────────────────

/**
 * @param {object} body - req.body ({ unidade, mes, ano, valores })
 * @returns {object} persistence-ready plain object
 */
export const toDocument = (body) => {
  if (!body) return {};

  const unidade = typeof body.unidade === 'string' ? body.unidade.trim() : body.unidade;
  const allowedKeys = INDICADOR_KEYS[unidade] ?? [];

  // Whitelist: only keep indicator keys valid for this unidade.
  const incoming = body.valores?.[unidade] ?? {};
  const valoresUnidade = Object.fromEntries(
    allowedKeys.map((key) => [key, toNumberOrNull(incoming[key])]),
  );

  return {
    unidade,
    mes: typeof body.mes === 'string' ? body.mes.trim() : body.mes,
    ano: body.ano ? Number(body.ano) : new Date().getFullYear(),
    valores: { [unidade]: valoresUnidade },
  };
};

// ─── Output: document → API response ──────────────────────────────────────────

/**
 * @param {object} doc - Mongoose lean document
 * @param {{ includeAudit?: boolean }} options
 * @returns {object|null}
 */
export const toResponse = (doc, options = { includeAudit: false }) => {
  if (!doc) return null;

  const plain = doc.toObject ? doc.toObject({ virtuals: true }) : { ...doc };

  delete plain.__v;
  if (!options.includeAudit) {
    delete plain.auditTrail;
    delete plain.createdBy;
    delete plain.updatedBy;
  }

  plain.unidadeLabel = UNIDADE_LABELS[plain.unidade] ?? plain.unidade;
  plain.statusLabel  = STATUS_LABELS[plain.status]   ?? plain.status;

  return plain;
};

export const toResponseList = (docs, options = {}) => {
  if (!Array.isArray(docs)) return [];
  return docs.map((doc) => toResponse(doc, options));
};