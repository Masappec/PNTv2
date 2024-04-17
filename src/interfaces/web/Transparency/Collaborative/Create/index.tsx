import CollaborativeCreateContainer from "../../../../../components/Transparency/Collaborative/Create/CollaborativeCreateContainer";
import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase";
import FilePublicationUseCase from "../../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase";
import TransparencyCollabUseCase from "../../../../../domain/useCases/TransparencyCollabUseCase/TransparencyCollabUseCase";
import api from "../../../../../infrastructure/Api";
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi";
import { FilePublicationApi } from "../../../../../infrastructure/Api/FilePublication/FilePublicationApi";
import TransparencyCollabApi from "../../../../../infrastructure/Api/TransparencyCollab/TransparencyCollab";
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService";
import FilePublicationService from "../../../../../infrastructure/Services/FilePublicationService";
import TransparencyCollabService from "../../../../../infrastructure/Services/TransparencyCollabService";

const CollaborativeCreate = () => {

    const usecase = new TransparencyCollabUseCase(
        new TransparencyCollabService(
            new TransparencyCollabApi(api)
        )
    )

    const file = new FilePublicationUseCase(
        new FilePublicationService(
            new FilePublicationApi(api)
        )
    )
    const estab = new EstablishmentUseCase(
        new EstablishmentService(
            new EstablishmentApi(api)
        )
    )
    return (
        <CollaborativeCreateContainer
            tcollabUseCase={usecase}
            establishmentUseCase={estab}
            fileUseCase={file}
        />

    )
}

export default CollaborativeCreate;