// backend/src/features/specialized-attention/models/specializedAttention.model.js
// =============================================================================
// MODEL — Atenção Especializada
//
// One document = one unit's indicators for one month.
// `valores` is a typed sub-schema (NOT Mixed) so every indicator is a real,
// indexable Mongoose path — required for the analytics phase
// (e.g. $avg of valores.upa.proporcaoPediatricos grouped by mes).
//
// All 'tempo' indicators are stored as Number (minutes).
//
// Following:
//   - SWEBOK v4 §4 — Software Design: persistent entity definition
//   - ISO 25010 — Data integrity, Performance efficiency (indexable paths)
// =============================================================================

import mongoose from 'mongoose';
import { MESES, UNIDADE_KEYS, INDICADORES, STATUS } from '../constants/specializedAttention.constants.js';

const { Schema, model } = mongoose;

// ─── Build a typed sub-schema for one unit from its indicator definitions ─────

/**
 * Each indicator key becomes a Number path. Percentages get a 0–100 range;
 * counts and tempo get a min:0 floor. Default null = "not reported this month".
 */
const buildValoresSchema = (indicadores) => {
  const shape = {};
  for (const { key, tipo } of indicadores) {
    shape[key] = tipo === 'percentual'
      ? { type: Number, min: 0, max: 100, default: null }
      : { type: Number, min: 0, default: null };
  }
  return new Schema(shape, { _id: false });
};

const valoresSchema = new Schema(
  {
    upa:         { type: buildValoresSchema(INDICADORES.upa),         default: undefined },
    saudeMental: { type: buildValoresSchema(INDICADORES.saudeMental), default: undefined },
    samu:        { type: buildValoresSchema(INDICADORES.samu),        default: undefined },
  },
  { _id: false },
);

const auditEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    action: { type: String, enum: ['CREATE', 'UPDATE', 'DELETE'], required: true },
    date:   { type: Date, default: Date.now },
  },
  { _id: false },
);

const indicadorSchema = new Schema(
  {
    unidade:    { type: String, enum: UNIDADE_KEYS, required: [true, 'Unidade é obrigatória.'], index: true },
    mes:        { type: String, enum: MESES,        required: [true, 'Mês é obrigatório.'],     index: true },
    ano:        { type: Number, required: true, default: new Date().getFullYear(), index: true },
    valores:    { type: valoresSchema, required: true, default: () => ({}) },
    status:     { type: String, enum: STATUS, default: 'rascunho', index: true },
    createdBy:  { type: Schema.Types.ObjectId, required: true, index: true },
    updatedBy:  { type: Schema.Types.ObjectId, default: null },
    deletedAt:  { type: Date, default: null },
    auditTrail: { type: [auditEntrySchema], default: [] },
  },
  { timestamps: true, collection: 'indicadores_atencao_especializada' },
);

// One record per (unidade × mes × ano), excluding soft-deleted.
indicadorSchema.index(
  { unidade: 1, mes: 1, ano: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null }, name: 'unique_indicador_unidade_mes_ano' },
);

indicadorSchema.set('toJSON',   { virtuals: true });
indicadorSchema.set('toObject', { virtuals: true });

export default model('IndicadorEspecializado', indicadorSchema);