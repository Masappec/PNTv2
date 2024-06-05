import { Accordion, Badge, Dropdown } from "flowbite-react";
import EstablishmentEntity from "../../../../domain/entities/Establishment";




import { FiCalendar } from "react-icons/fi";
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


return(
  <main>
    <section className='section-container my-16'>
      <h1 className='mb-4 w-full text-balance text-2xl font-semibold leading-tight md:text-[40px]'>
       {props.entity.name}
      </h1>

      <ul className='mb-12 mt-8'>
        <li className='mb-2 flex items-center gap-x-2'>
          <h2 className='text-xl font-medium text-gray-600'>Máxima Autoridad</h2>
        </li>
        <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
          <h2 className='font-medium text-gray-600'>Nombre:</h2>
          <h3 className='font-medium'>{
            props.entity.first_name_authority +
            " " +
            props.entity.last_name_authority
          }</h3>
        </li>
        <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
          <h2 className='font-medium text-gray-600'>Cargo:</h2>
          <h3 className='font-medium'>{
            props.entity.highest_authority
          }</h3>
        </li>
        <li className='flex flex-col items-start justify-start gap-x-2 sm:flex-row'>
          <span className='font-medium text-gray-600'>Correo electrónico:</span>
          <a href='#' className='group flex items-center gap-x-2 hover:text-primary'>
            <span className='text-pretty text-base font-medium underline underline-offset-2'>
              {props.entity.email_authority}
            </span>
          </a>
        </li>
      </ul>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <article
        onClick={props.handlePageInfo}
          className='group flex h-full w-full cursor-pointer flex-col items-start justify-between gap-4 bg-[#198FB1]/80 px-8 py-8 text-white'>
          <h3 className='max-w-sm text-balance text-2xl font-bold group-hover:text-gray-800'>
            Ver Información publicada hasta el momento
          </h3>

          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 transition group-hover:translate-x-4 group-hover:text-gray-800'>
            <path
              d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
              fill='currentColor'
              fill-rule='evenodd'
              clip-rule='evenodd'></path>
          </svg>
        </article>

        <article
        onClick={props.handlePageSolicity}
          className='group flex h-full w-full cursor-pointer flex-col items-start justify-between gap-4 bg-[#F15A31]/80 px-8 py-8 text-white'>
          <h3 className='max-w-sm text-balance text-2xl font-bold group-hover:text-gray-800'>
            Solicitar Información
          </h3>

          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 transition group-hover:translate-x-4 group-hover:text-gray-800'>
            <path
              d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
              fill='currentColor'
              fill-rule='evenodd'
              clip-rule='evenodd'></path>
          </svg>
        </article>

        <article
        onClick={props.handlePageIndicators}
          className='group flex h-full w-full cursor-pointer flex-col items-start justify-between gap-4 bg-[#F7941D]/80 px-8 py-8 text-white'>
          <h3 className='max-w-sm text-balance text-2xl font-bold group-hover:text-gray-800'>
            Ver Indicadores
          </h3>

          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 transition group-hover:translate-x-4 group-hover:text-gray-800'>
            <path
              d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
              fill='currentColor'
              fill-rule='evenodd'
              clip-rule='evenodd'></path>
          </svg>
        </article>
      </div>

      <section className='my-16 flex flex-col gap-y-4 md:flex-row md:items-end'>
        <h2 className='text-balance text-2xl font-normal leading-tight md:text-[40px]'>
          Información publicada
        </h2>
        <div className='h-[1px] w-full bg-gray-400'></div>
      </section>
    <Accordion className="mt-28 mb-24" collapseAll>
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
              <Accordion className="mt-14" key={"TA"} >
                {
                  props.meses.map((mes, index) => {
                    return (
                      <TA
                        data={props.publications.find(x => x.month == index + 1 && x.year == props.selectedYear)?.data || []}
                        month={mes}
                        number_month={index + 1}
                        year={props.selectedYear}
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
                        year={props.selectedYear}
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
                          year={props.selectedYear}
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

    </section>

  </main>
)
  
};
export default PublicEstablishmentDetailPresenter;
