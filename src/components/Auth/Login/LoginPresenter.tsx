import { FormEvent } from "react";
import Title from "../../Common/Title/index";
import Input from "../../Common/Input";
import Contrasenia from "../../Common/Contrasenia/index";
import Alert from "../../Common/Alert";
import Spinner from "../../Common/Spinner";
import { Button } from "flowbite-react";
import logo from "../../../assets/Home/logo-dpe 2.png";
import Checkbox from "../../Common/Checkbox";


interface LoginPresenterProps {
  email: string;
  password: string;
  error: string | null;
  remenber: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setEmail: (e: string) => void;
  setPassword: (e: string) => void;
  setError: (e: string) => void;
  setRemenber: (value: boolean) => void;
  isloading?: boolean;
}

const LoginPresenter = ({ ...props }: LoginPresenterProps) => {
  return (
    <>

      <header className="border-b-2 border-dark-400 dark:border-primary-600">
        <nav className="bg-cyan-800 border-gray-900 px-4 lg:px-6 py-7 dark:bg-gray-800"></nav>
      </header>
      <div className="bg-white h-screen flex ">
        <div className="items-center lg:flex xl:flex 2xl:flex  pr-56 bg-emerald-50 h-full w-5/12  ">
          <div className=" border-l-2 border-gray-600 ml-2 md:ml-10  justify-items-start h-full "></div>
          <div className=" pl-10  ">
            <img
              src={logo}
              alt="imagen"
              className=" flex items-center justify-center  max-w-screen-2xl h-full "
            />
            <p className="mt-40 text-2xl text-slate-400 ">
              Portal <br /> Nacional <br />
              de Transparencia
            </p>
          </div>
        </div>
        <div className="absolute top-44 h-24 w-6 ml-7 bg-cyan-800  "></div>
        <div className="bg-white xl:w-2/6 2xl:w-2/6 lg:w-2/6 w-auto  text-center  items-center  ml-56  flex mb-16  ">
          <form
            className="border  border-slate-50 shadow-lg  rounded-lg text-center  items-center   "
            onSubmit={props.handleSubmit}
          >
            <Title title="Ingresar al Portal" text="" color="black" />
            <p className="text-lg text-center   text-slate-500  ">
              ¡Bienvenido! Por favor ingrese sus datos.
            </p>
            {props.error && (
              <Alert
                message={props.error}
                type="error"
                onClose={() => props.setError("")}
              />
            )}
            <div className="flex-row justify-center items-start mt-7 text-start ">
              <div className="flex flex-col m-2 items-center">
                <Input
                  type="text"
                  placeholder="Usuario"
                  className="w-80"
                  value={props.email}
                  onChange={(e) => props.setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col m-2 items-center">
                <Input
                  type="password"
                  placeholder="Contraseña"
                  className="w-80"
                  value={props.password}
                  onChange={(e) => props.setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col-2  mt-6  ">
                <div className="text-zinc-300 font-semibold text-sm ml-16">
                  <Checkbox
                    id={""}
                    checked={props.remenber}
                    onChange={() => {}}
                    label={"Recordarme por 30 días"}
                  />
                </div>
                <div className="text-primary-500 text-sm -ml-5 font-semibold">
                  {" "}
                  <Contrasenia
                    text="Reiniciar Contraseña"
                    path="/auth/forgot-password"
                  />
                </div>{" "}
              </div>

              {props.isloading ? (
                <Spinner />
              ) : (
                <div className="flex flex-col m-2 items-center">
                  <Button
                    className="w-80 justify-center flex bg-primary-600 rounded-3xl"
                    type="submit"
                  >
                    Ingresar
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col-2  mt-6  ">
              <span className="ml-24  text-slate-500  ">
                ¿Aún no tienes cuenta?
              </span>
              <div className="text-primary-500 text-base font-semibold -ml-7">
                <Contrasenia text="Registrate" path="/registro" />{" "}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPresenter;
