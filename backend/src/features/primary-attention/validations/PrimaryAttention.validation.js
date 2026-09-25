// backend/src/features/primary-attention/validations/primaryAttention.validation.js

import { MESES, BLOCO_KEYS, INDICADORES } from '../constants/primaryAttention.constants.js';
import { PrimaryAttentionError, ErrorCode, ErrorCategory, requiredFieldError, invalidEnumError, negativeValueError, percentRangeError } from '../errors/primaryAttention.errors.js';

/**
 * Validate a complete registro document (output of toDocument).
 *
 * @param {object} doc
 * @returns {{ isValid: boolean, errors: PrimaryAttentionError[] }}
 */
export const validateRegistro = (doc) => {
  const errors = [];

  if (!doc) {
    errors.push(new PrimaryAttentionError({ code: ErrorCode.VAL_REQUIRED_FIELD, category: ErrorCategory.VALIDATION, message: 'Documento vazio.', httpStatus: 422 }));
    return { isValid: false, errors };
  }

  if (!doc.bloco)                         errors.push(requiredFieldError('bloco'));
  else if (!BLOCO_KEYS.includes(doc.bloco)) errors.push(invalidEnumError('bloco', doc.bloco));

  if (!doc.mes)                     errors.push(requiredFieldError('mes'));
  else if (!MESES.includes(doc.mes)) errors.push(invalidEnumError('mes', doc.mes));

  if (!doc.ano || isNaN(Number(doc.ano))) errors.push(requiredFieldError('ano'));

  if (!doc.bloco || !BLOCO_KEYS.includes(doc.bloco)) {
    return { isValid: errors.length === 0, errors };
  }

  const valores = doc.valores?.[doc.bloco];
  if (!valores || typeof valores !== 'object') {
    errors.push(requiredFieldError(`valores.${doc.bloco}`));
    return { isValid: errors.length === 0, errors };
  }

  for (const { key, tipo } of INDICADORES[doc.bloco]) {
    const v = valores[key];
    if (v === null || v === undefined) continue; // optional per month
    const num = Number(v);
    if (isNaN(num)) { errors.push(negativeValueError(`valores.${doc.bloco}.${key}`)); continue; }
    if (num < 0) errors.push(negativeValueError(`valores.${doc.bloco}.${key}`));
    if (tipo === 'percentual' && (num < 0 || num > 100)) errors.push(percentRangeError(`valores.${doc.bloco}.${key}`));
  }

  return { isValid: errors.length === 0, errors };
};