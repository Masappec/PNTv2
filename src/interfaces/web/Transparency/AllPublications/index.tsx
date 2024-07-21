import AllPublicationsContainer from "../../../../components/Transparency/AllPublications/AllPublicationsContainer"
import TransparencyActiveUseCase from "../../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase"
import api from "../../../../infrastructure/Api"
import TransparencyActiveApi from "../../../../infrastructure/Api/TansparencyActive/TransparencyActiveApi"
import TransparencyActiveService from "../../../../infrastructure/Services/TransparencyActiveService"



const AllPublications = ()=>{

    
    return(
        <AllPublicationsContainer
        
        transparencyUseCase={new TransparencyActiveUseCase(new TransparencyActiveService(new TransparencyActiveApi(api)))}
        />
    )
}

export default AllPublications;