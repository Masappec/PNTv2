import CreateSolicity from "../../domain/entities/CreateSolicity";
import SolicityMappers from "../../domain/mappers/SolicityMapper";
import SolicityApi from "../Api/Solicity/SolicityApi";

class SolicityService {
  private api: SolicityApi;
  constructor(api: SolicityApi) {
    this.api = api;
  }

  async getSolicities(search?: string, page?: number) {
    const response = await this.api.getSolicity(search, page);
    return {
      ...response,
      results:
        response.results?.map((solicity) =>
          SolicityMappers.apiToDomain(solicity)
        ) || [],
    };
  }

  async getEstablishmentSolicity(search?: string, page?: number) {
    const response = await this.api.getEstablishmentSolicity(search, page);
    return {
      ...response,
      results:
        response.results?.map((solicity) =>
          SolicityMappers.apiToDomain(solicity)
        ) || [],
    };
  }

  async createSolicity(data: CreateSolicity) {
    const response = await this.api.createSolicity(
      SolicityMappers.domainToApi(data)
    );
    return SolicityMappers.apiToDomain(response);
  }
}
export default SolicityService;
