// backend/src/features/specialized-attention/constants/specializedAttention.constants.js
// =============================================================================
// CONSTANTS — Atenção Especializada
// Single source of truth: months, units, and the indicator definitions per unit.
//
// Each indicator carries:
//   key          — field name (becomes a real Mongoose path → queryable for analytics)
//   label        — pt-BR display label (lives here, NEVER duplicated into documents)
//   tipo         — 'contagem' | 'percentual' | 'tempo'  (drives input + validation + format)
//   unidadeMedida— display unit ('un' | '%' | 'min')
//   meta         — protocol target where applicable (Manchester wait-time targets), else null
//
// 'tempo' values are ALWAYS stored as Number (minutes) for analytics.
//
// Following:
//   - SWEBOK v4 §3 — Software Construction: constants as single source of truth
//   - ISO 25010 — Maintainability / Modifiability
// =============================================================================

export const MESES = /** @type {const} */ ([
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]);

export const TIPOS_INDICADOR = /** @type {const} */ (['contagem', 'percentual', 'tempo']);

// ─── Units ────────────────────────────────────────────────────────────────────

export const UNIDADES = /** @type {{ key: string, label: string }[]} */ ([
  { key: 'upa',         label: 'UPA — Unidade de Pronto Atendimento' },
  { key: 'saudeMental', label: 'Saúde Mental (CAPS)'                 },
  { key: 'samu',        label: 'SAMU'                                },
]);

export const UNIDADE_KEYS   = UNIDADES.map(({ key }) => key);
export const UNIDADE_LABELS = Object.fromEntries(UNIDADES.map(({ key, label }) => [key, label]));

// ─── Indicators per unit ──────────────────────────────────────────────────────

export const INDICADORES = {
  upa: [
    { key: 'numeroAtendimentos',      label: 'Número de atendimentos na UPA',                                   tipo: 'contagem',   unidadeMedida: 'un',  meta: null },
    { key: 'proporcaoPediatricos',    label: 'Proporção de atendimentos pediátricos',                           tipo: 'percentual', unidadeMedida: '%',   meta: null },
    { key: 'proporcaoPortaria',       label: 'Proporção de atendimentos conforme Portaria Ministerial',         tipo: 'percentual', unidadeMedida: '%',   meta: null },
    { key: 'tempoEsperaVermelho',     label: 'Tempo médio de espera — Vermelho (Imediato)',                     tipo: 'tempo',      unidadeMedida: 'min', meta: 0   },
    { key: 'tempoEsperaLaranja',      label: 'Tempo médio de espera — Laranja',                                 tipo: 'tempo',      unidadeMedida: 'min', meta: 60  },
    { key: 'tempoEsperaAmarelo',      label: 'Tempo médio de espera — Amarelo',                                 tipo: 'tempo',      unidadeMedida: 'min', meta: null },
    { key: 'tempoEsperaVerde',        label: 'Tempo médio de espera — Verde',                                   tipo: 'tempo',      unidadeMedida: 'min', meta: 120 },
    { key: 'tempoEsperaAzul',         label: 'Tempo médio de espera — Azul',                                    tipo: 'tempo',      unidadeMedida: 'min', meta: 240 },
  ],
  saudeMental: [
    { key: 'internacoesJudiciaisLongaPermanencia', label: 'Internações judiciais (longa permanência)',                          tipo: 'contagem',   unidadeMedida: 'un', meta: null },
    { key: 'pacientesLongaPermanenciaMes',         label: 'Pacientes internados de longa permanência no mês',                   tipo: 'contagem',   unidadeMedida: 'un', meta: null },
    { key: 'proporcaoJudicialInfantil',            label: 'Proporção de internações judiciais — Infantil',                      tipo: 'percentual', unidadeMedida: '%',  meta: null },
    { key: 'proporcaoJudicialAdulto',              label: 'Proporção de internações judiciais — Adulto',                        tipo: 'percentual', unidadeMedida: '%',  meta: null },
    { key: 'proporcaoJudicialAlcoolDroga',         label: 'Proporção de internações judiciais — Álcool e droga',                tipo: 'percentual', unidadeMedida: '%',  meta: null },
    { key: 'proporcaoJudicialNoCaps',              label: 'Proporção de internação judicial em acompanhamento no CAPS',         tipo: 'percentual', unidadeMedida: '%',  meta: null },
    { key: 'atendimentosCapsII',                   label: 'Atendimentos realizados no CAPS II',                                 tipo: 'contagem',   unidadeMedida: 'un', meta: null },
    { key: 'atendimentosCapsInfantil',             label: 'Atendimentos realizados no CAPS Infantil',                           tipo: 'contagem',   unidadeMedida: 'un', meta: null },
    { key: 'atendimentosCapsAD',                   label: 'Atendimentos realizados no CAPS AD',                                 tipo: 'contagem',   unidadeMedida: 'un', meta: null },
    { key: 'proporcaoIndividualPsiquiatra',        label: 'Proporção de atendimentos individuais — Psiquiatra',                 tipo: 'percentual', unidadeMedida: '%',  meta: null },
    { key: 'proporcaoIndividualPsicologo',         label: 'Proporção de atendimentos individuais — Psicólogo',                  tipo: 'percentual', unidadeMedida: '%',  meta: null },
    { key: 'proporcaoIndividualEnfermeiro',        label: 'Proporção de atendimentos individuais — Enfermeiro',                 tipo: 'percentual', unidadeMedida: '%',  meta: null },
    { key: 'proporcaoColetivoCapsII',              label: 'Proporção de atendimentos coletivos — CAPS II',                      tipo: 'percentual', unidadeMedida: '%',  meta: null },
    { key: 'proporcaoColetivoCapsInfantil',        label: 'Proporção de atendimentos coletivos — CAPS Infantil',                tipo: 'percentual', unidadeMedida: '%',  meta: null },
    { key: 'proporcaoColetivoCapsAD',              label: 'Proporção de atendimentos coletivos — CAPS AD',                      tipo: 'percentual', unidadeMedida: '%',  meta: null },
    { key: 'acoesMatriciamento',                   label: 'Ações de matriciamento sistemático com Atenção Básica',              tipo: 'contagem',   unidadeMedida: 'un', meta: null },
  ],
  samu: [
    { key: 'atendimentosSuporteBasico',  label: 'Atendimentos pela Unidade de Suporte Básico de Vida',                        tipo: 'contagem',   unidadeMedida: 'un', meta: null },
    { key: 'proporcaoApoioAvancado',     label: 'Proporção de atendimentos que solicitaram apoio do Suporte Avançado',         tipo: 'percentual', unidadeMedida: '%',  meta: null },
  ],
};

/** Flat list of all indicator keys per unit — used by schema, validation, mappers. */
export const INDICADOR_KEYS = Object.fromEntries(
  UNIDADE_KEYS.map((u) => [u, INDICADORES[u].map(({ key }) => key)]),
);

/** Flat lookup of indicator definition by unit+key. */
export const INDICADOR_DEF = Object.fromEntries(
  UNIDADE_KEYS.flatMap((u) => INDICADORES[u].map((def) => [`${u}.${def.key}`, def])),
);

// ─── Status lifecycle ─────────────────────────────────────────────────────────

export const STATUS        = /** @type {const} */ (['rascunho', 'confirmado', 'fechado']);
export const STATUS_LABELS = { rascunho: 'Rascunho', confirmado: 'Confirmado', fechado: 'Fechado' };