// backend/src/features/primary-attention/services/primaryAttention.service.js
// Orchestrates repository + domain invariants. No HTTP, no Mongoose, no DTO transform.

import * as repository from '../repositories/primaryAttention.repository.js';
import { toResponse, toResponseList } from '../dto/primaryAttention.dto.js';
import { registroNotFoundError, duplicateRegistroError, conflictFechadoError } from '../errors/primaryAttention.errors.js';

export const createRegistro = async (data, userId) => {
  const isDuplicate = await repository.existsDuplicate({ bloco: data.bloco, mes: data.mes, ano: data.ano });
  if (isDuplicate) throw duplicateRegistroError(data.bloco, data.mes);
  const doc = await repository.create(data, userId);
  return toResponse(doc);
};

export const getAllRegistros = async () => {
  const docs = await repository.findAll();
  return toResponseList(docs);
};

export const getRegistroById = async (id) => {
  const doc = await repository.findById(id);
  if (!doc) throw registroNotFoundError(id);
  return toResponse(doc);
};

export const updateRegistro = async (id, data, userId) => {
  const existing = await repository.findById(id);
  if (!existing) throw registroNotFoundError(id);
  if (existing.status === 'fechado') throw conflictFechadoError();
  const isDuplicate = await repository.existsDuplicate({ bloco: data.bloco, mes: data.mes, ano: data.ano }, id);
  if (isDuplicate) throw duplicateRegistroError(data.bloco, data.mes);
  const updated = await repository.updateFull(id, data, userId);
  return toResponse(updated);
};

export const deleteRegistro = async (id, userId) => {
  const existing = await repository.findById(id);
  if (!existing) throw registroNotFoundError(id);
  if (existing.status === 'fechado') throw conflictFechadoError();
  const deleted = await repository.softDelete(id, userId);
  return toResponse(deleted);
};

export const purgeRegistro = async (id) => {
  const existing = await repository.findById(id);
  if (!existing) throw registroNotFoundError(id);
  return toResponse(await repository.remove(id));
};