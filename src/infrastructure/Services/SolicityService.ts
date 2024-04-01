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
}
export default SolicityService;
