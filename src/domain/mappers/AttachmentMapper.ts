import { AttachmentRequest, AttachmentResponse } from "../../infrastructure/Api/Attachment/interface";
import { AttachmentEntity } from "../entities/PublicationEntity";



class AttachmentMapper {
    static fromDomainToApi(data:AttachmentEntity):AttachmentRequest{
        return {
            description: data.description,
            name: data.name,
            url_download: data.url_download
        }
    }

    static fromApiToDomain(data:AttachmentResponse):AttachmentEntity{
        return {
            description: data.description,
            name: data.name,
            url_download: data.url_download,
            id: data.id
        }
    }
}

export default AttachmentMapper;