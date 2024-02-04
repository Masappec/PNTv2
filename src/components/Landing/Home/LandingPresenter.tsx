import Hero from "../../Common/Hero";
import CardQuestion from "../../Common/CardQuestion";
import { FormattedMessage } from "react-intl";
import CardConsulta from "../../Common/Card";


const LandingPresenter = () => {
  return (
    <div className="flex flex-col w-full  bg-white pr-10">
      <div></div>
      <div className="border-l-2 border-gray-900 ml-0 md:ml-10">
        <Hero />

        <div className="flex flex-row  w-full border-b">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardQuestion key={i} />
          ))}
        </div>
        <div className="flex  w-full mt-28 ">
          <p
            className="text-3xl ml-5  text-gray-800 dark:text-white  w-52 "
            tabIndex={7}
          >
            <FormattedMessage id="search_by_tematic" />
          </p>
          <hr className="w-full ml-5  border-gray-900 mt-10" />
        </div>

        <div className="flex  w-full justify-center space-x-10 mb-48 ">
          <CardConsulta
            title="Personal y salarios"
            backgroundColor="  bg-yellow-400"
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
