// backend/src/features/primary-attention/models/primaryAttention.model.js
// =============================================================================
// MODEL — Atenção Primária
//
// One document = one block's indicators for one month.
// `valores` is a typed sub-schema (NOT Mixed) so every indicator is a real,
// indexable Mongoose path — required for the analytics phase.
//
// parametro / meta / fonte are NOT stored — they are static indicator metadata
// living in constants. Only the measured numeric `valor` per indicator is stored.
//
// Following:
//   - SWEBOK v4 §4 — Software Design: persistent entity definition
//   - ISO 25010 — Data integrity, Performance efficiency (indexable paths)
// =============================================================================

import mongoose from 'mongoose';
import { MESES, BLOCO_KEYS, INDICADORES, STATUS } from '../constants/primaryAttention.constants.js';

const { Schema, model } = mongoose;

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
    consultas:       { type: buildValoresSchema(INDICADORES.consultas),       default: undefined },
    saudeBucal:      { type: buildValoresSchema(INDICADORES.saudeBucal),      default: undefined },
    maternoInfantil: { type: buildValoresSchema(INDICADORES.maternoInfantil), default: undefined },
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

const registroSchema = new Schema(
  {
    bloco:      { type: String, enum: BLOCO_KEYS, required: [true, 'Bloco é obrigatório.'], index: true },
    mes:        { type: String, enum: MESES,      required: [true, 'Mês é obrigatório.'],   index: true },
    ano:        { type: Number, required: true, default: new Date().getFullYear(), index: true },
    valores:    { type: valoresSchema, required: true, default: () => ({}) },
    status:     { type: String, enum: STATUS, default: 'rascunho', index: true },
    createdBy:  { type: Schema.Types.ObjectId, required: true, index: true },
    updatedBy:  { type: Schema.Types.ObjectId, default: null },
    deletedAt:  { type: Date, default: null },
    auditTrail: { type: [auditEntrySchema], default: [] },
  },
  { timestamps: true, collection: 'registros_atencao_primaria' },
);

// One record per (bloco × mes × ano), excluding soft-deleted.
registroSchema.index(
  { bloco: 1, mes: 1, ano: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null }, name: 'unique_registro_bloco_mes_ano' },
);

registroSchema.set('toJSON',   { virtuals: true });
registroSchema.set('toObject', { virtuals: true });

export default model('RegistroPrimario', registroSchema);