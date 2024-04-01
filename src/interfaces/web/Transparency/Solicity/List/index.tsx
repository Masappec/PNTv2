import SolicityListContainer from "../../../../../components/Transparency/Solicity/List/SolicityListContainer";
import SolicityUseCase from "../../../../../domain/useCases/SolicityUseCase/SolicityUseCase";
import api from "../../../../../infrastructure/Api";
import SolicityApi from "../../../../../infrastructure/Api/Solicity/SolicityApi";
import SolicityService from "../../../../../infrastructure/Services/SolicityService";


    const SolicityList = () => {
        const apiSolicity = new  SolicityApi(api);
        const ServiceSolicty= new SolicityService(apiSolicity)
        const UseCase = new SolicityUseCase(ServiceSolicty);
            
    return (
        <SolicityListContainer
        useCase={UseCase}
    
        />
    )

}

export default SolicityList