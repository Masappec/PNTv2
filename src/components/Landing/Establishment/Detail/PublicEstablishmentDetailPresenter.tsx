import { Accordion, Badge, Button, Checkbox, Dropdown } from "flowbite-react";
import EstablishmentEntity from "../../../../domain/entities/Establishment";



import { CiMenuBurger } from "react-icons/ci";

import { FiCalendar } from "react-icons/fi";
import TableInfo from "../../../Common/TableInfo";
import CardNormative from "../../../Common/CardNormative";
import TransparencyActive from "../../../../domain/entities/TransparencyActive";
import TA from "../Partial/TA/TA";
import { AcordionMonthYear } from "../../../../utils/interface";

interface Props {
  entity: EstablishmentEntity;
  error: string;
  loading: boolean;
  publications: AcordionMonthYear<TransparencyActive>[];
  onChangePage: (page: number) => void;
  onItemPublicationClick: (slug: string) => void;

  onSearch: (search: string) => void;
  meses: string[];
  years: number[];
  onSelectYear: (year: number) => void;
  selectedYear: number;
  onOpenMonth: (month: number) => void
}

const PublicEstablishmentDetailPresenter = (props: Props) => {
  return (
    <div className="border-l-2 border-gray-800  ml-10 md:ml-14">
      <div className=" flex flex-col  bg-white lg:pr-10 relative ">

        <div></div>
        <div className="container px-5 xl:px-20">
          <h2 className="text-4xl mb-12 xl:mt-8 font-bold">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 xl:pr-60 text-sm 
          xl:w-wull  border-b h-auto mt-11  ">
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

          <Accordion className="mt-28 mb-24">
            <Accordion.Panel>
              <Accordion.Title>
                <p className="text-start text-black text-lg font-medium">
                  Transparencia activa{" "}
                </p>
              </Accordion.Title>
              <Accordion.Content>
                <>
                  <p className="text-start text-lg font-medium mt-14">
                    Transparencia activa{" "}
                  </p>

                  <h2 className="text-2xl font-semibold mt-4">
                    {props.entity.name}
                  </h2>
                  <p className=" text-sm xl:w-full w-auto  mt-8 font-medium">
                    La ley Orgánica de Transparencia y Acceso de la Información Pública
                    (LOTAIP) obliga a todas las instituciones del Estado que conforman
                    el sector público a difundir a través de la página web
                    institucional, información mínima actualizada de naturaleza
                    obligatoria.
                  </p>
                  <Dropdown label={
                    <>
                      Seleccionar año
                      <FiCalendar className="w-5 h-5 ml-5"></FiCalendar>
                      {props.selectedYear ? <Badge className="ml-3">{props.selectedYear}</Badge> : ""}
                    </>

                  }
                    size={"lg"}
                    arrowIcon={false}
                    dismissOnClick={true}
                    className="flex items-center justify-center 
                     text-lg tracking-wide
                     rounded-xl 
                     "

                  >
                    {
                      props.years.map(_y => (
                        <Dropdown.Item
                          onClick={() => props.onSelectYear(_y)}>{_y}</Dropdown.Item>

                      ))
                    }
                  </Dropdown>


                  <div className="">
                    <Accordion className="mt-14" key={"TA"}>
                      {
                        props.meses.map((mes, index) => {
                          return (
                            <TA
                              data={props.publications.find(x => x.month == index + 1 && x.year == props.selectedYear)?.data || []}
                              month={mes}
                              number_month={index + 1}
                              year={2021}
                              key={index}
                              onOpen={(month) => props.onOpenMonth(month)}
                            />
                          );
                        })
                      }
                    </Accordion>


                  </div>


                </>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                <p className="text-start  text-black text-lg font-medium">

                  Transparencia focalizada

                </p>
              </Accordion.Title>
              <Accordion.Content>
                <>
                  <p className="text-start text-lg font-medium mt-14">
                    Transparencia activa{" "}
                  </p>

                  <h2 className="text-2xl font-semibold mt-4">
                    {props.entity.name}
                  </h2>
                  <p className=" text-sm xl:w-full mt-8 font-medium">
                    La ley Orgánica de Transparencia y Acceso de la Información Pública
                    (LOTAIP) obliga a todas las instituciones del Estado que conforman
                    el sector público a difundir a través de la página web
                    institucional, información mínima actualizada de naturaleza
                    obligatoria.
                  </p>

                  <Button
                    type="button"
                    onClick={() => { }}
                    className="flex 
                                         rounded-xl

                    items-center justify-center w-1/2 text-lg tracking-wide
                                text-gray-700 font-semibold bg-gray-200  border-gray-300 border-2  sm:w-auto gap-x-2 hover:bg-slate-400 mt-12 mb-10 "
                  >
                    <span className="flex col-2 gap-6 ">
                      <FiCalendar className="w-5 h-5" />
                      Seleccionar año
                    </span>
                  </Button>
                  <div>


                    <TableInfo<TransparencyActive>
                      columns={[
                        {
                          render: (row) => <p>{row.numeral}</p>,

                          title: <><Checkbox className="mr-5" />{"Numeral"}</>,
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
                </>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                <p className="text-start text-black text-lg font-medium">

                  Transparencia colaborativa
                </p>
              </Accordion.Title>
              <Accordion.Content>
                <>
                  <p className="text-start text-lg font-medium mt-14">
                    Transparencia colaborativa{" "}
                  </p>

                  <h2 className="text-2xl font-semibold mt-4">
                    {props.entity.name}
                  </h2>
                  <p className=" text-sm xl:w-full mt-8 font-medium">
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
                                text-gray-700 font-semibold bg-gray-200 rounded-xl border-gray-300 border-2  sm:w-auto gap-x-2 hover:bg-slate-400 mt-12 mb-10 "
                  >
                    <span className="flex col-2 gap-6 ">
                      <FiCalendar className="w-5 h-5" />
                      Seleccionar año
                    </span>
                  </Button>
                  <div >


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
                </>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>


        </div >

      </div >
    </div >

  );
};
export default PublicEstablishmentDetailPresenter;
