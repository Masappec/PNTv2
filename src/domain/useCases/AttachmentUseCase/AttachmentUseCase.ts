import AttachmentService from "../../../infrastructure/Services/AttachmentService";
import { AttachmentEntity } from "../../entities/PublicationEntity";



class AttachmentUseCase {
    constructor(private readonly service: AttachmentService) {}
    async createAttachment(data:AttachmentEntity){
        const response = await this.service.createAttachment(data);
        return response;
    }
}

export default AttachmentUseCase;