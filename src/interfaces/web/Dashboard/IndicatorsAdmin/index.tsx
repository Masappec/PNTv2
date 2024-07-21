import IndicatorsAdminContainer from "../../../../components/Dashboards/IndicatorsAdmin/IndicatorsAdminContainer";
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi";

const IndicatorsAdmin = () => {

   return (

      < IndicatorsAdminContainer

         usecase={new PublicDataApi()}
      />

   )
}

export default IndicatorsAdmin;