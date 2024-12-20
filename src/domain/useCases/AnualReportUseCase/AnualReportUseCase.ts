import { AnualReportService } from "../../../infrastructure/Services/AnualReportService";
import { AnualReportEntity } from "../../entities/AnualReportEntity";


export class AnualReportUseCase {
    constructor(private readonly service: AnualReportService) {}

    async createAnualReport(data: AnualReportEntity){
        const response = await this.service.createAnualReport(data);
        return response;
    }

}