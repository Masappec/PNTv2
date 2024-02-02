import PublicationCreateContainer from "../../../../../components/Transparency/Publication/Create/PublicationCreateContainer"
import AttachmentUseCase from "../../../../../domain/useCases/AttachmentUseCase/AttachmentUseCase"
import FilePublicationUseCase from "../../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase"
import PublicationUseCase from "../../../../../domain/useCases/PublicationUseCase/PublicationUseCase"
import TagUseCase from "../../../../../domain/useCases/TagUseCase/TagUseCase"
import api from "../../../../../infrastructure/Api"
import AttachmentApi from "../../../../../infrastructure/Api/Attachment/AttachmentApi"
import { FilePublicationApi } from "../../../../../infrastructure/Api/FilePublication/FilePublicationApi"
import PublicationApi from "../../../../../infrastructure/Api/Publication/PublicationApi"
import TagApi from "../../../../../infrastructure/Api/TagApi/TagApi"
import AttachmentService from "../../../../../infrastructure/Services/AttachmentService"
import FilePublicationService from "../../../../../infrastructure/Services/FilePublicationService"
import PublicationService from "../../../../../infrastructure/Services/PublicationService"
import TagService from "../../../../../infrastructure/Services/TagService"

const PublicationCreate = () => {

    const tagApi = new TagApi(api)
    const tagService = new TagService(tagApi)
    const tagUsecase = new TagUseCase(tagService)

    const fileApi = new FilePublicationApi(api)
    const fileService = new FilePublicationService(fileApi)
    const fileUsecase = new FilePublicationUseCase(fileService)


    const publicationApi = new PublicationApi(api)
    const publicationService = new PublicationService(publicationApi)
    const publicationUsecase = new PublicationUseCase(publicationService)



    const attachmentApi = new AttachmentApi(api);
    const attachmentService = new AttachmentService(attachmentApi);
    const attachmentUsecase = new AttachmentUseCase(attachmentService);
    return (
        <PublicationCreateContainer
        tagUseCase={tagUsecase}
        fileUseCase={fileUsecase}
        publicationUsecase={publicationUsecase}
        attachmentUsecase={attachmentUsecase}
        />
    )

}

export default PublicationCreate