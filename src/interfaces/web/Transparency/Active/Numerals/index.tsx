import ActiveNumeralsContainer from "../../../../../components/Transparency/Active/Numerals/ActiveNumeralsContainer";
import NumeralUseCase from "../../../../../domain/useCases/NumeralUseCase/NumeraUseCase";
import api from "../../../../../infrastructure/Api";
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi";
import NumeralApi from "../../../../../infrastructure/Api/Numeral/NumeralApi";
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService";
import NumeralService from "../../../../../infrastructure/Services/NumeralService";


const ActiveNumerals =()=>{


    const numeralApi = new NumeralApi(api);
    const numeralService = new NumeralService(numeralApi);
    const numeralUseCase = new NumeralUseCase(numeralService,new EstablishmentService(new EstablishmentApi(api)))
    return(
     <ActiveNumeralsContainer
     usecase={numeralUseCase}
     />
    )
}

export  default ActiveNumerals;