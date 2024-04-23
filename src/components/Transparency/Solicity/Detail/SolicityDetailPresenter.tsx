import { Label } from "flowbite-react";


import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Solicity } from "../../../../domain/entities/Solicity";
import ScreenMessage from "../../../Common/ScreenMessage/ScreenMessage";

interface Props {

  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  error: string;
  data: CreateSolicity;
  entitySelected: EstablishmentEntity;
  solicitySaved: Solicity;
  isLoadingSend: boolean;
  children?: React.ReactNode;
}
const SolicityDetailPresenter = (props: Props) => {
  if (props.error) {
    return (
      <ScreenMessage message={"Error al obtener tu solicitud"}
        type={props.error}>
        {props.children}

      </ScreenMessage>
    )
  }

  return (
    <div className="m-5">
      <ToastContainer />
      <div className="border-gray-300 py-5 border-b  ">
        <h2 className="text-2xl font-bold text-black ">
          Formulario de Solicitud de Acceso a la Información Pública (SAIP)
        </h2>
      </div>
      <form
        className="flex flex-col lg:flex-row mt-10"

      >
        <div className="container flex-col sm:flex-col sm:items-center sm:justify-between   ">


          <div className=" flex  flex-col-2 m-2 h-[44px]  mt-5 gap-32">
            <Label
              htmlFor=""
              value="No.SAIP"
              className="mt-2 text-base font-semibold"
            />

            <p className="mt-2">
              {props.data.number_saip}
            </p>
          </div>

          <div className=" flex  flex-col-2 m-2 h-[50px]  mt-5 gap-14">
            <Label
              htmlFor=""
              value="Nombre Entidad"
              className="mt-2 text-base font-semibold"
            />
            <p className="mt-2">

              {props.entitySelected ? props.entitySelected.name
                : ""}
            </p>

          </div>
          <div className="flex flex-col-2 ml-2 gap-12">
            <div className=" flex  flex-col-2  h-[44px]  mt-5 gap-20">
              <Label
                htmlFor=""
                value="No. RUC entidad"
                className="mt-2 text-base font-semibold"
              />
              <p className="mt-2">

                {props.entitySelected.identification}
              </p>

            </div>
            <div className=" flex  flex-col-2 m-2 h-[44px]  mt-5 gap-3">
              <Label
                htmlFor=""
                value="Fecha"
                className="mt-2 text-base font-semibold"
              />
              <p className="mt-3">
                {props.solicitySaved.date}
              </p>
            </div>
          </div>
          <div className=" flex ml-2  flex-col-2 m h-[44px]  mt-5 gap-36">
            <Label
              htmlFor=""
              value="Ciudad"
              className="mt-2 text-base font-semibold"
            />
            <p className="mt-2">

              {props.data.city}
            </p>
          </div>

          <div
            className=" xl:grid-rows-3  lg:grid-rows-3 
           xl:grid-flow-col gap-6 w-auto "
          >
            <h2 className="text-2xl pl-72 font-bold text-black  my-9">
              Identificación de la Persona Solicitante
            </h2>
            <div className=" flex  flex-col-2 m-2 h-[44px] gap-32  ">
              <Label
                htmlFor=""
                value="Nombre"
                className="mt-2 text-base font-semibold"
              />
              <p className="mt-2">

                {props.data.first_name}
              </p>
            </div>

            <div className=" flex  flex-col-2 m-2 h-[44px]  mt-5 gap-32 ">
              <Label
                htmlFor=""
                value="Apellido"
                className="mt-2 text-base font-semibold"
              />
              <p className="mt-2">

                {props.data.last_name}

              </p>

            </div>
            <div className=" flex  flex-col-2 m-2 h-[44px] mt-5 gap-12">
              <Label
                htmlFor=""
                value="Correo Electrónico"
                className="mt-2 text-base font-semibold"
              />
              <p className="mt-2">

                {props.data.email}
              </p>
            </div>

            <div className=" flex  flex-col-2 m-2 h-[44px]  mt-5 gap-12">
              <Label
                htmlFor=""
                value="Teléfono Contacto"
                className="mt-2 text-base font-semibold"
              />
              <p className="mt-2">

                {props.data.phone}
              </p>

            </div>

            <div className=" flex  flex-col-2 m-2 h-[50px]  mt-5 gap-32">
              <Label
                htmlFor=""
                value="Género"
                className="mt-2 text-base font-semibold"
              />
              {props.solicitySaved.gender}

            </div>
            <div className="ml-2  flex  flex-col-2 m-2 h-[50px]  mt-5 gap-5">
              <Label
                htmlFor=""
                value="Identificación Cultural"
                className="mt-2 text-base font-semibold"
              />

              {props.solicitySaved.race_identification}
            </div>
          </div>
          <div></div>

          <div className="ml-2  grid grid-cols gap-4  mt-16 ">
            <Label
              htmlFor=""
              value="Petición completa"
              className="text-xl font-bold "
            />
            {props.data.text}
          </div>

          <h2 className="ml-2 text-xl font-bold text-black  mt-7">
            Forma de Recepción de la información
          </h2>

          <div className="ml-2 grid xl:grid-flow-col xl:grid-col-2 lg:grid-cols-2 grid-cols-1 gap-2  mt-5  ">
            <div className=" flex  flex-col  h-[44px]  xl:w-[438px] ">
              {props.solicitySaved.format_send


              }
            </div>

            <div className=" flex  flex-col -ml-20 h-[44px]  w-[395px] ">
              {props.solicitySaved.format_receipt}

            </div>
          </div>

          {/*<div className=" grid grid-cols gap-4 w-auto mt-16">
            <Label
              htmlFor=""
              value="Respuesta de la Entidad"
              className="text-xl font-bold "
            />
            <Textarea
              placeholder="Escribe la petición"
              className="h-[139px] xl:w-[915px]  "
              name="description"
              onChange={props.onChange}
            ></Textarea>
          </div>
          <div className=" grid grid-cols gap-4 w-auto mt-16">
            <Label
              htmlFor=""
              value="Insistencia Ciudadana"
              className="text-xl font-bold "
            />
            <Textarea
              placeholder="Escribe la petición"
              className="h-[139px] xl:w-[915px]  "
              name="description"
              onChange={props.onChange}
            ></Textarea>
          </div>
          <div className=" grid grid-cols gap-4 w-auto mt-16">
            <Label
              htmlFor=""
              value="Respuesta a la Insistencia Ciudadana"
              className="text-xl font-bold "
            />
            <Textarea
              placeholder="Escribe la petición"
              className="h-[139px] xl:w-[915px]  "
              name="description"
              onChange={props.onChange}
            ></Textarea>
          </div>*/}


        </div>
      </form>
      {props.children}
    </div>
  );
};

export default SolicityDetailPresenter;
