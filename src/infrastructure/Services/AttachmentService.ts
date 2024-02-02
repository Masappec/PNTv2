import { AttachmentEntity } from "../../domain/entities/PublicationEntity";
import AttachmentMapper from "../../domain/mappers/AttachmentMapper";
import AttachmentApi from "../Api/Attachment/AttachmentApi";


class AttachmentService {
    constructor(private readonly api: AttachmentApi) {}
    async createAttachment(data:AttachmentEntity){
        const response = await this.api.createAttachment(AttachmentMapper.fromDomainToApi(data));
        return AttachmentMapper.fromApiToDomain(response);
    }
}

export default AttachmentService;