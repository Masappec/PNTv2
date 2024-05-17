import { TRANSPARENCY_PATH } from "../../infrastructure/Api";
import { FilePublicationRequest, FilePublicationResponse } from "../../infrastructure/Api/FilePublication/interface";
import { URL_API } from "../../utils/constans";
import { FilePublicationEntity } from "../entities/PublicationEntity";


class FilePublicationMapper {

    static fromDomainToApi(filePublication: FilePublicationEntity, file: File): FilePublicationRequest {
        return {
            description: filePublication.description,
            name: filePublication.name,
            url_download: file
        }
    }

    static fromApiToDomain(filePublication: FilePublicationResponse): FilePublicationEntity {
        return {
            description: filePublication.description,
            name: filePublication.name,
            url_download: filePublication.url_download ? URL_API + TRANSPARENCY_PATH + filePublication.url_download : "",
            id: filePublication.id,
            created_at: filePublication.created_at
        }
    }
}

export default FilePublicationMapper;