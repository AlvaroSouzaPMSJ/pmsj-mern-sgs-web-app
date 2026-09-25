// backend/src/features/primary-attention/middlewares/primaryAttention.middlewares.js

import { toDocument } from '../dto/primaryAttention.dto.js';
import { validateRegistro } from '../validations/primaryAttention.validation.js';
import { PrimaryAttentionError, ErrorCode, ErrorCategory, toApiResponse } from '../errors/primaryAttention.errors.js';

/**
 * Transforms req.body via toDocument, then validates.
 * Attaches validated plain object to req.validatedDocument.
 */
export const validateRegistroInput = async (req, res, next) => {
  try {
    const document = toDocument(req.body);
    const { isValid, errors } = validateRegistro(document);
    if (!isValid) {
      const first = errors[0];
      return next(first instanceof PrimaryAttentionError ? first : new PrimaryAttentionError({
        code: ErrorCode.VAL_REQUIRED_FIELD, category: ErrorCategory.VALIDATION,
        message: first?.message ?? 'Dados inválidos.', field: first?.field ?? null, httpStatus: 422,
      }));
    }
    req.validatedDocument = document;
    next();
  } catch (err) { next(err); }
};

/**
 * Feature-level error handler. Mount last in the feature router chain.
 */
export const normalizePrimaryAttentionError = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json(toApiResponse(new PrimaryAttentionError({
      code: ErrorCode.DUPLICATE_REGISTRO, category: ErrorCategory.DUPLICATE,
      message: 'Registro duplicado.', httpStatus: 409,
    })));
  }
  if (err.name === 'ValidationError') {
    return res.status(422).json(toApiResponse(new PrimaryAttentionError({
      code: ErrorCode.VAL_REQUIRED_FIELD, category: ErrorCategory.VALIDATION,
      message: Object.values(err.errors)[0]?.message ?? 'Dados inválidos.', httpStatus: 422,
    })));
  }
  if (err instanceof PrimaryAttentionError) return res.status(err.httpStatus).json(toApiResponse(err));
  next(err);
};