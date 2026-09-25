// backend/src/features/specialized-attention/errors/specializedAttention.errors.js

export const ErrorCategory = {
  VALIDATION:  'VALIDATION',
  DUPLICATE:   'DUPLICATE',
  NOT_FOUND:   'NOT_FOUND',
  UNAUTHORIZED:'UNAUTHORIZED',
  FORBIDDEN:   'FORBIDDEN',
  CONFLICT:    'CONFLICT',
  INTERNAL:    'INTERNAL',
  BAD_REQUEST: 'BAD_REQUEST',
};

export const ErrorCode = {
  VAL_REQUIRED_FIELD:   'VAL_001',
  VAL_INVALID_ENUM:     'VAL_002',
  VAL_NEGATIVE_VALUE:   'VAL_003',
  VAL_PERCENT_RANGE:    'VAL_004',
  DUPLICATE_INDICADOR:  'DUP_001',
  AUTH_MISSING_USER:    'AUTH_001',
  FORBIDDEN_OPERATION:  'AUTH_003',
  NOT_FOUND_INDICADOR:  'NF_001',
  CONFLICT_FECHADO:     'CONF_001',
  INT_UNEXPECTED_ERROR: 'INT_999',
};

const messages = {
  [ErrorCode.VAL_REQUIRED_FIELD]:  'O campo {field} é obrigatório.',
  [ErrorCode.VAL_INVALID_ENUM]:    'O valor "{value}" não é válido para o campo {field}.',
  [ErrorCode.VAL_NEGATIVE_VALUE]:  'O campo {field} não pode ser negativo.',
  [ErrorCode.VAL_PERCENT_RANGE]:   'O campo {field} deve estar entre 0 e 100.',
  [ErrorCode.DUPLICATE_INDICADOR]: 'Já existe um registro de indicadores para {unidade} no mês de {mes}.',
  [ErrorCode.AUTH_MISSING_USER]:   'Usuário não autenticado.',
  [ErrorCode.FORBIDDEN_OPERATION]: 'Você não tem permissão para esta operação.',
  [ErrorCode.NOT_FOUND_INDICADOR]: 'Registro não encontrado com o ID {id}.',
  [ErrorCode.CONFLICT_FECHADO]:    'Registros fechados não podem ser modificados.',
  [ErrorCode.INT_UNEXPECTED_ERROR]:'Erro inesperado. Contate o suporte.',
};

export class SpecializedAttentionError extends Error {
  constructor({ code, category, message, field = null, details = null, httpStatus = 400 }) {
    let finalMessage = message || messages[code] || 'Erro desconhecido.';
    if (details) Object.keys(details).forEach((k) => { finalMessage = finalMessage.replace(`{${k}}`, details[k]); });
    super(finalMessage);
    this.name       = 'SpecializedAttentionError';
    this.code       = code;
    this.category   = category;
    this.field      = field;
    this.details    = details;
    this.httpStatus = httpStatus;
  }
}

export const requiredFieldError = (field) => new SpecializedAttentionError({
  code: ErrorCode.VAL_REQUIRED_FIELD, category: ErrorCategory.VALIDATION, field, details: { field }, httpStatus: 422,
});

export const invalidEnumError = (field, value) => new SpecializedAttentionError({
  code: ErrorCode.VAL_INVALID_ENUM, category: ErrorCategory.VALIDATION, field, details: { field, value }, httpStatus: 422,
});

export const negativeValueError = (field) => new SpecializedAttentionError({
  code: ErrorCode.VAL_NEGATIVE_VALUE, category: ErrorCategory.VALIDATION, field, details: { field }, httpStatus: 422,
});

export const percentRangeError = (field) => new SpecializedAttentionError({
  code: ErrorCode.VAL_PERCENT_RANGE, category: ErrorCategory.VALIDATION, field, details: { field }, httpStatus: 422,
});

export const duplicateIndicadorError = (unidade, mes) => new SpecializedAttentionError({
  code: ErrorCode.DUPLICATE_INDICADOR, category: ErrorCategory.DUPLICATE, details: { unidade, mes }, httpStatus: 409,
});

export const indicadorNotFoundError = (id) => new SpecializedAttentionError({
  code: ErrorCode.NOT_FOUND_INDICADOR, category: ErrorCategory.NOT_FOUND, details: { id }, httpStatus: 404,
});

export const unauthorizedError = () => new SpecializedAttentionError({
  code: ErrorCode.AUTH_MISSING_USER, category: ErrorCategory.UNAUTHORIZED, httpStatus: 401,
});

export const conflictFechadoError = () => new SpecializedAttentionError({
  code: ErrorCode.CONFLICT_FECHADO, category: ErrorCategory.CONFLICT, httpStatus: 409,
});

export const toApiResponse = (err) => {
  if (err instanceof SpecializedAttentionError) {
    return { success: false, error: { code: err.code, category: err.category, message: err.message, field: err.field, details: err.details } };
  }
  console.error('[SpecializedAttention] Unexpected error:', err);
  return { success: false, error: { code: ErrorCode.INT_UNEXPECTED_ERROR, category: ErrorCategory.INTERNAL, message: messages[ErrorCode.INT_UNEXPECTED_ERROR], details: null } };
};