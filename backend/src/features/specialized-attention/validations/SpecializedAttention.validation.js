// backend/src/features/specialized-attention/validations/specializedAttention.validation.js

import { MESES, UNIDADE_KEYS, INDICADORES } from '../constants/specializedAttention.constants.js';
import { SpecializedAttentionError, ErrorCode, ErrorCategory, requiredFieldError, invalidEnumError, negativeValueError, percentRangeError } from '../errors/specializedAttention.errors.js';

/**
 * Validate a complete indicador document (output of toDocument).
 *
 * @param {object} doc
 * @returns {{ isValid: boolean, errors: SpecializedAttentionError[] }}
 */
export const validateIndicador = (doc) => {
  const errors = [];

  if (!doc) {
    errors.push(new SpecializedAttentionError({ code: ErrorCode.VAL_REQUIRED_FIELD, category: ErrorCategory.VALIDATION, message: 'Documento vazio.', httpStatus: 422 }));
    return { isValid: false, errors };
  }

  // unidade
  if (!doc.unidade)                            errors.push(requiredFieldError('unidade'));
  else if (!UNIDADE_KEYS.includes(doc.unidade)) errors.push(invalidEnumError('unidade', doc.unidade));

  // mes
  if (!doc.mes)                     errors.push(requiredFieldError('mes'));
  else if (!MESES.includes(doc.mes)) errors.push(invalidEnumError('mes', doc.mes));

  // ano
  if (!doc.ano || isNaN(Number(doc.ano))) errors.push(requiredFieldError('ano'));

  // If unidade invalid, cannot validate valores meaningfully.
  if (!doc.unidade || !UNIDADE_KEYS.includes(doc.unidade)) {
    return { isValid: errors.length === 0, errors };
  }

  // valores section for this unidade
  const valores = doc.valores?.[doc.unidade];
  if (!valores || typeof valores !== 'object') {
    errors.push(requiredFieldError(`valores.${doc.unidade}`));
    return { isValid: errors.length === 0, errors };
  }

  // Validate each indicator by its tipo (null is allowed = not reported)
  for (const { key, tipo } of INDICADORES[doc.unidade]) {
    const v = valores[key];
    if (v === null || v === undefined) continue; // optional per month
    const num = Number(v);
    if (isNaN(num)) { errors.push(negativeValueError(`valores.${doc.unidade}.${key}`)); continue; }
    if (num < 0) errors.push(negativeValueError(`valores.${doc.unidade}.${key}`));
    if (tipo === 'percentual' && (num < 0 || num > 100)) errors.push(percentRangeError(`valores.${doc.unidade}.${key}`));
  }

  return { isValid: errors.length === 0, errors };
};