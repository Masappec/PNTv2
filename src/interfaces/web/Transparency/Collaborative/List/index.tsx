import CollaborativeListContainer from "../../../../../components/Transparency/Collaborative/List/CollaborativeListContainer";
import TransparencyActiveUseCase from "../../../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase";
import TransparencyCollabUseCase from "../../../../../domain/useCases/TransparencyCollabUseCase/TransparencyCollabUseCase";
import api from "../../../../../infrastructure/Api";
import TransparencyActiveApi from "../../../../../infrastructure/Api/TansparencyActive/TransparencyActiveApi";
import TransparencyCollabApi from "../../../../../infrastructure/Api/TransparencyCollab/TransparencyCollab";
import TransparencyActiveService from "../../../../../infrastructure/Services/TransparencyActiveService";
import TransparencyCollabService from "../../../../../infrastructure/Services/TransparencyCollabService";


const CollaborativeList = () => {

    const usecase = new TransparencyCollabUseCase(
        new TransparencyCollabService(
            new TransparencyCollabApi(api)
        )
    )
    return (

        <CollaborativeListContainer
            usecase={usecase}
            transparencyUseCase={new TransparencyActiveUseCase(
                new TransparencyActiveService(new TransparencyActiveApi(api))
            )}
        />
    )

}
export default CollaborativeList;