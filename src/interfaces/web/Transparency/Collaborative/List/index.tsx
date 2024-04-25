import CollaborativeListContainer from "../../../../../components/Transparency/Collaborative/List/CollaborativeListContainer";
import TransparencyCollabUseCase from "../../../../../domain/useCases/TransparencyCollabUseCase/TransparencyCollabUseCase";
import api from "../../../../../infrastructure/Api";
import TransparencyCollabApi from "../../../../../infrastructure/Api/TransparencyCollab/TransparencyCollab";
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
        />
    )

}
export default CollaborativeList;