import CollaborativeEditContainer from "../../../../../components/Transparency/Collaborative/Edit/CollaborativeEditContainer";
//import FocalizedEditContainer from "../../../../../components/Transparency/focalized/Edit/FocalizedEditContainer";
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
const CollaborativeEdit = () => {
    const estab = new EstablishmentUseCase(
        new EstablishmentService(
            new EstablishmentApi(api)
        )
    )
    const file = new FilePublicationUseCase(
        new FilePublicationService(
            new FilePublicationApi(api)
        )
    )
    const tfocalized = new TransparencyCollabUseCase(
        new TransparencyCollabService(
            new TransparencyCollabApi(api)
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

        <CollaborativeEditContainer
            establishmentUseCase={estab}
            fileUseCase={file}
            numeral={numeral}
            templateUseCase={templateFileUseCase}
            tfocalizedUseCase={tfocalized}
        />
    )
}
export default CollaborativeEdit;