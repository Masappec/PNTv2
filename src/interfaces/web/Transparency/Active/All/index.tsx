import AllTAContainer from "../../../../../components/Transparency/Active/All/AllTAContainer"
import TransparencyActiveUseCase from "../../../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase"
import api from "../../../../../infrastructure/Api"
import TransparencyActiveApi from "../../../../../infrastructure/Api/TansparencyActive/TransparencyActiveApi"
import TransparencyActiveService from "../../../../../infrastructure/Services/TransparencyActiveService"




const AllTA = ()=>{
    return(
        <AllTAContainer
            transparencyUseCase={new TransparencyActiveUseCase(
            new TransparencyActiveService(new TransparencyActiveApi(api))
        )}
        />
    )
}

export default AllTA