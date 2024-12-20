import { AnualReportEntity } from "../../domain/entities/AnualReportEntity";
import { AnualReportMapper } from "../../domain/mappers/AnualReportMapper";
import { AnualReportApi } from "../Api/AnualReport/AnualReportApi";

export class AnualReportService {
    constructor(private readonly anualReportApi: AnualReportApi) {}

    public async createAnualReport(data: AnualReportEntity) {
        const res = await this.anualReportApi.createAnualReport(AnualReportMapper.toDto(data));
        return AnualReportMapper.toDomain(res);
    }
}