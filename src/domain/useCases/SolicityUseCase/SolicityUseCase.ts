import SolicityService from "../../../infrastructure/Services/SolicityService";
import CreateSolicity from "../../entities/CreateSolicity";
import ResponseSolicity from "../../entities/ResponseSolicity";

class SolicityUseCase {
  constructor(private readonly solicityService: SolicityService) { }
  async getSolicities(search: string, page: number) {
    return await this.solicityService.getSolicities(search, page);
  }
  async getEstablishmentSolicity(search: string, page: number) {
    return await this.solicityService.getEstablishmentSolicity(search, page);
  }
  async createDraft(data: CreateSolicity) {
    return await this.solicityService.createDraftSolicity(data);
  }

  async sendDraftSolicity(data: CreateSolicity, id: number) {
    return await this.solicityService.sendDraftSolicity(data, id);
  }

  async getSolicityById(id: number) {
    return await this.solicityService.getSolicityById(id);
  }

  async sendSolicityWithouDraft(data: CreateSolicity) {
    return await this.solicityService.sendSolicityWithouDraft(data);
  }

  async responseSolicity(data: ResponseSolicity) {
    return await this.solicityService.responseSolicity(data);
  }

  async getLastDraftSolicity() {
    return await this.solicityService.getLastDraftSolicity();
  }

  async updateSolicity(data: CreateSolicity, id: number) {
    return await this.solicityService.updateSolicity(data, id);

  }

  buildSaipCode() {
    return Math.floor(100000 + Math.random() * 900000);

  }
}
export default SolicityUseCase;
