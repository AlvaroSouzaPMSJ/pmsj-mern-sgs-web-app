// backend/src/features/specialized-attention/controllers/specializedAttention.controller.js
// Thin HTTP adapter. Reads req → calls service → writes res. No logic.

import { ApiError } from '#shared/errors/ApiError.js';
import * as service from '../services/specializedAttention.service.js';

/** POST /api/specialized-attention */
export const createIndicador = async (req, res, next) => {
  try {
    if (!req.validatedDocument) return next(new ApiError(500, 'Validated document missing.'));
    const doc = await service.createIndicador(req.validatedDocument, req.user.id);
    res.status(201).json({ success: true, data: doc });
  } catch (err) { next(err); }
};

/** GET /api/specialized-attention */
export const getAllIndicadores = async (req, res, next) => {
  try {
    const result = await service.getAllIndicadores();
    res.status(200).json({ success: true, data: result });
  } catch (err) { next(err); }
};

/** GET /api/specialized-attention/:id */
export const getIndicador = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new ApiError(400, 'ID do registro é obrigatório.'));
    const result = await service.getIndicadorById(id);
    res.status(200).json({ success: true, data: result });
  } catch (err) { next(err); }
};

/** PUT /api/specialized-attention/:id */
export const updateIndicador = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new ApiError(400, 'ID do registro é obrigatório.'));
    if (!req.validatedDocument) return next(new ApiError(500, 'Validated document missing.'));
    const result = await service.updateIndicador(id, req.validatedDocument, req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (err) { next(err); }
};

/** DELETE /api/specialized-attention/:id  (soft) */
export const deleteIndicador = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new ApiError(400, 'ID do registro é obrigatório.'));
    if (!req.user?.id) return next(new ApiError(401, 'Não autorizado.'));
    const result = await service.deleteIndicador(id, req.user.id);
    res.status(200).json({ success: true, message: 'Registro removido.', data: result });
  } catch (err) { next(err); }
};

/** DELETE /api/specialized-attention/:id/purge */
export const purgeIndicador = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new ApiError(400, 'ID do registro é obrigatório.'));
    const result = await service.purgeIndicador(id);
    res.status(200).json({ success: true, message: 'Registro permanentemente removido.', data: result });
  } catch (err) { next(err); }
};