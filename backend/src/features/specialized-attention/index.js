// backend/src/features/specialized-attention/index.js
// Public API — only what app.js and other features should import.

export { default as specializedAttentionRoutes } from './routes/specializedAttention.routes.js';
export { SpecializedAttentionError, ErrorCode, ErrorCategory, toApiResponse } from './errors/specializedAttention.errors.js';
export { validateIndicador } from './validations/specializedAttention.validation.js';
export {
  MESES, TIPOS_INDICADOR, UNIDADES, UNIDADE_KEYS, UNIDADE_LABELS,
  INDICADORES, INDICADOR_KEYS, INDICADOR_DEF, STATUS, STATUS_LABELS,
} from './constants/specializedAttention.constants.js';
// Analytics mappers — exposed for the upcoming analytics phase
export { toIndicatorSeries, toMetaComparison } from './mappers/specializedAttention.mappers.js';