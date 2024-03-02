import { FormEvent } from "react";
import { Button } from "flowbite-react";
import Spinner from "../../../Common/Spinner";
import { FaPen, FaArrowUp } from "react-icons/fa";
import Dropzone from "../../../Common/Dropzone";
import { Label, TextInput } from "flowbite-react";

interface Props {

  title: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onEdit: () => void;

  setData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChageLogo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  error: string;
  success: string;
  setError: (e: string) => void;
  setSuccess: (e: string) => void;
}

const ActiveCreatePresenter = (props: Props) => {
  return (
    <div className="container">
      <div className="flex items-center py-2 justify-center"></div>
      <form className="flex  -top-32 " >
        <section className="container px-2 mx-auto w-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-2xl font-medium text-gray-800 dark:text-white">
                  Transparencia Activa
                </h2>
              </div>
              <div className="flex items-center gap-x-3 mt-20">
              </div>
             <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {props.title}
                </p>

              <p className="mt-6 text-base text-gray-500 dark:text-gray-300 pl-96 mr-10 font-semibold ">
                Elija un método de carga
              </p>
            </div>

            <div className="flex items-center mt-4 +
                w-auto gap-x-3">
              <Button
                type="button"
                onClick={props.onEdit}
                className="flex items-center justify-center w-1/2 text-sm tracking-wide
                            text-black transition-colors duration-200 bg-slate-100 rounded-lg shrink-0 sm:w-auto gap-x-2 dark:hover:bg-blue-200 border-slate-300"
              >
                <FaPen className="w-5 h-5 " />
                <span>Editar</span>
              </Button>
              {props.loading ? (
                <Spinner />
              ) : (
                <Button
                  type="submit"
                  className="flex items-center justify-center w-1/2 text-sm tracking-wide
                            text-white transition-colors duration-200  bg-primary-700  rounded-lg shrink-0 sm:w-auto gap-x-2 dark:hover:bg-blue-500"
                >
                  <FaArrowUp className="w-5 h-5 font-normal" />
                  <span>Cargar</span>
                </Button>
              )}
            </div>
          </div>
        <div className="container">
            <div className="grid grid-rows-3 grid-flow-col flex-col mt-9 text- h-96  ml-14 mr-40 gap-32">
              <div className=" flex  flex-col m-2  ">
                <Dropzone
                  handleChageLogo={props.onChageLogo}
                  id="logo"
                  multiple={false}
                  type="image"
                  label="Data"
                  name="logo"
                  accept="image/*"
                  
                />
              </div>
              <div className=" flex flex-col m-2 ">
                <Dropzone
                  handleChageLogo={props.onChageLogo}
                  id="logo"
                  multiple={false}
                  type="image"
                  label="Metadatos"
                  name="logo"
                  accept="image/*"
                />
              </div>
              <div className=" flex  flex-col m-2 ">
                <Dropzone
                  handleChageLogo={props.onChageLogo}
                  id="logo"
                  multiple={false}
                  type="image"
                  label="Diccionario de Datos"
                  name="logo"
                  accept="image/*"
                />
              </div>

              <div className="border-l-2 border-gray-300 h-max ml-2 ">
        
                <div className=" mt-2 ml-28">
                  <div className=" flex  flex-col m-2 w-60 mt-4  ">
                    <Label htmlFor="" value="Link archivo de datos" />
                    <TextInput placeholder="Ingresar link" type="Url" />
                  </div>

                  <div className=" flex  flex-col m-2 w-60 mt-24">
                    <Label htmlFor="" value="Link archivo de datos" />
                    <TextInput placeholder="Ingresar link" type="Url" />
                  </div>

                  <div className=" flex  flex-col m-2 w-60 mt-24">
                    <Label htmlFor="" value="Link archivo de datos" />
                    <TextInput placeholder="Ingresar link" type="Url" />
                  </div>
                </div>
            
            </div>
          </div>
          </div>
        
        </section>
      </form>
    </div>
  );
};

export default ActiveCreatePresenter;
