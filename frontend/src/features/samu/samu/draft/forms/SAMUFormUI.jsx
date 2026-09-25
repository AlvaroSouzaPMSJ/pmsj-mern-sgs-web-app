import { useState, useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "../../../../app/layouts/Footer";
import GNavbar from "../../../../app/layouts/GNavbar";

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

const YEARS_OPTION = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - 4 + i).toString(),
);

const INDICADORES_SAMU = [
  {
    key: "tempoMedioMinutos",
    label: "Tempo médio em minutos dos atendimentos do SAMU municipal.",
  },
  {
    key: "totalAtendimentosUSB",
    label:
      "Número total de atendimentos realizados com unidade de suporte básico do SAMU.",
  },
  {
    key: "orientacoesMedicas",
    label:
      "Número absoluto de orientações médicas realizadas pelo médico regulador as unidades de suporte básico do SAMU.",
  },
  {
    key: "transferenciasUPA",
    label:
      "Número absoluto de transferências para UPA ou Hospitais realizadas pelas unidades de suporte básico de vida do SAMU.",
  },
  {
    key: "atendimentosImediata",
    label:
      "Número absoluto de atendimentos de resolução imediata realizados pelas unidades de suporte básico de vida do SAMU.",
  },
  {
    key: "atendimentosMediata",
    label:
      "Número absoluto de atendimentos de resolução mediata realizados pelas unidades de suporte básico de vida do SAMU.",
  },
  {
    key: "atendimentosObito",
    label:
      "Número absoluto de atendimentos que resultaram em óbito, realizados pelas unidades de suporte básico de vida do SAMU.",
  },
  {
    key: "atendimentosAvancado",
    label:
      "Número absoluto de atendimentos que necessitaram de suporte avançado de vida do SAMU.",
  },
  {
    key: "atendimentosAgravoAdulto",
    label:
      "Número absoluto de atendimentos por agravo - atendimento clínico adulto.",
  },
  {
    key: "atendimentosAgravoPediatrico",
    label:
      "Número absoluto de atendimentos por agravo - atendimento pediátrico.",
  },
  {
    key: "atendimentosAgravoGinecoObstetrico",
    label:
      "Número absoluto de atendimentos por agravo - atendimento gineco/obstétrico.",
  },
  {
    key: "atendimentosAgravoAtendimentoPsiquiatrico",
    label:
      "Número absoluto de atendimentos por agravo - atendimento Psiquiátrico.",
  },
  {
    key: "atendimentosAgravoTraumaInfantil",
    label:
      "Número absoluto de atendimentos por agravo - atendimento trauma infantil.",
  },
  {
    key: "atendimentosAgravoTraumaAdulto", // ← adicionado
    label:
      "Número absoluto de atendimentos por agravo - atendimento trauma adulto.",
  },
  {
    key: "atendimentosAcidentesTransito",
    label: "Número absoluto de atendimentos por acidentes de trânsito.",
  },
  {
    key: "recusaAtendimentoUsuario",
    label:
      "Número absoluto de saídas das unidades de suporte básico que não geraram atendimento por recusa do atendimento por parte do usuário.",
  },
  {
    key: "naoAtendimentoRemocaoTerceiro",
    label:
      "Número absoluto de saídas das unidades de suporte básico que não geraram atendimento por usuário ter sido removido por terceiros.",
  },
  {
    key: "naoAtendimentoEvasaoUsuario",
    label:
      "Número absoluto de saídas das unidades de suporte básico que não geraram atendimento por usuário ter evadido do local de ocorrência.",
  },
  {
    key: "naoAtendimentoRemocaoPM/CB",
    label:
      "Número absoluto de saídas das unidades de suporte básico que não geraram atendimento por usuário ter sido removido pelo Corpo de Bombeiro/Polícia Militar.",
  },
  {
    key: "naoAtendimentoEnderecoNaoLocalizado", // ← chave corrigida
    label:
      "Número absoluto de saídas das unidades de suporte básico que não geraram atendimento por endereço não localizado.",
  },
  {
    key: "atendimentoFlorianopolis",
    label:
      "Número absoluto de ocorrências atendidas pelas unidades de suporte básico de São José a usuários do município de Florianópolis.",
  },
  {
    key: "atendimentoBiguacu",
    label:
      "Número absoluto de ocorrências atendidas pelas unidades de suporte básico de São José a usuários do município de Biguaçu.",
  },
  {
    key: "atendimentoPalhoca",
    label:
      "Número absoluto de ocorrências atendidas pelas unidades de suporte básico de São José a usuários do município de Palhoça.",
  },
  {
    key: "atendimentoSaoPedroDeAlcantara",
    label:
      "Número absoluto de ocorrências atendidas pelas unidades de suporte básico de São José a usuários do município de São Pedro de Alcantara.",
  },
  {
    key: "atendimentoGovCelsoRamos",
    label:
      "Número absoluto de ocorrências atendidas pelas unidades de suporte básico de São José a usuários do município de Gov Celso Ramos.",
  },
  {
    key: "atendimentoAntonioCarlos",
    label:
      "Número absoluto de ocorrências atendidas pelas unidades de suporte básico de São José a usuários do município de Antônio Carlos.",
  },
  {
    key: "atendimentoSaoJose",
    label:
      "Número absoluto de atendimentos realizados a usuários do município de São José.",
  },
];

const INDICADORES_ZERADOS = Object.fromEntries(
  INDICADORES_SAMU.map(({ key }) => [key, 0]),
);

// SCHEMA

const indicadorShape = Object.fromEntries(
  INDICADORES_SAMU.map(({ key }) => [
    key,
    z.coerce.number().min(0, "Valor deve ser positivo"),
  ]),
);

const samuSchema = z.object({
  currentYear: z.enum(YEARS_OPTION),
  mes: z.enum(MESES),
  ...indicadorShape,
});

// UTILS

function totalAcoesMes(indicadores) {
  const { tempoMedioMinutos, ...apenasCounts } = indicadores;
  return Object.values(apenasCounts).reduce((acc, v) => acc + v, 0);
}

function buildRegistroSamu(values) {
  const total = totalAcoesMes(values);
  return {
    ...values,
    id: crypto.randomUUID(),
    totalAcoes: total,
    criadoEm: new Date().toISOString(),
  };
}

// HOOK

const DEFAULT_VALUES = {
  currentYear: "",
  mes: "",
  ...INDICADORES_ZERADOS,
};

function useSamuForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(samuSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const indicadores = useWatch({
    control: form.control,
  });

  const total = totalAcoesMes(indicadores ?? INDICADORES_ZERADOS);
  const tempoMedio = indicadores?.tempoMedioMinutos ?? 0;

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        form.reset(DEFAULT_VALUES);
      },
      [form, onSuccess],
    ),
  );

  return { form, handleSubmit, total, tempoMedio };
}

// SUB-COMPONENT

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

function IndicadoresGrid({ control, errors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {INDICADORES_SAMU.map(({ key, label }) => {
        const fieldError = errors[key];
        return (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              {label}
            </label>
            <Controller
              name={key}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={key}
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

function RegistrosList({ registros }) {
  if (registros.length === 0) return null;

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros da sessão
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {[
              "Mês",
              "Tempo Médio (min)",
              "Total USB",
              "Orientações",
              "Transferências",
              "Total Ações",
            ].map((h, i) => (
              <th
                key={h}
                className={`text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap ${
                  i >= 2 ? "text-right" : "text-left"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr
              key={r.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                {r.mes}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-800 tabular-nums">
                {r.tempoMedioMinutos}
              </td>
              <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                {r.totalAtendimentosUSB}
              </td>
              <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                {r.orientacoesMedicas}
              </td>
              <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                {r.transferenciasUPA}
              </td>
              <td className="py-2.5 text-right tabular-nums">
                <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                  {r.totalAcoes}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SamuForm({ onSuccess }) {
  const { form, handleSubmit, total, tempoMedio } = useSamuForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        {/* Identificação */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Dados / Indicadores do SAMU
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              label="Mês de Referência"
              error={errors.mes?.message}
              htmlFor="mes"
            >
              <select
                id="mes"
                {...register("mes")}
                className={fieldCls(!!errors.mes)}
              >
                <option value="">Selecione o mês</option>
                {MESES.map((m) => (
                  <option key={m} value={m}>
                    {m}
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
                {YEARS_OPTION.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* INDICADORES */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Indicadores do SAMU Municipal
          </h2>
          <IndicadoresGrid control={control} errors={errors} />

          <div className="grid grid-cols-2 gap-3 mt-6">
            <MetricCard label="Total de ações no mês" value={Math.floor(total)} />
            <MetricCard
              label="Tempo médio de atendimento"
              value={tempoMedio ? `${tempoMedio} min` : "0 min"}
              accent
            />
          </div>
        </div>

        {/* ACTIONS */}
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

//PAGE
export default function SAMUFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((data) => {
    setRegistros((prev) => [buildRegistroSamu(data), ...prev]);
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
            SAMU - Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Registro de indicadores de atendimento e orientações do Serviço de
            Atendimento Móvel de Urgência
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
            Indicadores registrados com sucesso.
          </div>
        )}

        <SamuForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      {/* footer-starts */}
      <section>
        <Footer />
      </section>
      {/* footer-ends */}

    </main>
  );
}
