// backend/src/features/primary-attention/dto/primaryAttention.dto.js
// =============================================================================
// DTO — Atenção Primária
//
// toDocument : request body → persistence object. Whitelists only the indicator
//              keys defined for the selected bloco (anti-mass-assignment).
// toResponse : Mongoose doc → API response shape (+ computed blocoLabel, statusLabel).
//
// Following: SWEBOK v4 §3 — DTO pattern; OWASP API3:2023 — property-level whitelist.
// =============================================================================

import { INDICADOR_KEYS, BLOCO_LABELS, STATUS_LABELS } from '../constants/primaryAttention.constants.js';

const toNumberOrNull = (v) => {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(String(v).replace(/[^\d.,-]/g, '').replace(',', '.'));
  return isNaN(n) ? null : n;
};

export const toDocument = (body) => {
  if (!body) return {};

  const bloco = typeof body.bloco === 'string' ? body.bloco.trim() : body.bloco;
  const allowedKeys = INDICADOR_KEYS[bloco] ?? [];
  const incoming = body.valores?.[bloco] ?? {};

  const valoresBloco = Object.fromEntries(
    allowedKeys.map((key) => [key, toNumberOrNull(incoming[key])]),
  );

  return {
    bloco,
    mes: typeof body.mes === 'string' ? body.mes.trim() : body.mes,
    ano: body.ano ? Number(body.ano) : new Date().getFullYear(),
    valores: { [bloco]: valoresBloco },
  };
};

export const toResponse = (doc, options = { includeAudit: false }) => {
  if (!doc) return null;

  const plain = doc.toObject ? doc.toObject({ virtuals: true }) : { ...doc };

  delete plain.__v;
  if (!options.includeAudit) {
    delete plain.auditTrail;
    delete plain.createdBy;
    delete plain.updatedBy;
  }

  plain.blocoLabel  = BLOCO_LABELS[plain.bloco]   ?? plain.bloco;
  plain.statusLabel = STATUS_LABELS[plain.status] ?? plain.status;

  return plain;
};

export const toResponseList = (docs, options = {}) => {
  if (!Array.isArray(docs)) return [];
  return docs.map((doc) => toResponse(doc, options));
};