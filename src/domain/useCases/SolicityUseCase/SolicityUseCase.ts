import SolicityService from "../../../infrastructure/Services/SolicityService";
import CreateSolicity from "../../entities/CreateSolicity";

class SolicityUseCase {
  constructor(private readonly solicityService: SolicityService) { }
  async getSolicities(search: string, page: number) {
    return await this.solicityService.getSolicities(search, page);
  }
  async getEstablishmentSolicity(search: string, page: number) {
    return await this.solicityService.getEstablishmentSolicity(search, page);
  }
  async createSolicity(data: CreateSolicity) {
    return await this.solicityService.createSolicity(data);
  }
}
export default SolicityUseCase;
