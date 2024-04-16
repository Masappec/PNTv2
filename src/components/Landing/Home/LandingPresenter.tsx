import Hero from "../../Common/Hero";
import CardQuestion from "../../Common/CardQuestion";
import { FormattedMessage } from "react-intl";
import CardConsulta from "../../Common/Card";
import { FrequencyAsked } from "../../../domain/entities/PedagodyAreaEntity";
import { BiNotification, BiBriefcaseAlt, BiPieChartAlt2 } from "react-icons/bi";
import { FiLayers } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { ColourOption } from "../../../utils/interface";

interface Props {
  loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;
  countEntities: number;
  countFiles: number;
  onSelect: (value: ColourOption) => void;
  faq: FrequencyAsked[];
}
const LandingPresenter = (props: Props) => {
  const colors = [
    {
      bgcolor: "#F7941D",
      contrast: "#F7941D0D",
    },
    {
      bgcolor: "#A5C330",
      contrast: "#A5C3300D",
    },
    {
      bgcolor: "#D26497",
      contrast: "#FFF9FC",
    },
  ];

  const Icon = [BsQuestionCircle, FiLayers, BiNotification];

  return (
    <div className="flex flex-col w-full  bg-white lg:pr-10">
      <div></div>
      <div className="border-l-2 border-gray-800 ml-8 md:ml-14">
        <Hero
          countEntities={props.countEntities}
          countFiles={props.countFiles}
          loadOptions={props.loadOptions}
          onSelect={props.onSelect}

        />

        <div className="grid grid-cols-1 lg:grid-cols-3 pr-5 xl:pr-10 lg:pr-10 w-full border-b ">
          {props.faq.map((item, index) => {
            return (
              <CardQuestion
                key={index}
                icon={Icon[index] || Icon[0]}
                title={item.question}
                content={item.answer}
                contrast={""}
                bgcolor={colors[index].bgcolor}

              ></CardQuestion>
            );
          })}
        </div>
        <div className="xl:flex flex-col  w-full mt-16 justify-between flex ">
          <p
            className="text-[32px] xl:text-4xl xl:font-medium ml-5  text-gray-900 dark:text-white w-[200px]  xl:w-72 mt-10  "
            tabIndex={7}
          >
            <FormattedMessage id="search_by_tematic" />
          </p>
          <hr className="w-[85%] ml-64 border-gray-900 -mt-5 mr-9 hidden xl:block" />
          <hr className="w-[90%] ml-5 border-blue-300 mt-5 mb-1 mr-9 xl:hidden" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 lg:ml-5   md:ml-5 xl:-space-x-6 
        md:grid-cols-2 w-full
        justify-center  mb-44 ">
          <CardConsulta
            icon={<BiBriefcaseAlt size={85} className="text-white bg-[#FFBD71] rounded-full py-5 px-2" />}
            title="Personal y Remuneraciones"
            backgroundColor="hover:bg-[#F7941D]  bg-[#FFF6EC] px-5 w-full "
            color="text-black "
            content=" Encontrarás información sobre presupuesto participativo, consejo de coordinación regional, audiencias públicas, entre otros."

            classnames={"px-5 xl:mr-0 "}
          ></CardConsulta>
          <CardConsulta
            icon={<BiPieChartAlt2 size={85} className="text-white bg-[#B4C365] rounded-full py-5 px-2" />}
            title="Presupuestos"
            backgroundColor="hover:bg-[#809028] bg-[#F1F7D1] px-5 w-full"
            color="text-black"
            classnames={"px-5 xl:mr-0 "}
            content=" Encontrarás información sobre presupuesto participativo, consejo de coordinación regional, audiencias públicas, entre otros."

          ></CardConsulta>
          <CardConsulta
            icon={
              <div className=" bg-[#D26497] rounded-full w-fit px-5 py-5 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="40"
                  height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M23.3334 18.333H13.3334M16.6667 24.9997H13.3334M26.6667 11.6663H13.3334M33.3334 16.6663V11.333C33.3334 8.53275 33.3334 7.13261 32.7884 6.06306C32.3091 5.12224 31.5442 4.35734 30.6034 3.87798C29.5338 3.33301 28.1337 3.33301 25.3334 3.33301H14.6667C11.8665 3.33301 10.4664 3.33301 9.3968 3.87798C8.45599 4.35734 7.69108 5.12224 7.21172 6.06306C6.66675 7.13261 6.66675 8.53275 6.66675 11.333V28.6663C6.66675 31.4666 6.66675 32.8667 7.21172 33.9363C7.69108 34.8771 8.45599 35.642 9.3968 36.1214C10.4664 36.6663 11.8665 36.6663 14.6667 36.6663H20.8334M30.0001 34.9997C30.0001 34.9997 35.0001 32.6165 35.0001 29.0417V24.8712L31.3541 23.5683C30.4781 23.2546 29.5201 23.2546 28.6441 23.5683L25.0001 24.8712V29.0417C25.0001 32.6165 30.0001 34.9997 30.0001 34.9997Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            }
            title="Audiencias y Reuniones"
            backgroundColor="hover:bg-[#D73184] bg-[#FFF9FC] px-5 w-full"
            content=" Encontrarás información sobre presupuesto participativo, consejo de coordinación regional, audiencias públicas, entre otros."
            color="text-black"
            classnames={"px-5 xl:mr-0 "}

          ></CardConsulta>
          <CardConsulta
            icon={<GoChecklist size={85} className="text-white bg-[#70DED8] rounded-full py-5 px-2" />}
            title="Formularios y Solicitudes"
            backgroundColor="hover:bg-[#0F857F] bg-[#E7FFFE] px-5 w-full"
            color="text-black"
            classnames={"px-5 xl:mr-0 "}
            content=" Encontrarás información sobre presupuesto participativo, consejo de coordinación regional, audiencias públicas, entre otros."

          ></CardConsulta>
        </div>
      </div>
    </div>
  );
};

export default LandingPresenter;
