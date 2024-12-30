import { AnualReportEntity } from "../../domain/entities/AnualReportEntity";
import { AnualReportMapper } from "../../domain/mappers/AnualReportMapper";
import { AnualReportApi } from "../Api/AnualReport/AnualReportApi";

export class AnualReportService {
  constructor(private readonly anualReportApi: AnualReportApi) {}

  public async createAnualReport(data: AnualReportEntity) {
    const res = await this.anualReportApi.createAnualReport(
      AnualReportMapper.toDto(data)
    );
    return AnualReportMapper.toDomain(res);
  }

  public async getSolicityStats(establisment_id: number) {
    return await this.anualReportApi.getSolicityStats(establisment_id);
  }

  public async getTAResume(
    establisment_id: number,
    isDefault: boolean,
    page: number,
    limit?: number
  ) {
    const res = await this.anualReportApi.getTAResume(
      establisment_id,
      isDefault,
      page,
      limit
    );
    return res;
  }

  public async getTFResume(
    establisment_id: number,
    page: number,
    limit?: number
  ) {
    return await this.anualReportApi.getTFResume(establisment_id, page, limit);
  }

  public async getTCResume(
    establishment_id: number,
    page: number,
    limit?: number
  ) {
    return await this.anualReportApi.getTCResume(establishment_id, page, limit);
  }

  public async generateAnualReport(year: number) {
    return await this.anualReportApi.generateAnualReport(year);
  }
  public async getTaskEndAnualReport(task_id: string) {
    return await this.anualReportApi.getTaskEndAnualReport(task_id);
  }
}