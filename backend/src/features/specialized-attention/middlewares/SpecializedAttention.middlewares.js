// backend/src/features/specialized-attention/middlewares/specializedAttention.middlewares.js

import { toDocument } from '../dto/specializedAttention.dto.js';
import { validateIndicador } from '../validations/specializedAttention.validation.js';
import { SpecializedAttentionError, ErrorCode, ErrorCategory, toApiResponse } from '../errors/specializedAttention.errors.js';

/**
 * Transforms req.body via toDocument, then validates.
 * Attaches validated plain object to req.validatedDocument.
 */
export const validateIndicadorInput = async (req, res, next) => {
  try {
    const document = toDocument(req.body);
    const { isValid, errors } = validateIndicador(document);
    if (!isValid) {
      const first = errors[0];
      return next(first instanceof SpecializedAttentionError ? first : new SpecializedAttentionError({
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
export const normalizeSpecializedAttentionError = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json(toApiResponse(new SpecializedAttentionError({
      code: ErrorCode.DUPLICATE_INDICADOR, category: ErrorCategory.DUPLICATE,
      message: 'Registro duplicado.', httpStatus: 409,
    })));
  }
  if (err.name === 'ValidationError') {
    return res.status(422).json(toApiResponse(new SpecializedAttentionError({
      code: ErrorCode.VAL_REQUIRED_FIELD, category: ErrorCategory.VALIDATION,
      message: Object.values(err.errors)[0]?.message ?? 'Dados inválidos.', httpStatus: 422,
    })));
  }
  if (err instanceof SpecializedAttentionError) return res.status(err.httpStatus).json(toApiResponse(err));
  next(err);
};