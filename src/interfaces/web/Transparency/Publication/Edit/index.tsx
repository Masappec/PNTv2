import PublicationEditContainer from "../../../../../components/Transparency/Publication/Edit/PublicationEditContainer";
import PublicationUseCase from "../../../../../domain/useCases/PublicationUseCase/PublicationUseCase";
import api from "../../../../../infrastructure/Api";
import PublicationApi from "../../../../../infrastructure/Api/Publication/PublicationApi"
import TagApi from "../../../../../infrastructure/Api/TagApi/TagApi"
import AttachmentService from "../../../../../infrastructure/Services/AttachmentService"
import FilePublicationService from "../../../../../infrastructure/Services/FilePublicationService"
import PublicationService from "../../../../../infrastructure/Services/PublicationService"
import TagService from "../../../../../infrastructure/Services/TagService"
import AttachmentUseCase from "../../../../../domain/useCases/AttachmentUseCase/AttachmentUseCase"
import FilePublicationUseCase from "../../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase"
import TagUseCase from "../../../../../domain/useCases/TagUseCase/TagUseCase"
import { FilePublicationApi } from "../../../../../infrastructure/Api/FilePublication/FilePublicationApi";
import AttachmentApi from "../../../../../infrastructure/Api/Attachment/AttachmentApi";

const PublicationEdit= ()=>{

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
    return(
       <PublicationEditContainer
       publicationUsecase={publicationUsecase}
         attachmentUsecase={attachmentUsecase}
            tagUseCase={tagUsecase}
            fileUseCase={fileUsecase}

       />
    )      
}

export default PublicationEdit