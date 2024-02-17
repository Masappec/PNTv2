import Hero from "../../Common/Hero";
import CardQuestion from "../../Common/CardQuestion";
import { FormattedMessage } from "react-intl";
import CardConsulta from "../../Common/Card";
import { FrequencyAsked } from "../../../domain/entities/PedagodyAreaEntity";
import { BiNotification } from "react-icons/bi";
import { FiLayers } from "react-icons/fi";
import { IoAlertCircleOutline } from "react-icons/io5";

interface Props {
  faq: FrequencyAsked[];
}
const LandingPresenter = (props: Props) => {
  const colors = [
    {
      contrast: "#F7941D",
      bgcolor: "#F7941D0D",
    },
    {
      contrast: "#A5C330",
      bgcolor: "#A5C3300D",
    },
    {
      contrast: "#D26497",
      bgcolor: "#FFF9FC",
    },
  ];

  const Icon = [IoAlertCircleOutline, FiLayers , BiNotification];

  return (
    <div className="flex flex-col w-full  bg-white lg:pr-10">
      <div></div>
      <div className="border-l-2 border-gray-900 ml-0 md:ml-14">
        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-3  w-full border-b">
          {props.faq.map((item, index) => {
            return (
              <CardQuestion
                key={index}
                icon={Icon[index] || Icon[0]}
                title={item.question}
                content={item.answer}
                contrast={colors[index].contrast}
                bgcolor={colors[index].bgcolor}
              ></CardQuestion>
            );
          })}
        </div>
        <div className="flex  w-full mt-16 ">
          <p
            className="text-3xl ml-5  text-gray-800 dark:text-white  w-52 "
            tabIndex={7}
          >
            <FormattedMessage id="search_by_tematic" />
          </p>
          <hr className="w-full ml-5  border-gray-900 mt-10" />
        </div>

        <div className="grid lg:grid-cols-4 lg:ml-5  md:ml-5 gap-10 md:grid-cols-2 w-full justify-center  mb-48 ">
          <CardConsulta
            title="Personal y salarios"
            backgroundColor="bg-yellow-400"
            content="Encontrarás el directorio de los funcionarios públicos, las leyes, reglamentos, declaraciones juradas de los funcionarios y demás disposiciones legales que rigen y emiten las entidades."
            text="CONSULTAR"
          ></CardConsulta>
          <CardConsulta
            title="Presupuestos"
            backgroundColor=" bg-slate-200"
            content="Encontrarás los instrumentos de gestión, planes y políticas, que regulan las actividades de la entidad."
            text=""
          ></CardConsulta>
          <CardConsulta
            title="Contratos"
            backgroundColor="bg-slate-200"
            content=" Encontrarás información sobre presupuesto participativo, consejo de coordinación regional, audiencias públicas, entre otros."
            text=""
          ></CardConsulta>
          <CardConsulta
            title="Formularios y Solicitudes"
            backgroundColor="bg-slate-200"
            content="Encontrarás información de los proyectos de inversión y obras públicas de la entidad y su ejecución."
            text=""
          ></CardConsulta>
        </div>
      </div>
    </div>
  );
};

export default LandingPresenter;
