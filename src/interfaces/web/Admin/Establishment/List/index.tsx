import EstablishmentListContainer from "../../../../../components/Admin/Establishment/List/EstablishmentListContainer"
import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase";
import api from "../../../../../infrastructure/Api";
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi";
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService";



const EstablishmentList = () => {

    const establishmentApi = new EstablishmentApi(api);
    const establishmentService =new EstablishmentService(establishmentApi);
    const usecase = new EstablishmentUseCase(establishmentService);
    return (
        <EstablishmentListContainer 
            usecase={usecase}
        />
    )

}

export default EstablishmentList;