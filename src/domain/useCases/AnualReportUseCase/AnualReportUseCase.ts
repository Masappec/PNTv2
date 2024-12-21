import { AnualReportService } from "../../../infrastructure/Services/AnualReportService";
import { AnualReportEntity } from "../../entities/AnualReportEntity";


export class AnualReportUseCase {
  constructor(private readonly service: AnualReportService) {}

  async createAnualReport(data: AnualReportEntity) {
    const response = await this.service.createAnualReport(data);
    return response;
  }
  public async getSolicityStats(establisment_id: number) {
    return await this.service.getSolicityStats(establisment_id);
  }
  public async getTAResume(
    establisment_id: number,
    isDefault: boolean,
    page: number,
    limit?: number
  ) {
    const res = await this.service.getTAResume(establisment_id, isDefault, page, limit)
    return res;
  }

  public async getTFResume(
    establisment_id: number,
    page: number,
    limit?: number
  ) {
    return await this.service.getTFResume(establisment_id, page, limit);
  }

  public async getTCResume(
    establishment_id: number,
    page: number,
    limit?: number
  ) {
    return await this.service.getTCResume(establishment_id, page, limit);
  }
}