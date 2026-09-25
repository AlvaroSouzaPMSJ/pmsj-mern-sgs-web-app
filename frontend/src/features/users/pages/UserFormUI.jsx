import { React, useState } from "react";
import {
  ChartNoAxesCombined,
  ChevronDown,
  HeartPulse,
  LayoutDashboard,
  Mail,
  MapPinHouse,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../app/routing/routes.constants";
import Footer from "../../../app/layouts/Footer";
import GNavbar from "../../../app/layouts/GNavbar";

const UserFormUI = () => {
  //
  const navigate = useNavigate();
  //
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
    phone: "",
    role: "",
  });
  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  //
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        {/* */}
        <GNavbar />

        {/* header-starts */}
        <div className="w-full relative">
          <div>
            <div className="w-full h-20 object-cover"></div>
          </div>
          <h1 className="absolute top-12 bottom-4 left-10 text-3xl text-gray-800 font-bold drop-shadow">
            <span className="font-normal mr-1">Painel do</span> Administrador
          </h1>
        </div>
        {/* header-starts */}

        {/* */}
        <section className="px-10 py-16">
          <div>
            <div>
              {/**/}
              <div>
                <div className="border-b border-gray-300 pb-4">
                  <div className="flex-1 flex justify-between">
                    <div className="flex items-center">
                      <div>
                        <LayoutDashboard
                          size={20}
                          className="mr-2 text-green-950"
                        />
                      </div>
                      <div>
                        <h1 className="flex font-semibold text-[16px]">
                          Cadastrar Usuário
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

            {/* form-starts */}
            <form onSubmit={handleSubmit} className="pt-8">
              <div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                  {/*  */}
                  <div className="flex-1 items-center">
                    <div>
                      <label
                        htmlFor="name"
                        className="mr-2 text-sm font-bold text-gray-800"
                      >
                        Nome
                      </label>
                      <span className="text-[11px] ">(Obrigatório)</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border rounded-md py-2 border-gray-300 w-full bg-white"
                        placeholder="digite o nome completo"
                      />
                    </div>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="flex-1 items-center">
                    <div>
                      <label
                        htmlFor="email"
                        className="mr-2 text-sm font-bold text-gray-800"
                      >
                        e-Mail
                      </label>
                      <span className="text-[11px] ">(Obrigatório)</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border rounded-md py-2 border-gray-300 w-full bg-white"
                        placeholder="digite email"
                      />
                    </div>
                  </div>
                  {/*  */}

                                  {/*  */}
                  <div className="flex-1 items-center">
                    <div>
                      <label
                        htmlFor="password"
                        className="mr-2 text-sm font-bold text-gray-800"
                      >
                        Senha
                      </label>
                      <span className="text-[11px] ">(Obrigatório)</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="border rounded-md py-2 border-gray-300 w-full bg-white"
                        placeholder="digite a senha"
                      />
                    </div>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="flex-1 items-center">
                    <div>
                      <label
                        htmlFor="cpf"
                        className="mr-2 text-sm font-bold text-gray-800"
                      >
                        CPF
                      </label>
                      <span className="text-[11px] ">(Obrigatório)</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                        pattern="\d{11}"
                        title="CPF deve conter 11 dígitos"
                        className="border rounded-md py-2 border-gray-300 w-full bg-white"
                        placeholder="digite o cpf"
                      />
                    </div>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="flex-1 items-center">
                    <div>
                      <label
                        htmlFor="fone"
                        className="mr-2 text-sm font-bold text-gray-800"
                      >
                        Fone
                      </label>
                      <span className="text-[11px] ">(Obrigatório)</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="fone"
                        name="fone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="\+\d{10,15}"
                        title="Fone deve conter entre 10 e 15 dígitos"
                        className="border rounded-md py-2 border-gray-300 w-full bg-white"
                        placeholder="digite o fone"
                      />
                    </div>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="flex-1 items-center">
                    <div>
                      <label
                        htmlFor="role"
                        className="mr-2 text-sm font-bold text-gray-800"
                      >
                        Cargo
                      </label>
                      <span className="text-[11px] ">(Obrigatório)</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="border rounded-md py-2 border-gray-300 w-full bg-white"
                        placeholder="digite o cargo"
                      />
                    </div>
                  </div>
                  {/*  */}
                </div>
              </div>
              {/* button-starts */}
              <div className="flex justify-end mt-20 border-t border-gray-300">
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="border border-gray-300 rounded px-5 py-2 cursor-pointer hover:shadow-md bg-white hover:bg-gray-50 font-bold text-gray-800 mr-4">
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="border border-gray-300 rounded px-5 py-2 cursor-pointer hover:shadow-md bg-blue-500 hover:bg-blue-400 font-bold text-white"
                  >
                    Registar
                  </button>
                </div>
              </div>
              {/* button-ends */}
            </form>
            {/* grid-ends */}
          </div>
        </section>
        {/* */}

        {/* footer-starts */}
        <footer className="">
          <Footer />
        </footer>
        {/* footer-ends */}
      </main>
    </>
  );
};

export default UserFormUI;
