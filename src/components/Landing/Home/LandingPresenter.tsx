import Hero from "../../Common/Hero";
import CardQuestion from "../../Common/CardQuestion";
import { FormattedMessage } from "react-intl";
import CardConsulta from "../../Common/Card";
import { FrequencyAsked } from "../../../domain/entities/PedagodyAreaEntity";
import { BiBriefcaseAlt, BiPieChartAlt2 } from "react-icons/bi";
import { FiLayers } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { ColourOption } from "../../../utils/interface";
import logo from "../../../assets/gobierno_abierto.png";

interface Props {
  loadOptions: (
    inputValue: string,
    callback: (options: ColourOption[]) => void
  ) => void;
  countEntities: number;
  countFiles: number;
  onSelect: (value: ColourOption) => void;
  faq: FrequencyAsked[];
  onPersonal: () => void;
  onFollow: () => void;
  onAudience: () => void;
  onForm: () => void;
  onQuestion: (index:number)=> void;

}
const LandingPresenter = (props: Props) => {
  const colors = [
    {
      bgcolor: "#F7941D",
      contrast: "#CC7002",
    },
    {
      bgcolor: "#A5C330",
      contrast: "#667C0F",
    },
    {
      bgcolor: "#D26497",
      contrast: "#922859",
    },
  ];

  const Icon = [
    ()=><svg
      className='mb-8'
      xmlns='http://www.w3.org/2000/svg'
      width='60'
      height='61'
      viewBox='0 0 60 61'
      fill='none'>
      <path
        d='M30 3.5L3 17L30 30.5L57 17L30 3.5Z'
        stroke='currentColor'
        stroke-width='5.41667'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
      <path
        d='M3 44L30 57.5L57 44'
        stroke='currentColor'
        stroke-width='5.41667'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
      <path
        d='M3 30.5L30 44L57 30.5'
        stroke='currentColor'
        stroke-width='5.41667'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
    </svg>,
    () => <svg
      className='mb-8'
      xmlns='http://www.w3.org/2000/svg'
      width='60'
      height='61'
      viewBox='0 0 60 61'
      fill='none'>
      <path
        d='M30 3.5L3 17L30 30.5L57 17L30 3.5Z'
        stroke='currentColor'
        stroke-width='5.41667'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
      <path
        d='M3 44L30 57.5L57 44'
        stroke='currentColor'
        stroke-width='5.41667'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
      <path
        d='M3 30.5L30 44L57 30.5'
        stroke='currentColor'
        stroke-width='5.41667'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
    </svg>,
    () => <svg
      className='mb-8'
      xmlns='http://www.w3.org/2000/svg'
      width='60'
      height='60'
      viewBox='0 0 60 60'
      fill='none'>
      <path
        d='M27 6.00002H17.4C12.3595 6.00002 9.83928 6.00002 7.91407 6.98095C6.22063 7.8438 4.84378 9.22066 3.98093 10.9141C3 12.8393 3 15.3595 3 20.4V42.6C3 47.6405 3 50.1607 3.98093 52.0859C4.84378 53.7794 6.22063 55.1562 7.91407 56.0191C9.83928 57 12.3595 57 17.4 57H39.6C44.6405 57 47.1607 57 49.0859 56.0191C50.7793 55.1562 52.1562 53.7794 53.0191 52.0859C54 50.1607 54 47.6405 54 42.6V33M33 45H15M39 33H15M54.3639 5.63606C57.8787 9.15074 57.8787 14.8493 54.3639 18.3639C50.8493 21.8787 45.1507 21.8787 41.6361 18.3639C38.1213 14.8493 38.1213 9.15074 41.6361 5.63606C45.1507 2.12131 50.8493 2.12131 54.3639 5.63606Z'
        stroke='currentColor'
        stroke-width='4.8'
        stroke-linecap='round'
        stroke-linejoin='round'></path>
    </svg>

  ];

 /* return (
    <div className="flex flex-col w-full  bg-white lg:pr-10">
      <div></div>
      <div className="border-l-[1px]  border-gray-800 ml-8 md:ml-14">
        <Hero
          countEntities={props.countEntities}
          countFiles={props.countFiles}
          loadOptions={props.loadOptions}
          onSelect={props.onSelect}
        />

        <div className="grid 2xl:mt-4 xl:mt-0 mt-20 grid-cols-1 lg:grid-cols-3 pr-5 xl:pr-10 lg:pr-10 w-full ">
          {props.faq.map((item, index) => {
            return (
              <CardQuestion
                key={index}
                icon={Icon[index] || Icon[0]}
                title={item.question}
                content={item.answer}
                contrast={colors[index].contrast}
                bgcolor={colors[index].bgcolor}
                onQuestion={()=>props.onQuestion(index)}
              ></CardQuestion>
            );
          })}
        </div>
        <div className="xl:flex flex-col  w-full mt-16 justify-between flex ">
          <p
            className="text-[32px] xl:text-4xl 
             ml-5  text-gray-900 dark:text-white w-[216px]  xl:w-[216px] mt-10  "
            tabIndex={7}
          >
            <FormattedMessage id="search_by_tematic" />
          </p>
          <hr className="w-[85%] ml-64 border-gray-900 -mt-5 mr-9 hidden xl:block" />
          <hr className="w-[90%] ml-5 border-blue-300 mt-5 mb-1 mr-9 xl:hidden" />
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-4 lg:ml-5   md:ml-5 xl:-space-x-6 
        md:grid-cols-2 w-full
        justify-center  mb-44 mt-8  "
        >
          <CardConsulta
            icon={
              <BiBriefcaseAlt
                size={85}
                className="text-white bg-[#FFBD71] rounded-full py-5 px-2"
              />
            }
            title="Personal y Remuneraciones"
            backgroundColor="hover:bg-[#F7941D]  bg-[#FFF6EC] px-5 w-full "
            color="text-black "
            content=" Encontrarás información sobre presupuesto participativo, consejo de coordinación regional, audiencias públicas, entre otros."
            classnames={"px-5 xl:mr-0 "}
            onFollow={props.onPersonal}
          ></CardConsulta>
          <CardConsulta
            icon={
              <BiPieChartAlt2
                size={85}
                className="text-white bg-[#B4C365] rounded-full py-5 px-2"
              />
            }
            title="Presupuestos"
            backgroundColor="hover:bg-[#809028] bg-[#F1F7D1] px-5 w-full"
            color="text-black"
            classnames={"px-5 xl:mr-0 "}
            content=" Encontrarás información sobre presupuesto participativo, consejo de coordinación regional, audiencias públicas, entre otros."
            onFollow={props.onFollow}
          ></CardConsulta>
          <CardConsulta
            icon={
              <div className=" bg-[#D26497] rounded-full w-fit px-5 py-5 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M23.3334 18.333H13.3334M16.6667 24.9997H13.3334M26.6667 11.6663H13.3334M33.3334 16.6663V11.333C33.3334 8.53275 33.3334 7.13261 32.7884 6.06306C32.3091 5.12224 31.5442 4.35734 30.6034 3.87798C29.5338 3.33301 28.1337 3.33301 25.3334 3.33301H14.6667C11.8665 3.33301 10.4664 3.33301 9.3968 3.87798C8.45599 4.35734 7.69108 5.12224 7.21172 6.06306C6.66675 7.13261 6.66675 8.53275 6.66675 11.333V28.6663C6.66675 31.4666 6.66675 32.8667 7.21172 33.9363C7.69108 34.8771 8.45599 35.642 9.3968 36.1214C10.4664 36.6663 11.8665 36.6663 14.6667 36.6663H20.8334M30.0001 34.9997C30.0001 34.9997 35.0001 32.6165 35.0001 29.0417V24.8712L31.3541 23.5683C30.4781 23.2546 29.5201 23.2546 28.6441 23.5683L25.0001 24.8712V29.0417C25.0001 32.6165 30.0001 34.9997 30.0001 34.9997Z"
                    stroke="white"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            }
            title="Audiencias y Reuniones"
            backgroundColor="hover:bg-[#D73184] bg-[#FFF9FC] px-5 w-full"
            content=" Encontrarás información sobre presupuesto participativo, consejo de coordinación regional, audiencias públicas, entre otros."
            color="text-black"
            classnames={"px-5 xl:mr-0 "}
            onFollow={props.onAudience}
          ></CardConsulta>
          <CardConsulta
            icon={
              <GoChecklist
                size={85}
                className="text-white bg-[#70DED8] rounded-full py-5 px-2"
              />
            }
            title="Formularios y Solicitudes"
            backgroundColor="hover:bg-[#0F857F] bg-[#E7FFFE] px-5 w-full"
            color="text-black"
            classnames={"px-5 xl:mr-0 "}
            content=" Encontrarás información sobre presupuesto participativo, consejo de coordinación regional, audiencias públicas, entre otros."
            onFollow={props.onForm}
          ></CardConsulta>
        </div>
        <div className="container flex items-center md:sm:justify-center  mb-24 w-full">
          <div className="flex -mt-20 xl:w-1/3 w-auto">
            <img src={logo} alt="" className="w-[150px] h-[150px]" />
            <span className="pl-5 py-7 text-base font-medium w-[70%]">
              "Este Portal Nacional de Transparencia" es uno de los compromisos
              del Segundo Plan de{" "}
              <a href="https://www.gobiernoabierto.ec" target="_blank">
                Estado Abierto Ecuador 2022-2024.
              </a>
              <br />
              <div className="w-full flex justify-end">
                <a
                  href="https://www.gobiernoabierto.ec/plan-de-accion-2022-2024/"
                  target="_blank"
                  className="text-blue-500 font-semibold "
                >
                  {" "}
                  Conoce más.
                </a>
              </div>

            </span>
          </div>
        </div>
      </div>
    </div>
  );*/

  return (
    <>

      <Hero

        countEntities={props.countEntities}
        countFiles={props.countFiles}
        loadOptions={props.loadOptions}
        onSelect={props.onSelect} />
        <section
          className='section-container mt-32 grid min-h-64 w-full grid-cols-[repeat(auto-fit,minmax(18rem,_1fr))] place-items-center'>

        <CardConsulta
        
          title="¿Qué puedo hacer en este portal?"
          content="Consulta las preguntas frecuentes para resolver tus principales dudas sobre esta plataforma."
          backgroundColor="bg-custom-orange"
          color="text-black"
          
        />
        {/*props.faq.map((item, index) => {
          return (
            <CardQuestion
              key={index}
              icon={Icon[index] || Icon[0]}
              title={item.question}
              content={item.answer}
              contrast={colors[index].contrast}
              bgcolor={colors[index].bgcolor}
              onQuestion={() => props.onQuestion(index)}
            ></CardQuestion>
          );
        })*/}
        <article
          id='video-tutorial-card'
          className='group flex h-full w-full cursor-pointer flex-col justify-between bg-custom-green px-8 py-8 text-white hover:text-gray-800'>
          <div className='grid grid-rows-[92px,80px,max-content]'>
            <svg
              className='mb-8'
              xmlns='http://www.w3.org/2000/svg'
              width='60'
              height='61'
              viewBox='0 0 60 61'
              fill='none'>
              <path
                d='M30 3.5L3 17L30 30.5L57 17L30 3.5Z'
                stroke='currentColor'
                stroke-width='5.41667'
                stroke-linecap='round'
                stroke-linejoin='round'></path>
              <path
                d='M3 44L30 57.5L57 44'
                stroke='currentColor'
                stroke-width='5.41667'
                stroke-linecap='round'
                stroke-linejoin='round'></path>
              <path
                d='M3 30.5L30 44L57 30.5'
                stroke='currentColor'
                stroke-width='5.41667'
                stroke-linecap='round'
                stroke-linejoin='round'></path>
            </svg>

            <h2 className='mb-4 text-balance text-2xl font-bold transition'>
              ¿Qué información voy a encontrar?
            </h2>
            <p className='mb-8 text-pretty text-lg font-medium leading-7 transition'>
              Revisa nuestros vídeo tutoriales que explican paso a paso cómo utilizar este sitio.
            </p>
          </div>

          <div className='inline-flex items-center justify-start gap-x-4 text-lg font-semibold'>
            <span>Ir a la Sección</span>

            <svg
              width='15'
              height='15'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 transition group-hover:translate-x-4'>
              <path
                d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
                fill='currentColor'
                fill-rule='evenodd'
                clip-rule='evenodd'></path>
            </svg>
          </div>
        </article>

        <article
          id='faq-card'
          className='group flex h-full w-full cursor-pointer flex-col justify-between bg-custom-pink px-8 py-8 text-white hover:text-gray-800'>
          <div className='grid grid-rows-[92px,80px,max-content]'>
            <svg
              className='mb-8'
              xmlns='http://www.w3.org/2000/svg'
              width='60'
              height='60'
              viewBox='0 0 60 60'
              fill='none'>
              <path
                d='M27 6.00002H17.4C12.3595 6.00002 9.83928 6.00002 7.91407 6.98095C6.22063 7.8438 4.84378 9.22066 3.98093 10.9141C3 12.8393 3 15.3595 3 20.4V42.6C3 47.6405 3 50.1607 3.98093 52.0859C4.84378 53.7794 6.22063 55.1562 7.91407 56.0191C9.83928 57 12.3595 57 17.4 57H39.6C44.6405 57 47.1607 57 49.0859 56.0191C50.7793 55.1562 52.1562 53.7794 53.0191 52.0859C54 50.1607 54 47.6405 54 42.6V33M33 45H15M39 33H15M54.3639 5.63606C57.8787 9.15074 57.8787 14.8493 54.3639 18.3639C50.8493 21.8787 45.1507 21.8787 41.6361 18.3639C38.1213 14.8493 38.1213 9.15074 41.6361 5.63606C45.1507 2.12131 50.8493 2.12131 54.3639 5.63606Z'
                stroke='currentColor'
                stroke-width='4.8'
                stroke-linecap='round'
                stroke-linejoin='round'></path>
            </svg>

            <h2 className='mb-4 text-balance text-2xl font-bold transition'>
              ¿Deben las entidades responder a mis solicitudes?
            </h2>
            <p className='mb-8 text-pretty text-lg font-medium leading-7 transition'>
              Encuentra las leyes y normativas que regulan el derecho de acceso a la información
              pública.
            </p>
          </div>

          <div className='inline-flex items-center justify-start gap-x-4 text-lg font-semibold'>
            <span>Ir a la Sección</span>

            <svg
              width='15'
              height='15'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 transition group-hover:translate-x-4'>
              <path
                d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
                fill='currentColor'
                fill-rule='evenodd'
                clip-rule='evenodd'></path>
            </svg>
          </div>
        </article>
      </section>
    </>
  )
};

export default LandingPresenter;
