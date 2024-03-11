
import ActiveCreateContainer from "../../../../../components/Transparency/Active/Create/ActiveCreateContainer";
import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase";
import FilePublicationUseCase from "../../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase";
import TemplateFileUseCase from "../../../../../domain/useCases/TemplateFileUseCase/TemplateFileUseCase";
import TransparencyActiveUseCase from "../../../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase";
import api from "../../../../../infrastructure/Api";
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi";
import { FilePublicationApi } from "../../../../../infrastructure/Api/FilePublication/FilePublicationApi";
import TransparencyActiveApi from "../../../../../infrastructure/Api/TansparencyActive/TransparencyActiveApi";
import TemplateFileApi from "../../../../../infrastructure/Api/TemplateFile/TemplateFileApi";
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService";
import FilePublicationService from "../../../../../infrastructure/Services/FilePublicationService";
import TemplateService from "../../../../../infrastructure/Services/TemplateService";
import TransparencyActiveService from "../../../../../infrastructure/Services/TransparencyActiveService";

const ActiveCreate = () => {

    const fileUseCase = new FilePublicationUseCase(
        new FilePublicationService(new FilePublicationApi(api))
    )
    const templateFileUseCase = new TemplateFileUseCase(
        new TemplateService(new TemplateFileApi(api))
    )

    const transparencyActiveUseCase = new TransparencyActiveUseCase(
        new TransparencyActiveService(
            new TransparencyActiveApi(api)
        )
    )

    const establishmentUseCase = new EstablishmentUseCase(
        new EstablishmentService(
            new EstablishmentApi(api)
        )
    )
    return (
        <ActiveCreateContainer
            usecase={fileUseCase}
            templateUseCase={templateFileUseCase}
            transparencyActiveUseCase={transparencyActiveUseCase}
            establishmentUseCase={establishmentUseCase}
        />

    )

}

export default ActiveCreate