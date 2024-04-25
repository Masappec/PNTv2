import { SolicityResultDto } from "../../infrastructure/Api/Solicity/interface";
import { SolicityResultEntity } from "../entities/SolicityResultEntity";
import AttachmentMapper from "./AttachmentMapper";
import FilePublicationMapper from "./FilePublicationMapper";



export class SolicityResultMapper {

    static apiToDomain(data: SolicityResultDto): SolicityResultEntity {

        return {
            attachments: data.attachments.map((attachment) => AttachmentMapper.fromApiToDomain(attachment)),
            files: data.files.map((file) => FilePublicationMapper.fromApiToDomain(file)),
            id_solicitud: data.id_solicitud,
            text: data.text,
            user: {
                email: data.user.email,
                first_name: data.user.first_name,
                id: data.user.id,
                last_name: data.user.last_name

            },
            created_at: data.created_at,
            deleted: data.deleted,
            deleted_at: data.deleted_at,
            ip: data.ip,
            is_active: data.is_active,
            solicity: data.solicity,
            updated_at: data.updated_at,

        }

    }
}