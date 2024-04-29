import { Accordion, Badge, Dropdown } from "flowbite-react";
import EstablishmentEntity from "../../../../domain/entities/Establishment";




import { FiCalendar } from "react-icons/fi";
import CardNormative from "../../../Common/CardNormative";
import TransparencyActive from "../../../../domain/entities/TransparencyActive";
import TA from "../Partial/TA/TA";
import { AcordionMonthYear } from "../../../../utils/interface";
import { CalendarYear } from "../../../Common/CalendarYear";
import TF from "../Partial/TF/TF";
import TransparencyFocusEntity from "../../../../domain/entities/TransparencyFocus";
import TransparencyCollab from "../../../../domain/entities/TransparencyCollab";
import TC from "../Partial/TC";

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
  onSelectYearTC: (year: number) => void;
  selectedYearTC: number;
  onOpenMonthTC: (month: number) => void
  publicationsTC: AcordionMonthYear<TransparencyCollab>[];

  onSelectedYearTF: (year: number) => void;
  selectedYearTF: number;
  onOpenMonthTF: (month: number) => void;
  publicationsTF: AcordionMonthYear<TransparencyFocusEntity>[];
  handlePageInfo: () => void;
  handlePageSolicity: () => void;
  handlePageIndicators: () => void;
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
              onClick={props.handlePageInfo}
            ></CardNormative>
            <CardNormative
              title="Solicitud 
                de información"
              content={""}
              contrast="#A5C330"
              bgcolor="#FBFCF5"
              onClick={props.handlePageSolicity}
            ></CardNormative>
            <CardNormative
              title="Indicadores"
              content={""}
              contrast="#D26497 "
              bgcolor=""
              onClick={props.handlePageIndicators}
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
                  <p className=" text-sm xl:w-full w-auto  mt-8 font-medium mb-10">
                    La ley Orgánica de Transparencia y Acceso de la Información Pública
                    (LOTAIP) obliga a todas las instituciones del Estado que conforman
                    el sector público a difundir a través de la página web
                    institucional, información mínima actualizada de naturaleza
                    obligatoria.
                  </p>
                  <Dropdown label={
                    <>
                      <FiCalendar className="w-5 h-5 mr-5 "></FiCalendar>

                      Seleccionar año
                      <Badge className="ml-2" color="info">
                        {props.selectedYear}
                      </Badge>
                    </>

                  }
                    size={"md"}
                    arrowIcon={false}
                    dismissOnClick={true}

                  >



                    <CalendarYear
                      onSelect={props.onSelectYear}

                    />
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
                    Transparencia focalizada{" "}
                  </p>

                  <h2 className="text-2xl font-semibold mt-4">
                    {props.entity.name}
                  </h2>
                  <p className=" text-sm xl:w-full mt-8 font-medium mb-10">
                    La ley Orgánica de Transparencia y Acceso de la Información Pública
                    (LOTAIP) obliga a todas las instituciones del Estado que conforman
                    el sector público a difundir a través de la página web
                    institucional, información mínima actualizada de naturaleza
                    obligatoria.
                  </p>

                  <Dropdown label={
                    <>
                      <FiCalendar className="w-5 h-5 mr-5 "></FiCalendar>

                      Seleccionar año
                      <Badge className="ml-2" color="info">
                        {props.selectedYearTF}
                      </Badge>
                    </>

                  }
                    size={"md"}
                    arrowIcon={false}
                    dismissOnClick={true}

                  >



                    <CalendarYear onSelect={props.onSelectedYearTF} />
                  </Dropdown>

                  <div>
                    <Accordion className="mt-14" key={"TA"}>
                      {
                        props.meses.map((mes, index) => {
                          return (
                            <TF
                              data={props.publicationsTF.find(x => x.month == index + 1 && x.year == props.selectedYear)?.data || []}
                              month={mes}
                              number_month={index + 1}
                              year={2021}
                              key={index}
                              onOpen={(month) => props.onOpenMonthTF(month)}
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
                  <p className=" text-sm xl:w-full mt-8 font-medium mb-10">
                    La ley Orgánica de Transparencia y Acceso de la Información Pública
                    (LOTAIP) obliga a todas las instituciones del Estado que conforman
                    el sector público a difundir a través de la página web
                    institucional, información mínima actualizada de naturaleza
                    obligatoria.
                  </p>
                  <Dropdown label={
                    <>
                      <FiCalendar className="w-5 h-5 mr-5 "></FiCalendar>

                      Seleccionar año
                      <Badge className="ml-2" color="info">
                        {props.selectedYearTC}
                      </Badge>
                    </>

                  }
                    size={"md"}
                    arrowIcon={false}
                    dismissOnClick={true}

                  >



                    <CalendarYear onSelect={props.onSelectYearTC} />
                  </Dropdown>

                  <div >


                    <div>
                      <Accordion className="mt-14" key={"TA"}>
                        {
                          props.meses.map((mes, index) => {
                            return (
                              <TC
                                data={props.publicationsTC.find(x => x.month == index + 1 && x.year == props.selectedYear)?.data || []}
                                month={mes}
                                number_month={index + 1}
                                year={2021}
                                key={index}
                                onOpen={(month) => props.onOpenMonthTC(month)}
                              />
                            );
                          })
                        }
                      </Accordion>
                    </div>
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
