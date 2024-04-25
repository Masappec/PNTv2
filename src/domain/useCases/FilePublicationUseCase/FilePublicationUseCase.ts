import { AxiosProgressEvent } from "axios";
import FilePublicationService from "../../../infrastructure/Services/FilePublicationService";
import { Row } from "../../../utils/interface";
import { FilePublicationEntity } from "../../entities/PublicationEntity";



class FilePublicationUseCase {

    constructor(private readonly filePublicationRepository: FilePublicationService) { }



    generateBlob(data: Row[][]) {
        return this.filePublicationRepository.generateBlob(data);
    }

    async downloadFileFromUrl(url: string) {
        return await this.filePublicationRepository.downloadFileFromUrl(url);
    }

    async createFilePublication(data: FilePublicationEntity,
        callbackUpload?: (e: AxiosProgressEvent) => void,
    ) {
        return await this.filePublicationRepository.createFilePublication(data, callbackUpload);
    }

    async getFilesPublications(type: "TA" | "TC" | "TF", page?: number, limit?: number, search?: string) {
        return await this.filePublicationRepository.getFilesPublications(type, page, limit, search);
    }
}

export default FilePublicationUseCase;