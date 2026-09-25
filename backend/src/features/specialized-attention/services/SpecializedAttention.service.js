// backend/src/features/specialized-attention/services/specializedAttention.service.js
// Orchestrates repository + domain invariants. No HTTP, no Mongoose, no DTO transform.

import * as repository from '../repositories/specializedAttention.repository.js';
import { toResponse, toResponseList } from '../dto/specializedAttention.dto.js';
import { indicadorNotFoundError, duplicateIndicadorError, conflictFechadoError } from '../errors/specializedAttention.errors.js';

export const createIndicador = async (data, userId) => {
  const isDuplicate = await repository.existsDuplicate({ unidade: data.unidade, mes: data.mes, ano: data.ano });
  if (isDuplicate) throw duplicateIndicadorError(data.unidade, data.mes);
  const doc = await repository.create(data, userId);
  return toResponse(doc);
};

export const getAllIndicadores = async () => {
  const docs = await repository.findAll();
  return toResponseList(docs);
};

export const getIndicadorById = async (id) => {
  const doc = await repository.findById(id);
  if (!doc) throw indicadorNotFoundError(id);
  return toResponse(doc);
};

export const updateIndicador = async (id, data, userId) => {
  const existing = await repository.findById(id);
  if (!existing) throw indicadorNotFoundError(id);
  if (existing.status === 'fechado') throw conflictFechadoError();
  const isDuplicate = await repository.existsDuplicate({ unidade: data.unidade, mes: data.mes, ano: data.ano }, id);
  if (isDuplicate) throw duplicateIndicadorError(data.unidade, data.mes);
  const updated = await repository.updateFull(id, data, userId);
  return toResponse(updated);
};

export const deleteIndicador = async (id, userId) => {
  const existing = await repository.findById(id);
  if (!existing) throw indicadorNotFoundError(id);
  if (existing.status === 'fechado') throw conflictFechadoError();
  const deleted = await repository.softDelete(id, userId);
  return toResponse(deleted);
};

export const purgeIndicador = async (id) => {
  const existing = await repository.findById(id);
  if (!existing) throw indicadorNotFoundError(id);
  return toResponse(await repository.remove(id));
};