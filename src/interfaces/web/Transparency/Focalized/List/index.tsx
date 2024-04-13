import FocalizedListContainer from "../../../../../components/Transparency/focalized/List/FocalizedListContainer";
import TransparencyFocusUseCase from "../../../../../domain/useCases/TransparencyFocusUseCase/TransparencyFocusUseCase";
import api from "../../../../../infrastructure/Api";
import TransparencyFocusApi from "../../../../../infrastructure/Api/TransparencyFocus/TransparencyFocusApi";
import TransparencyFocusService from "../../../../../infrastructure/Services/TransparencyFocusService";


const FocalizedList = ()=>{

    const transparencyFocusApi = new TransparencyFocusApi(api);
    const transparencyFocusService= new TransparencyFocusService(transparencyFocusApi);
    const usecase = new TransparencyFocusUseCase(transparencyFocusService);

return(
<FocalizedListContainer
usecase={usecase}
/>

)

}
export default  FocalizedList;