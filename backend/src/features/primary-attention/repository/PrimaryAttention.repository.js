// backend/src/features/primary-attention/repositories/primaryAttention.repository.js
// All Mongoose queries. No business logic, no HTTP concerns.

import RegistroPrimario from '../models/primaryAttention.model.js';

export const create = async (data, userId) =>
  RegistroPrimario.create({
    ...data,
    createdBy:  userId,
    auditTrail: [{ userId, action: 'CREATE', date: new Date() }],
  });

export const findAll = async () =>
  RegistroPrimario.find({ deletedAt: null }).sort({ ano: -1, createdAt: -1 }).lean();

export const findById = async (id) =>
  RegistroPrimario.findOne({ _id: id, deletedAt: null }).lean();

export const updateFull = async (id, data, userId) =>
  RegistroPrimario.findOneAndUpdate(
    { _id: id, deletedAt: null },
    {
      $set:  { bloco: data.bloco, mes: data.mes, ano: data.ano, valores: data.valores, updatedBy: userId },
      $push: { auditTrail: { userId, action: 'UPDATE', date: new Date() } },
    },
    { new: true, runValidators: true },
  ).lean();

export const softDelete = async (id, userId) =>
  RegistroPrimario.findOneAndUpdate(
    { _id: id, deletedAt: null },
    {
      $set:  { deletedAt: new Date(), updatedBy: userId },
      $push: { auditTrail: { userId, action: 'DELETE', date: new Date() } },
    },
    { new: true },
  ).lean();

export const remove = async (id) =>
  RegistroPrimario.findByIdAndDelete(id).lean();

export const existsDuplicate = async ({ bloco, mes, ano }, excludeId = null) => {
  const query = { bloco, mes, ano, deletedAt: null };
  if (excludeId) query._id = { $ne: excludeId };
  return (await RegistroPrimario.findOne(query).select('_id').lean()) !== null;
};