import AllTFContainer from "../../../../../components/Transparency/focalized/Alll/AllTFContainer"
import TransparencyFocusUseCase from "../../../../../domain/useCases/TransparencyFocusUseCase/TransparencyFocusUseCase"
import api from "../../../../../infrastructure/Api"
import TransparencyFocusApi from "../../../../../infrastructure/Api/TransparencyFocus/TransparencyFocusApi"
import TransparencyFocusService from "../../../../../infrastructure/Services/TransparencyFocusService"




const AllTF = () => {
    return (
        <AllTFContainer
            transparencyUseCase={new TransparencyFocusUseCase(
                new TransparencyFocusService(new TransparencyFocusApi(api))
            )}
        />
    )
}
export default AllTF