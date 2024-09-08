import IndicatorsAdminContainer from "../../../../components/Dashboards/IndicatorsAdmin/IndicatorsAdminContainer";
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase";
import api from "../../../../infrastructure/Api";
import EstablishmentApi from "../../../../infrastructure/Api/Establishment/EstablishmentApi";
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi";
import EstablishmentService from "../../../../infrastructure/Services/EstablishmentService";

const IndicatorsAdmin = () => {


   const establishmentUsecase = new EstablishmentUseCase(new EstablishmentService(new EstablishmentApi(api)))
   return (

      <IndicatorsAdminContainer
      establishmentUsecase={establishmentUsecase}
         usecase={new PublicDataApi()}
      />

   )
}

export default IndicatorsAdmin;