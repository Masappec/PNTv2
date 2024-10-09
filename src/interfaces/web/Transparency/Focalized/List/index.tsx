import FocalizedListContainer from "../../../../../components/Transparency/focalized/List/FocalizedListContainer";
import TransparencyActiveUseCase from "../../../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase";
import TransparencyFocusUseCase from "../../../../../domain/useCases/TransparencyFocusUseCase/TransparencyFocusUseCase";
import api from "../../../../../infrastructure/Api";
import TransparencyActiveApi from "../../../../../infrastructure/Api/TansparencyActive/TransparencyActiveApi";
import TransparencyFocusApi from "../../../../../infrastructure/Api/TransparencyFocus/TransparencyFocusApi";
import TransparencyActiveService from "../../../../../infrastructure/Services/TransparencyActiveService";
import TransparencyFocusService from "../../../../../infrastructure/Services/TransparencyFocusService";


const FocalizedList = () => {

    const transparencyFocusApi = new TransparencyFocusApi(api);
    const transparencyFocusService = new TransparencyFocusService(transparencyFocusApi);
    const usecase = new TransparencyFocusUseCase(transparencyFocusService);

    return (
        <FocalizedListContainer
            usecase={usecase}
            transparencyUseCase={new TransparencyActiveUseCase(
                new TransparencyActiveService(new TransparencyActiveApi(api))
            )}
        />

    )

}
export default FocalizedList;