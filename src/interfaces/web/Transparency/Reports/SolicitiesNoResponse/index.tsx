import SolicitiesNoResponseContainer from "../../../../../components/Transparency/Reports/SolicitiesNoResponses/SolicitiesNoResponseContainer";
import SolicityUseCase from "../../../../../domain/useCases/SolicityUseCase/SolicityUseCase";
import api from "../../../../../infrastructure/Api";
import ReportsApi from "../../../../../infrastructure/Api/Reports";
import SolicityApi from "../../../../../infrastructure/Api/Solicity/SolicityApi";
import SolicityService from "../../../../../infrastructure/Services/SolicityService";


const SolicitiesNoResponse = () => {
    const apiSolicity = new SolicityApi(api);
    const ServiceSolicty = new SolicityService(apiSolicity)
    const UseCase = new SolicityUseCase(ServiceSolicty);

    return (
        <SolicitiesNoResponseContainer
            useCase={UseCase}
            reportApi={new ReportsApi(api)}

        />
    )

}

export default SolicitiesNoResponse