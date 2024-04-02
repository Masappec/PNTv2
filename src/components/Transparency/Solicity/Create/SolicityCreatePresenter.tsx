import { FormEvent } from "react";
import { Button, TextInput, Textarea } from 'flowbite-react';
import { Label } from 'flowbite-react';

import Select from "../../../Common/Select";
import { IoSaveOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";


interface Props {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}
const SolicityCreatePresenter = (props: Props) => {

  return (


    <div>
      <div className="border-gray-300 py-5 border-b  ">
        <h2 className="text-2xl font-semibold text-black ml-11">
          Solicitud de información
        </h2>
      </div>
      <form className="flex flex-col lg:flex-row mt-10" onSubmit={props.handleSubmit}>
        <div className="container flex-col sm:flex-col sm:items-center sm:justify-between   ">



          <div className="flex ml-2">
            <Select
              className="lg:w-[720px] xl:w-[720px] h-[48px] w-full "
              placeholder={"Seleccionar institución pública"}
              value={""}
              onChange={() => { }}
              options={[
                {
                  value: "",
                  label: "Institución seleccionada",
                },
              ]}
            />
          </div>




          <div className="grid xl:grid-rows-3  lg:grid-rows-3 
           xl:grid-flow-col gap-6 w-auto  gap-x-16 ">


            <div className=" flex  flex-col m-2 h-[44px]  w-[320px] gap-4 mt-5  ">
              <Label htmlFor="" value="Nombre" />
              <TextInput placeholder="" type="text"
                name="first_name"
                onChange={props.onChange}

              />{" "}
            </div>




            <div className=" flex  flex-col m-2 h-[44px] gap-4 mt-5 w-[320px] ">
              <Label htmlFor="" value="Email" />
              <TextInput placeholder="" type="email"
                name="email"
                onChange={props.onChange}
              />
            </div>
            <div className=" flex  flex-col m-2 h-[44px] gap-4 mt-5 w-[320px]">
              <Label
                htmlFor=""
                value="Dirección"
              />
              <TextInput placeholder="" type="text"
                name="address"
                onChange={props.onChange}
              />{" "}
            </div>
            <div className=" flex  flex-col m-2 h-[44px] gap-4 mt-5 w-[320px] ">
              <Label htmlFor="" value="Apellido" />
              <TextInput placeholder="" type="text"
                name="last_name"
                onChange={props.onChange}

              />
            </div>

            <div className=" flex  flex-col m-2 h-[44px] gap-4 mt-5 w-[320px]">
              <Label
                htmlFor=""
                value="Cédula"
              />
              <TextInput placeholder="" type="number"
                onChange={props.onChange}
                name="identification"
              />{" "}
            </div>

            <div className=" flex  flex-col m-2 h-[44px] gap-4 mt-5 w-[320px] ">
              <Label
                htmlFor=""
                value="Teléfono"
              />
              <TextInput placeholder="" type="tel"
                name="phone"
                onChange={props.onChange}
              />{" "}
            </div>


          </div>
          <div></div>


          <div className=" grid grid-cols gap-4 w-auto  mt-16">
            <Label
              htmlFor=""
              value="Petición completa"
            />
            <Textarea
              placeholder="Escribe la petición"
              className="h-[66px] xl:w-[720px]"
              name="description"
              onChange={props.onChange}
            ></Textarea>
          </div>




          <div className="grid xl:grid-flow-col xl:grid-col-2 lg:grid-cols-2 grid-cols-1 gap-4 gap-x-16 mt-5  ">

            <div className=" flex  flex-col m-2 h-[44px]  xl:w-[320px] ">
              <Select

                placeholder={"Forma de recepción"}
                name="type_reception"
                onChange={props.onChange}
                options={[
                  {
                    value: "",
                    label: "Retiro en la institución ",
                  },
                ]}
              />
            </div>



            <div className=" flex  flex-col m-2 h-[44px]  w-[320px] ">
              <Select

                placeholder={"Formato de entrega"}
                name="formatSolicity"
                onChange={props.onChange}
                options={[
                  {
                    value: "",
                    label: "Formato digital",
                  },
                ]}
              />
            </div>
          </div>



          <div className="flex gap-x-3 mt-24 xl:ml-80 xl:pl-16 mb-14 text-6xl">

            <Button
              type="submit"
              className=" text-gray-900 bg-white border-gray-300 font-bold border">
              <IoSaveOutline size={22} className=" mr-4 text-gray-900" />
              <span>
                Guardar
              </span>
            </Button>
            <Button
              type="button"
              onClick={props.onCancel}
              className="text-white font-bold bg-sky-800">
              <FiSend size={23} className=" mr-4" />
              <span>
                Enviar solicitud
              </span>
            </Button>


          </div>




        </div>

      </form>







    </div>
  )
}

export default SolicityCreatePresenter