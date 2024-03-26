import Hero from "../../Common/Hero";
import CardQuestion from "../../Common/CardQuestion";
import { FormattedMessage } from "react-intl";
import CardConsulta from "../../Common/Card";
import { FrequencyAsked } from "../../../domain/entities/PedagodyAreaEntity";
import { BiNotification, BiBriefcaseAlt, BiPieChartAlt2 } from "react-icons/bi";
import { FiLayers } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";



interface Props {
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
        <Hero />

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
        <div className="xl:flex flex-col  w-full mt-16 ">
          <p
            className="text-[32px] xl:text-4xl xl:font-medium ml-5  text-gray-900 dark:text-white w-[200px]  xl:w-72 mt-10  "
            tabIndex={7}
          >
            <FormattedMessage id="search_by_tematic" />
          </p>
          <hr className="w-[96%] ml-24 border-gray-900 mt-28 mr-9 hidden xl:block" />
          <hr className="w-full ml-5 border-gray-500 mt-28 mr-9 xl:hidden" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 lg:ml-5   md:ml-5 xl:-space-x-6 md:grid-cols-2 w-full 
        justify-center  mb-44 ">
          <CardConsulta
            icon={<BiBriefcaseAlt size={85} className="text-white bg-[#FFBD71] rounded-full py-5 px-2" />}
            title="Personal y Remuneraciones"
            backgroundColor="  bg-orange-100 px-5 w-full"
            color="text-black"
            classnames={"px-5 xl:mr-0 "}
          ></CardConsulta>
          <CardConsulta
            icon={<BiPieChartAlt2 size={85} className="text-white bg-[#B4C365] rounded-full py-5 px-2" />}
            title="Presupuestos"
            backgroundColor=" bg-[#F1F7D1] px-5 w-full"
            color="text-black"
            classnames={"px-5 xl:mr-0 "}
          ></CardConsulta>
          <CardConsulta
            title=""
            backgroundColor="bg-[#D73184] px-5 w-full"
            content=" Encontrarás información sobre presupuesto participativo, consejo de coordinación regional, audiencias públicas, entre otros."
            color="text-white"
            classnames={"px-5 xl:mr-0 "}

          ></CardConsulta>
          <CardConsulta
            icon={<GoChecklist size={85} className="text-white bg-[#70DED8] rounded-full py-5 px-2" />}
            title="Formularios y Solicitudes"
            backgroundColor="bg-[#E7FFFE] px-5 w-full"
            color="text-black"
            classnames={"px-5 xl:mr-0 "}

          ></CardConsulta>
        </div>
      </div>
    </div>
  );
};

export default LandingPresenter;
