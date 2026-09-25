import React from "react";
import {
  Ambulance,
  ChartNoAxesCombined,
  ChevronDown,
  Cog,
  Info,
  LayoutPanelLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import GNavbar from "../../../../app/layouts/GNavbar";
import Footer from "../../../../app/layouts/Footer";
import { ROUTES } from "../../../../app/routing/routes.constants";


const UbsForquilhasHomeUI = () => {
  const navigate = useNavigate();
  return (
    <main className="bg-gray-100">
      <section>
        <div>
          <GNavbar />
          {/* header-starts */}
          <div className="w-full relative">
            <div>
              <div className="w-full h-20 object-cover"></div>
            </div>
            <h1 className="absolute top-12 bottom-4 left-10 text-3xl text-gray-800 font-bold">
              <span className="font-normal mr-1">UBS</span> Forquilhas
            </h1>
          </div>
          {/* header-starts */}

          {/* situation-room-starts */}
          <section id="situationroom" className="px-10 py-16">
            <div>
              <div>
                {/**/}
                <div>
                  <div className="border-b border-gray-300 pb-4">
                    <div className="flex-1 flex justify-between">
                      <div className="flex items-center">
                        <div>
                          <ChartNoAxesCombined
                            size={20}
                            className="mr-2 text-green-950"
                          />
                        </div>
                        <div>
                          <h1 className="flex font-semibold text-[16px]">
                            Sala de Situação
                          </h1>
                        </div>
                      </div>
                      <div>
                        <ChevronDown />
                      </div>
                    </div>
                  </div>
                </div>
                {/**/}
              </div>

              {/* grid-starts */}
              <div className="pt-8">
                <div>
                  <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5">
                    {/*  */}
                    <div
                      onClick={() => navigate("/home/spreadsheet8")}
                      className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer"
                    >
                      <p className="flex items-center justify-center text-white text-sm font-medium">
                        2027
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                      <p className="flex items-center justify-center text-white text-sm font-medium">
                        2026
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                      <p className="flex items-center justify-center text-white text-sm font-medium">
                        2025
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        2024
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        2023
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        2022
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        2021
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        2020
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        2019
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        2018
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        2017
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Sistema CELK
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Consulta CNES
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                      <p className="flex items-center justify-center text-white text-sm font-medium">
                        Solicitação Manutenção Serviço
                      </p>
                    </div>
                    {/*  */}
                  </div>
                </div>
              </div>
              {/* grid-ends */}
            </div>
          </section>
          {/* situation-room-starts */}

          {/*  -------------------  */}

          {/* apps-starts */}
          <section className="px-10 py-16">
            <div>
              <div>
                {/**/}
                <div>
                  <div className="border-b border-gray-300 pb-4">
                    <div className="flex-1 flex justify-between">
                      <div className="flex items-center">
                        <div>
                          <LayoutPanelLeft
                            size={20}
                            className="mr-2 text-green-950"
                          />
                        </div>
                        <div>
                          <h1 className="flex font-semibold text-[16px]">
                            Painel de Gestão
                          </h1>
                        </div>
                      </div>
                      <div>
                        <ChevronDown />
                      </div>
                    </div>
                  </div>
                </div>
                {/**/}
              </div>

              {/* grid-starts */}
              <div className="pt-8">
                <div>
                  <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5">
                    {/*  */}
                    <div
                      onClick={() => navigate("/home")}
                      className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50"
                    >
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium hover:text-gray-600">
                        Cadodonto
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium hover:text-gray-600 ">
                        São José Criança
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div
                      onClick={() => navigate(
                        ROUTES.SYPHILIS_HOME_UI,
                        window.scrollTo("top: 0", "behavior: smooth"),
                      )}
                      className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer hover:bg-green-700"
                    >
                      <p className="flex items-center justify-center text-white text-sm font-medium">
                        Sifilís
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Lunas
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-white ">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Formulário Solicitação Testes
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-white">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Implanon
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-white">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        OPMAL
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-white">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Hiperdia
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-white">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Materiais Especiais
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-white">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Controle Testes Rápido
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-white">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Imunos Especiais
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-white">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Oxigenio Terapia
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-white">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Tabagismo
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-white">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Solicitação Exame Tuberculose
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-white">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Estomizados
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-white">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Consultar Exames Tuberculose
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer hover:bg-green-700">
                      <p className="flex items-center justify-center text-white text-sm font-medium">
                        Notícias {"(Saúde e Bem Estar)"}
                      </p>
                    </div>
                    {/*  */}
                  </div>
                </div>
              </div>
              {/* grid-ends */}
            </div>
          </section>
          {/* apps-ends */}

          {/*  -------------------  */}

          {/* patiente-management-transp-starts */}
          <section className="px-10 py-16">
            <div>
              <div>
                {/**/}
                <div>
                  <div className="border-b border-gray-300 pb-4">
                    <div className="flex-1 flex justify-between">
                      <div className="flex items-center">
                        <div>
                          <Ambulance
                            size={20}
                            className="mr-2 text-green-950"
                          />
                        </div>
                        <div>
                          <h1 className="flex font-semibold text-[16px]">
                            Gestão de Transporte de Pacientes
                          </h1>
                        </div>
                      </div>
                      <div>
                        <ChevronDown />
                      </div>
                    </div>
                  </div>
                </div>
                {/**/}
              </div>

              {/* grid-starts */}
              <div className="pt-8">
                <div>
                  <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5">
                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                      <p className="flex items-center justify-center text-white text-sm font-medium">
                        Solicitar Transp 2025
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                      <p className="flex items-center justify-center text-white text-sm font-medium">
                        Solicitar Transp 2026
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2  hover:shadow-md cursor-pointer">
                      <p className="flex items-center justify-center text-gray-600 text-sm font-medium">
                        Sanitário 2026
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2  hover:shadow-md cursor-pointer">
                      <p className="flex items-center justify-center text-gray-600 text-sm font-medium">
                        Sanitário 2025 - 2024
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-gray-100">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        TFD 2026
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-gray-100">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        TFD 2025-2024
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-gray-100">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        MOP 2026
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-gray-100">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        MOP 2025 - 2024
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-gray-100">
                      <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                        Consultar Pacientes Vale Transporte
                      </p>
                    </div>
                    {/*  */}
                  </div>
                </div>
              </div>
              {/* grid-ends */}
            </div>
          </section>
          {/* patiente-management-transp-ends */}

          {/*  -------------------  */}

          {/* services-resquests-maintenance-starts */}
          <section className="px-10 py-16">
            <div>
              <div>
                {/**/}
                <div>
                  <div className="border-b border-gray-300 pb-4">
                    <div className="flex-1 flex justify-between">
                      <div className="flex items-center">
                        <div>
                          <Cog size={20} className="mr-2 text-green-950" />
                        </div>
                        <div>
                          <h1 className="flex font-semibold text-[16px]">
                            Solicitação de Manutenção de Serviços
                          </h1>
                        </div>
                      </div>
                      <div>
                        <ChevronDown />
                      </div>
                    </div>
                  </div>
                </div>
                {/**/}
              </div>

              {/* grid-starts */}
              <div className="pt-8">
                <div>
                  <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5">
                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2  hover:shadow-md cursor-pointer">
                      <p className="flex items-center justify-center text-gray-600 text-sm font-medium">
                        Solicitar Serviços
                      </p>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="border border-gray-300 rounded-md px-4 py-2  hover:shadow-md cursor-pointer">
                      <p className="flex items-center justify-center text-gray-600 text-sm font-medium">
                        Consultar status de Serviços Solicitados
                      </p>
                    </div>
                    {/*  */}
                  </div>
                </div>
              </div>
              {/* grid-ends */}
            </div>
          </section>
          {/* services-resquests-maintenance-ends */}

          {/*  -------------------  */}

          <section className="px-10 py-10">
            <div>
              {/**/}
              <div>
                <div className="border-b border-gray-300 pb-4">
                  <div className="flex-1 flex justify-between">
                    <div className="flex items-center">
                      <div>
                        <Info size={20} className="mr-2 text-green-950" />
                      </div>
                      <div>
                        <h1 className="flex font-semibold text-[16px]">
                          Informativo
                        </h1>
                      </div>
                    </div>
                    <div>
                      <ChevronDown />
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
              {/**/}
              <div className="mt-4">
                <div>
                  <p className="text-justify">
                    Os registros da sala de situação são a essência da
                    documentação de todo o processo de Gestão de Saúde. Com a
                    introdução de novas tecnologias, a informação assume uma
                    importância crescente dentro da s instituições, tornando-se
                    fundamental e geradora de oportunidades de gestão de
                    processos. Nesse contexto, as informações produzidas pela
                    Sala de Situação podem ser definidas de forma que o conteúdo
                    presente na mesma contextualize ações sistematizadas e
                    organizadas na saúde e subsidia a tomada de decisão. Ao
                    adotar este método de planejamento estratégico, obtém-se
                    como resultado o bom funcionamento institucional,
                    evidenciando a relevância da mesma como um processo que
                    contribui para a transparência das ações
                    institucionais.Sendo assim, o registro preciso dos dados é a
                    condição para que este processo ocorra, ademais, trata-se de
                    documento público que por sua vez goza de fé pública, e,
                    portanto, de presunção de veracidade. {">>"} As informações
                    declaradas nesta plataforma, são de inteira responsabilidade
                    do Coordenador desta Unidade de saúde.{"<<"}
                  </p>
                </div>
              </div>
              {/**/}
            </div>
          </section>

          {/*  -------------------  */}
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default UbsForquilhasHomeUI;