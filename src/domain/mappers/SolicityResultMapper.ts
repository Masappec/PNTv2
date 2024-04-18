import { SolicityResultDto } from "../../infrastructure/Api/Solicity/interface";
import { SolicityResultEntity } from "../entities/SolicityResultEntity";



export class SolicityResultMapper {

    static apiToDomain(data: SolicityResultDto): SolicityResultEntity {

        return {
            attachments: data.attachments,
            files: data.files,
            id_solicitud: data.id_solicitud,
            text: data.text,
            user: {
                email: data.user.email,
                first_name: data.user.first_name,
                id: data.user.id,
                last_name: data.user.last_name

            }
        }

    }
}