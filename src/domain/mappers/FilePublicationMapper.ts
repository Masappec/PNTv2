import { FilePublicationRequest, FilePublicationResponse } from "../../infrastructure/Api/FilePublication/interface";
import { FilePublicationEntity } from "../entities/PublicationEntity";


class FilePublicationMapper{

    static fromDomainToApi(filePublication: FilePublicationEntity,file:File): FilePublicationRequest{
        return {
            description: filePublication.description,
            name: filePublication.name,
            url_download:  file
        }
    }

    static fromApiToDomain(filePublication: FilePublicationResponse): FilePublicationEntity{
        return {
            description: filePublication.description,
            name: filePublication.name,
            url_download:  filePublication.url_download,
            id: filePublication.id
        }
    }
}

export default FilePublicationMapper;