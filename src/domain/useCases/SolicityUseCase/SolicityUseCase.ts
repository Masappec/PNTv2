import SolicityService from "../../../infrastructure/Services/SolicityService";

class SolicityUseCase {
  constructor(private readonly solicityService: SolicityService) {}
  async getSolicities(search: string, page: number) {
    return await this.solicityService.getSolicities(search, page);
  }
}
export default SolicityUseCase;
