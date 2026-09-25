// backend/src/features/specialized-attention/repositories/specializedAttention.repository.js
// All Mongoose queries. No business logic, no HTTP concerns.

import IndicadorEspecializado from '../models/specializedAttention.model.js';

export const create = async (data, userId) =>
  IndicadorEspecializado.create({
    ...data,
    createdBy:  userId,
    auditTrail: [{ userId, action: 'CREATE', date: new Date() }],
  });

export const findAll = async () =>
  IndicadorEspecializado.find({ deletedAt: null }).sort({ ano: -1, createdAt: -1 }).lean();

export const findById = async (id) =>
  IndicadorEspecializado.findOne({ _id: id, deletedAt: null }).lean();

export const updateFull = async (id, data, userId) =>
  IndicadorEspecializado.findOneAndUpdate(
    { _id: id, deletedAt: null },
    {
      $set:  { unidade: data.unidade, mes: data.mes, ano: data.ano, valores: data.valores, updatedBy: userId },
      $push: { auditTrail: { userId, action: 'UPDATE', date: new Date() } },
    },
    { new: true, runValidators: true },
  ).lean();

export const softDelete = async (id, userId) =>
  IndicadorEspecializado.findOneAndUpdate(
    { _id: id, deletedAt: null },
    {
      $set:  { deletedAt: new Date(), updatedBy: userId },
      $push: { auditTrail: { userId, action: 'DELETE', date: new Date() } },
    },
    { new: true },
  ).lean();

export const remove = async (id) =>
  IndicadorEspecializado.findByIdAndDelete(id).lean();

export const existsDuplicate = async ({ unidade, mes, ano }, excludeId = null) => {
  const query = { unidade, mes, ano, deletedAt: null };
  if (excludeId) query._id = { $ne: excludeId };
  return (await IndicadorEspecializado.findOne(query).select('_id').lean()) !== null;
};