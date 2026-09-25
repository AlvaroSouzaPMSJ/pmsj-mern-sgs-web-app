import { useState, useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "../../../../app/layouts/Footer";
import GNavbar from "../../../../app/layouts/GNavbar";
import { ROUTES } from "../../../../app/routing/routes.constants";

// CONSTANTS

const MESES = /** @type {const} */ ([
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]);

const BAIRROS = [
  "OUTRA CIDADE",
  "AREIAS",
  "BARREIROS",
  "BELA VISTA",
  "BOSQUE DAS MANSÕES",
  "CAMPINAS",
  "CENIRO MARTINS",
  "CENTRO HISTÓRICO",
  "COLÔNIA SANTANA",
  "DISTRITO INDUSTRIAL",
  "FAZENDA SANTO ANTÔNIO",
  "FLOR DE NÁPOLES",
  "FLORESTA",
  "FORQUILHAS",
  "FORQUILHINHAS",
  "IPIRANGA",
  "JARDIM ARAUCÁRIA",
  "JARDIM CIDADE DE FLORIANÓPOLIS",
  "JARDIM SANTIAGO",
  "JOSÉ NITRO",
  "KOBRASOL",
  "LISBOA",
  "LOS ANGELES",
  "MORAR BEM",
  "NOSSA SENHORA DO ROSÁRIO",
  "PEDREGAL",
  "PICADAS DO SUL",
  "PONTA DE BAIXO",
  "POTECAS",
  "PRAIA COMPRIDA",
  "PROCASA",
  "REAL PARQUE",
  "ROÇADO",
  "SAN MARINO",
  "SÃO LUIZ",
  "SERRARIA",
  "SERTÃO DO MARUIM",
  "VILA FORMOSA",
  "ZANELATO",
];

const YEARS_OPTIONS = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - 4 + i).toString(),
);

const ATENDIMENTOS_ZERADOS = Object.fromEntries(MESES.map((mes) => [mes, 0]));

// SCHEMA

const atendimentosShape = Object.fromEntries(
  MESES.map((mes) => [mes, z.coerce.number().int().min(0)]),
);

const atendimentoSchema = z.object({
  currentYear: z.string(YEARS_OPTIONS).min(1, "Selecione um ano"),
  bairro: z.string().min(1, "Selecione um bairro"),
  atendimentos: z.object(atendimentosShape),
});

// UTILS

function totalAtendimentos(atendimentos) {
  return Object.values(atendimentos).reduce((acc, v) => acc + v, 0);
}

function mediaMensal(total) {
  return (total / 12).toFixed(1);
}

function buildAtendimento(values) {
  const total = totalAtendimentos(values.atendimentos);
  return {
    ...values,
    id: crypto.randomUUID(),
    totalAtendimentos: total,
    criadoEm: new Date().toISOString(),
  };
}

// HOOK

const DEFAULT_VALUES = {
  currentYear: "",
  bairro: "",
  atendimentos: { ...ATENDIMENTOS_ZERADOS },
};

function useAtendimentoForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(atendimentoSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const atendimentos = useWatch({
    control: form.control,
    name: "atendimentos",
  });

  const total = totalAtendimentos(atendimentos ?? ATENDIMENTOS_ZERADOS);
  const media = mediaMensal(total);

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        form.reset(DEFAULT_VALUES);
      },
      [form, onSuccess],
    ),
  );

  return { form, handleSubmit, total, media };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormField({ label, error, children, htmlFor }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function fieldCls(hasError) {
  return [
    "w-full rounded-md border px-3 py-2 text-sm text-gray-900",
    "placeholder:text-gray-400 bg-white",
    "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400",
    "transition-colors duration-150",
    hasError
      ? "border-red-300 focus:ring-red-500/30 focus:border-red-400"
      : "border-gray-300",
  ].join(" ");
}

function MetricCard({ label, value, accent = false }) {
  return (
    <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p
        className={`text-2xl font-semibold tabular-nums ${accent ? "text-blue-600" : "text-gray-800"}`}
      >
        {value}
      </p>
    </div>
  );
}

function MesesGrid({ control, errors }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
      {MESES.map((mes) => {
        const fieldError = errors.atendimentos?.[mes];
        return (
          <div key={mes}>
            <label
              htmlFor={`atendimentos.${mes}`}
              className="block text-xs font-medium text-gray-500 mb-1 truncate"
              title={mes}
            >
              {mes.substring(0, 3)}
            </label>
            <Controller
              name={`atendimentos.${mes}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={`atendimentos.${mes}`}
                  type="number"
                  min={0}
                  inputMode="numeric"
                  className={fieldCls(!!fieldError) + " text-center"}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

function AtendimentosList({ registros }) {
  if (registros.length === 0) return null;

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Atendimentos registrados
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th
              className="text-left text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap sticky left-0 bg-white z-10"
              style={{ boxShadow: "2px 0 6px -2px rgba(0,0,0,0.05)" }}
            >
              Bairro
            </th>
            {MESES.map((m) => (
              <th
                key={m}
                className="text-right text-xs font-medium text-gray-400 py-2 px-2 whitespace-nowrap"
              >
                {m.substring(0, 3)}
              </th>
            ))}
            <th className="text-right text-xs font-medium text-gray-400 py-2 pl-4 whitespace-nowrap">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr
              key={r.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td
                className="py-2.5 pr-4 text-gray-800 font-medium sticky left-0 bg-white z-10"
                style={{ boxShadow: "2px 0 6px -2px rgba(0,0,0,0.05)" }}
              >
                {r.bairro}
              </td>
              {MESES.map((m) => (
                <td
                  key={m}
                  className="py-2.5 px-2 text-right text-gray-600 tabular-nums"
                >
                  {r.atendimentos[m] ?? 0}
                </td>
              ))}
              <td className="py-2.5 pl-4 text-right font-semibold text-gray-800 tabular-nums">
                {r.totalAtendimentos}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AtendimentoForm({ onSuccess }) {
  const { form, handleSubmit, total, media } = useAtendimentoForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-md p-8 bg-white shadow-sm space-y-8">
        {/* Identificação */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Identificação do Atendimento
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label="Bairro de Atendimento"
              error={errors.bairro?.message}
              htmlFor="bairro"
            >
              <select
                id="bairro"
                {...register("bairro")}
                className={fieldCls(!!errors.bairro)}
              >
                <option value="">Selecione o bairro</option>
                {BAIRROS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField
              label="Ano de Referência"
              error={errors.currentYear?.message}
              htmlFor="currentYear"
            >
              <select
                id="currentYear"
                {...register("currentYear")}
                className={fieldCls(!!errors.currentYear)}
              >
                <option value="">Selecione o ano</option>
                {YEARS_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* Atendimentos por Mês */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Atendimentos por Mês
          </h2>
          <MesesGrid control={control} errors={errors} />

          <div className="grid grid-cols-2 gap-3 mt-6">
            <MetricCard label="Total anual" value={String(total)} />
            <MetricCard
              label="Média mensal"
              value={String(media)}
              accent
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => form.reset()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5
                       text-sm font-medium text-gray-600
                       hover:bg-gray-50 active:scale-[0.98]
                       focus:outline-none focus:ring-2 focus:ring-gray-300
                       transition-all duration-150 cursor-pointer"
          >
            Limpar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5
                       text-sm font-medium text-white
                       hover:bg-blue-700 active:scale-[0.98]
                       focus:outline-none focus:ring-2 focus:ring-blue-500/40
                       transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Registrar
          </button>
        </div>
      </div>
    </form>
  );
}

// PAGE

export default function SAMU3FormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((data) => {
    setRegistros((prev) => [buildAtendimento(data), ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* navbar */}
      <GNavbar />

      {/* page-title-starts */}
      <section className="px-10 py-8">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Registro de atendimentos por bairros — SAMU
          </p>
        </div>
      </section>

      {/* form-ends */}
      <section className="px-10 pb-10 space-y-6">
        {showSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-lg bg-green-50 border border-green-200 px-4 py-3
                       text-sm font-medium text-green-700 flex items-center gap-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="8"
                cy="8"
                r="7.5"
                stroke="currentColor"
                strokeOpacity=".4"
              />
              <path
                d="M4.5 8.5L7 11L11.5 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Atendimento registrado com sucesso.
          </div>
        )}

        <AtendimentoForm onSuccess={handleSuccess} />
        <AtendimentosList registros={registros} />
      </section>

      {/* footer-starts */}
      <section>
        <Footer />
      </section>
      {/* footer-ends */}
    </main>
  );
}
