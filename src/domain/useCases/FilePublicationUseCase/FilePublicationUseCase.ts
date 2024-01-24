import FilePublicationService from "../../../infrastructure/Services/FilePublicationService";
import { Row } from "../../../utils/interface";
import { FilePublicationEntity } from "../../entities/PublicationEntity";



class FilePublicationUseCase{

    constructor(private readonly filePublicationRepository: FilePublicationService){}



    generateBlob(data:Row[][]){
        return this.filePublicationRepository.generateBlob(data);
    }

    async downloadFileFromUrl(url:string){
        return await this.filePublicationRepository.downloadFileFromUrl(url);
    }

    async createFilePublication(data: FilePublicationEntity) {
        return await this.filePublicationRepository.createFilePublication(data);
    }
}

export default FilePublicationUseCase;