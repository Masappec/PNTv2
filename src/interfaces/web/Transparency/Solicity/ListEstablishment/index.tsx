import SolicityListEstablishmentContainer from "../../../../../components/Transparency/Solicity/ListEstablishment/SolicityEstablishmentContainer";
import SolicityUseCase from "../../../../../domain/useCases/SolicityUseCase/SolicityUseCase";
import api from "../../../../../infrastructure/Api";
import ReportsApi from "../../../../../infrastructure/Api/Reports";
import SolicityApi from "../../../../../infrastructure/Api/Solicity/SolicityApi";
import SolicityService from "../../../../../infrastructure/Services/SolicityService";


const SolicityListEstablishment = () => {
    const apiSolicity = new SolicityApi(api);
    const ServiceSolicty = new SolicityService(apiSolicity)
    const UseCase = new SolicityUseCase(ServiceSolicty);

    return (
        <SolicityListEstablishmentContainer
            useCase={UseCase}
            reportApi={new ReportsApi(api)}
        />
    )

}

export default SolicityListEstablishment