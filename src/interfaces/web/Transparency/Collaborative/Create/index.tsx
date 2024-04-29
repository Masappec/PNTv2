import CollaborativeCreateContainer from "../../../../../components/Transparency/Collaborative/Create/CollaborativeCreateContainer";
import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase";
import FilePublicationUseCase from "../../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase";
import NumeralUseCase from "../../../../../domain/useCases/NumeralUseCase/NumeraUseCase";
import TemplateFileUseCase from "../../../../../domain/useCases/TemplateFileUseCase/TemplateFileUseCase";
import TransparencyCollabUseCase from "../../../../../domain/useCases/TransparencyCollabUseCase/TransparencyCollabUseCase";
import api from "../../../../../infrastructure/Api";
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi";
import { FilePublicationApi } from "../../../../../infrastructure/Api/FilePublication/FilePublicationApi";
import NumeralApi from "../../../../../infrastructure/Api/Numeral/NumeralApi";
import TemplateFileApi from "../../../../../infrastructure/Api/TemplateFile/TemplateFileApi";
import TransparencyCollabApi from "../../../../../infrastructure/Api/TransparencyCollab/TransparencyCollab";
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService";
import FilePublicationService from "../../../../../infrastructure/Services/FilePublicationService";
import NumeralService from "../../../../../infrastructure/Services/NumeralService";
import TemplateService from "../../../../../infrastructure/Services/TemplateService";
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

    const numeral = new NumeralUseCase(
        new NumeralService(
            new NumeralApi(api)
        ),
        new EstablishmentService(
            new EstablishmentApi(api)
        )
    )
    const templateFileUseCase = new TemplateFileUseCase(
        new TemplateService(new TemplateFileApi(api))
    )
    return (
        <CollaborativeCreateContainer
            tcollabUseCase={usecase}
            establishmentUseCase={estab}
            fileUseCase={file}
            numeral={numeral}
            templateUseCase={templateFileUseCase}
        />

    )
}

export default CollaborativeCreate;