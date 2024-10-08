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

    generateBlobVertical(data: Row[][]) {
        return this.filePublicationRepository.generateBlobVertical(data);
    }


    async createFilePublication(data: FilePublicationEntity,
        callbackUpload?: (e: AxiosProgressEvent) => void,
    ) {
        return await this.filePublicationRepository.createFilePublication(data, callbackUpload);
    }

    async getFilesPublications(type: "TA" | "TC" | "TF", numeral_id: number, page?: number, limit?: number, search?: string) {
        return await this.filePublicationRepository.getFilesPublications(type, numeral_id, page, limit, search);
    }
    generateContentCsv(data: Row[][]) {
        return this.filePublicationRepository.generateContentCsv(data);
    }
    csvContentToFile(data: string, filename: string) {
        return this.filePublicationRepository.csvContentToFile(data, filename);
    }
    csvContentFromColumsAndRows(columns: string[], rows: string[][], filename: string,isVertical:boolean) {
        return this.filePublicationRepository.csvContentFromColumnsAndRows(columns, rows, filename,isVertical);
    }
    generateContentCsvVertical(data: Row[][]) {
        return this.filePublicationRepository.generateContentCsvVertical(data);
    }

    async getFromUrl(url: string) {
        return await this.filePublicationRepository.getFromUri(url);
    }
}

export default FilePublicationUseCase;