import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase"
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService"
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi"
import api from "../../../../../infrastructure/Api"
import EstablishmentInSessionContainer from "../../../../../components/Admin/Establishment/InSession/EstablishmentInSessionContainer"
import NumeralUseCase from "../../../../../domain/useCases/NumeralUseCase/NumeraUseCase"
import NumeralService from "../../../../../infrastructure/Services/NumeralService"
import NumeralApi from "../../../../../infrastructure/Api/Numeral/NumeralApi"



const EstablihsmentInSession = () => {

    //const user = SessionService.USER_DATA_KEY
    const api_establishment = new EstablishmentApi(api)
    const service = new EstablishmentService(api_establishment)
    const usecase = new EstablishmentUseCase(service)
    const numeralUsecase = new NumeralUseCase(new NumeralService(new NumeralApi(api)), service)


    return <EstablishmentInSessionContainer

        numeralUsecase={numeralUsecase}
        usecase={usecase}
    />


    return null
}

export default EstablihsmentInSession;