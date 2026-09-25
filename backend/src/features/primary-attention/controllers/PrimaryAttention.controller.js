// backend/src/features/primary-attention/controllers/primaryAttention.controller.js
// Thin HTTP adapter. Reads req → calls service → writes res. No logic.

import { ApiError } from '#shared/errors/ApiError.js';
import * as service from '../services/primaryAttention.service.js';

/** POST /api/primary-attention */
export const createRegistro = async (req, res, next) => {
  try {
    if (!req.validatedDocument) return next(new ApiError(500, 'Validated document missing.'));
    const doc = await service.createRegistro(req.validatedDocument, req.user.id);
    res.status(201).json({ success: true, data: doc });
  } catch (err) { next(err); }
};

/** GET /api/primary-attention */
export const getAllRegistros = async (req, res, next) => {
  try {
    const result = await service.getAllRegistros();
    res.status(200).json({ success: true, data: result });
  } catch (err) { next(err); }
};

/** GET /api/primary-attention/:id */
export const getRegistro = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new ApiError(400, 'ID do registro é obrigatório.'));
    const result = await service.getRegistroById(id);
    res.status(200).json({ success: true, data: result });
  } catch (err) { next(err); }
};

/** PUT /api/primary-attention/:id */
export const updateRegistro = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new ApiError(400, 'ID do registro é obrigatório.'));
    if (!req.validatedDocument) return next(new ApiError(500, 'Validated document missing.'));
    const result = await service.updateRegistro(id, req.validatedDocument, req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (err) { next(err); }
};

/** DELETE /api/primary-attention/:id  (soft) */
export const deleteRegistro = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new ApiError(400, 'ID do registro é obrigatório.'));
    if (!req.user?.id) return next(new ApiError(401, 'Não autorizado.'));
    const result = await service.deleteRegistro(id, req.user.id);
    res.status(200).json({ success: true, message: 'Registro removido.', data: result });
  } catch (err) { next(err); }
};

/** DELETE /api/primary-attention/:id/purge */
export const purgeRegistro = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new ApiError(400, 'ID do registro é obrigatório.'));
    const result = await service.purgeRegistro(id);
    res.status(200).json({ success: true, message: 'Registro permanentemente removido.', data: result });
  } catch (err) { next(err); }
};