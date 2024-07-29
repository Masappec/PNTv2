import AllTCContainer from "../../../../../components/Transparency/Collaborative/All/AllTCContainer"
import TransparencyCollabUseCase from "../../../../../domain/useCases/TransparencyCollabUseCase/TransparencyCollabUseCase"
import api from "../../../../../infrastructure/Api"
import TransparencyCollabApi from "../../../../../infrastructure/Api/TransparencyCollab/TransparencyCollab"
import TransparencyCollabService from "../../../../../infrastructure/Services/TransparencyCollabService"




const AllTC = () => {

    return (<AllTCContainer 
        transparencyUseCase={new TransparencyCollabUseCase(new TransparencyCollabService(
            new TransparencyCollabApi(api)
        ))}
    />)

}

export default AllTC