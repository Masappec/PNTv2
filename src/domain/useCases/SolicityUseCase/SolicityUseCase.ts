import SolicityService from "../../../infrastructure/Services/SolicityService";

class SolicityUseCase {
  constructor(private readonly solicityService: SolicityService) { }
  async getSolicities(search: string, page: number) {
    return await this.solicityService.getSolicities(search, page);
  }
  async getEstablishmentSolicity(search: string, page: number) {
    return await this.solicityService.getEstablishmentSolicity(search, page);
  }
}
export default SolicityUseCase;
