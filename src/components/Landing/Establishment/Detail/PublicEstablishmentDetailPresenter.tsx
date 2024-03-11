import { Button, Checkbox, TextInput } from "flowbite-react";
import EstablishmentEntity from "../../../../domain/entities/Establishment";

import PublicationEntity from "../../../../domain/entities/PublicationEntity";

import CreatableSelect from "react-select/creatable";

import { CiMenuBurger } from "react-icons/ci";

import { FiCalendar } from "react-icons/fi";
import TableInfo from "../../../Common/TableInfo";

import { CiSearch } from "react-icons/ci";
import CardNormative from "../../../Common/CardNormative";

interface Props {
  entity: EstablishmentEntity;
  error: string;
  loading: boolean;
  publications: PublicationEntity[];
  total: number;
  totalPages: number;
  from: number;
  to: number;
  current_page: number;
  onChangePage: (page: number) => void;
  onItemPublicationClick: (slug: string) => void;

  onSearch: (search: string) => void;
}

const PublicEstablishmentDetailPresenter = (props: Props) => {
  return (
    <div className="border-l-2 border-gray-400  ml-0 md:ml-14">
      <div className=" flex flex-col w-full  bg-white lg:pr-10 relative ">
        <div className=" relative search mt-20 lg:mt-8  h-auto justify-center flex ml-48   rounded-full border-black flex-auto  ">
          <div className=" !absolute  -top-32 left-0">
            <TextInput
              icon={CiSearch}
              id="buscar"
              type="text"
              placeholder="Buscar por entidad pública"
              alt="Buscar por entidad pública, por ejemplo: Ministerio de Educación"
              className="w-[386px]  mt-4 mr-[150px]  border-black text-center "
              tabIndex={7}
              sizing="lg"
            />
          </div>
        </div>
        <div></div>
        <div className="container  w-screen px-20">
          <h2 className="text-4xl mb-12 mt-8 font-bold">
            {props.entity.name}
          </h2>
          <div className="mb-2">
            <span className="font-bold -ml-0 text-base text-black m-1  dark:text-white ">
              Nombre de la máxima autoridad:
            </span>
            {props.entity.first_name_authority +
              " " +
              props.entity.last_name_authority}
          </div>
          <div className="mb-2">
            <span className="font-bold -ml-0 text-base text-black m-1 dark:text-white">
              Cargo de la Máxima Autoridad:
            </span>
            {
              props.entity.highest_authority
            }
          </div>
          <div className="mb-2">
            <span className="font-bold -ml-0 m-1 text-gray-800 dark:text-white">
              Correo de la Máxima Autoridad:
            </span>
            {props.entity.email_authority}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 pr-60 text-sm w-[1000px] border-b h-auto mt-11  ">
            <CardNormative
              title="Información 
                publicada 
                hasta el 
                momento "
              content={""}
              contrast="#F7941D"
              bgcolor="#FFFAF4"
            ></CardNormative>
            <CardNormative
              title="Solicitud 
                de información"
              content={""}
              contrast="#A5C330"
              bgcolor="#FBFCF5"
            ></CardNormative>
            <CardNormative
              title="Indicadores"
              content={""}
              contrast="#D26497 "
              bgcolor=""
            ></CardNormative>
          </div>

          <div className="mb-2  text-gray-400 mt-14 w-[759px] ">
            <CreatableSelect
              placeholder={"Transparencia Activa"}
              isClearable
              options={[]}
              isMulti={true}
              onInputChange={() => { }}
              onCreateOption={() => { }}
              onChange={() => { }}
            />
          </div>

          <p className="text-start text-lg font-medium mt-14">
            Transparencia activa{" "}
          </p>

          <h2 className="text-2xl font-semibold mt-4">
            {props.entity.name}
          </h2>
          <p className=" text-sm w-[697px] mt-8 font-medium">
            La ley Orgánica de Transparencia y Acceso de la Información Pública
            (LOTAIP) obliga a todas las instituciones del Estado que conforman
            el sector público a difundir a través de la página web
            institucional, información mínima actualizada de naturaleza
            obligatoria.
          </p>

          <Button
            type="button"
            onClick={() => { }}
            className="flex items-center justify-center w-1/2 text-lg tracking-wide
                                text-gray-700 font-semibold bg-gray-200 rounded-md border-gray-300 border-2  sm:w-auto gap-x-2 hover:bg-slate-400 mt-12 mb-10 "
          >
            <span className="flex col-2 gap-6 ">
              <FiCalendar className="w-5 h-5" />
              Seleccionar año
            </span>
          </Button>
          <div className="w-auto pr-32">


            <TableInfo
              columns={[
                {
                  render: () => <p>{""}</p>,

                  title: <><Checkbox className="mr-5" />{"filename"}</>,
                  classname: "w-70",
                },
                {
                  render: () => <p>{""}</p>,
                  title: "Tamaño de archivo",
                },
                {
                  render: () => <p>{ }</p>,
                  title: "Fecha de carga",
                },
                {
                  render: () => <p>{""}</p>,
                  title: "Fecha de actualización",
                },
                {
                  render: () => <p>{""}</p>,
                  title: "Cargado por",
                },
                {
                  render: () => (
                    <p>
                      {" "}
                      <button
                        onClick={() => { }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
                      >
                        <CiMenuBurger />
                      </button>
                    </p>
                  ),
                  title: "",
                },
              ]}
              title={""}

              onFilter={function (type: string): void {
                throw new Error("Function not implemented." + type);
              }}
              data={[]}


            />
          </div>
        </div>
        <div className="mb-2  text-gray-400 mt-14 w-[759px] ">
          <CreatableSelect
            placeholder={"Transparencia focaalizada"}
            isClearable
            options={[]}
            isMulti={true}
            onInputChange={() => { }}
            onCreateOption={() => { }}
            onChange={() => { }}
          />
        </div>
        <div className="mb-20 text-gray-400 mt-14 w-[759px] ">
          <CreatableSelect
            placeholder={"Transparencia colaborativa"}
            isClearable
            options={[]}
            isMulti={true}
            onInputChange={() => { }}
            onCreateOption={() => { }}
            onChange={() => { }}
          />
        </div>
      </div>
    </div>

  );
};
export default PublicEstablishmentDetailPresenter;
