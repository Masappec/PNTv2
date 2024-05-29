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
    BsQuestionCircle,
    FiLayers,
    () => (
      <svg
        width="70"
        height="70"
        viewBox="0 0 100 100"
        className="ml-3 2xl:w-1/2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M45.8333 16.6667H32.5C25.4993 16.6667 21.999 16.6667 19.3251 18.0291C16.9731 19.2275 15.0608 21.1398 13.8624 23.4918C12.5 26.1657 12.5 29.666 12.5 36.6667V67.5C12.5 74.5007 12.5 78.001 13.8624 80.6749C15.0608 83.0269 16.9731 84.9392 19.3251 86.1376C21.999 87.5 25.4993 87.5 32.5 87.5H63.3333C70.334 87.5 73.8343 87.5 76.5082 86.1376C78.8602 84.9392 80.7725 83.0269 81.9709 80.6749C83.3333 78.001 83.3333 74.5007 83.3333 67.5V54.1667M54.1667 70.8333H29.1667M62.5 54.1667H29.1667M83.8388 16.1612C88.7204 21.0427 88.7204 28.9573 83.8388 33.8388C78.9573 38.7204 71.0427 38.7204 66.1612 33.8388C61.2796 28.9573 61.2796 21.0427 66.1612 16.1612C71.0427 11.2796 78.9573 11.2796 83.8388 16.1612Z"
          stroke="#FFE0EE"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  ];

  return (
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
  );
};

export default LandingPresenter;
