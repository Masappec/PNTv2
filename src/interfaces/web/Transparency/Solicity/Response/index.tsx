import SolicityResponseContainer from "../../../../../components/Transparency/Solicity/Response/SolicityResponseContainer"
import AttachmentUseCase from "../../../../../domain/useCases/AttachmentUseCase/AttachmentUseCase"
import FilePublicationUseCase from "../../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase"
import PublicUseCase from "../../../../../domain/useCases/Public/PublicUseCase"
import SolicityUseCase from "../../../../../domain/useCases/SolicityUseCase/SolicityUseCase"
import api from "../../../../../infrastructure/Api"
import AttachmentApi from "../../../../../infrastructure/Api/Attachment/AttachmentApi"
import { FilePublicationApi } from "../../../../../infrastructure/Api/FilePublication/FilePublicationApi"
import PublicApi from "../../../../../infrastructure/Api/Public/PublicApi"
import SolicityApi from "../../../../../infrastructure/Api/Solicity/SolicityApi"
import AttachmentService from "../../../../../infrastructure/Services/AttachmentService"
import FilePublicationService from "../../../../../infrastructure/Services/FilePublicationService"
import PublicService from "../../../../../infrastructure/Services/PublicService"
import SolicityService from "../../../../../infrastructure/Services/SolicityService"


const SolicityResponse = () => {
    const usecase = new SolicityUseCase(
        new SolicityService(
            new SolicityApi(api)
        )
    )
    const _public = new PublicUseCase(
        new PublicService(
            new PublicApi(api)
        )
    )

    const fileUseCase = new FilePublicationUseCase(
        new FilePublicationService(
            new FilePublicationApi(api)
        )
    )

    const attachmentUsecase = new AttachmentUseCase(
        new AttachmentService(
            new AttachmentApi(api)
        )
    )


    return (
        <SolicityResponseContainer
            usecase={usecase}
            attachmentUsecase={attachmentUsecase}
            fileUseCase={fileUseCase}
            publicusecase={_public} />
    )

}

export default SolicityResponse