import SolicitiesResponseContainer from "../../../../../components/Transparency/Reports/SolicitiesResponses/SolicitiesResponseContainer";
import SolicityUseCase from "../../../../../domain/useCases/SolicityUseCase/SolicityUseCase";
import api from "../../../../../infrastructure/Api";
import ReportsApi from "../../../../../infrastructure/Api/Reports";
import SolicityApi from "../../../../../infrastructure/Api/Solicity/SolicityApi";
import SolicityService from "../../../../../infrastructure/Services/SolicityService";


const SolicitiesResponse = () => {
    const apiSolicity = new SolicityApi(api);
    const ServiceSolicty = new SolicityService(apiSolicity)
    const UseCase = new SolicityUseCase(ServiceSolicty);

    return (
        <SolicitiesResponseContainer
            useCase={UseCase}
            reportApi={new ReportsApi(api)}

        />
    )

}

export default SolicitiesResponse