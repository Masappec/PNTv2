import CreateSolicity from "../../domain/entities/CreateSolicity";
import ResponseSolicity from "../../domain/entities/ResponseSolicity";
import SolicityMappers from "../../domain/mappers/SolicityMapper";
import SolicityApi from "../Api/Solicity/SolicityApi";
import { SolicityResponseDto } from "../Api/Solicity/interface";

class SolicityService {
  private api: SolicityApi;
  constructor(api: SolicityApi) {
    this.api = api;
  }

  async getSolicities(search?: string, page?: number, limit?: number) {
    const response = await this.api.getSolicity(search, page, limit);
    return {
      ...response,
      results:
        response.results?.map((solicity) =>
          SolicityMappers.apiToDomain(solicity)
        ) || [],
    };
  }

  async getEstablishmentSolicity(search?: string, page?: number, limit?: number, sort?: string[]) {
    const response = await this.api.getEstablishmentSolicity(search, page, limit, sort);
    return {
      ...response,
      results:
        response.results?.map((solicity) =>
          SolicityMappers.apiToDomain(solicity)
        ) || [],
    };
  }

  async createDraftSolicity(data: CreateSolicity) {
    const response = await this.api.createDraftSolicity(
      SolicityMappers.domainToApi(data)
    );
    return SolicityMappers.apiToDomain(response.json as SolicityResponseDto);
  }

  async getLastDraftSolicity() {
    const response = await this.api.getLastDraftSolicity();
    return SolicityMappers.apiToDomain(response.json as SolicityResponseDto);
  }

  async sendDraftSolicity(data: CreateSolicity, id: number) {
    const response = await this.api.sendDraftSolicity({
      ...SolicityMappers.domainToApi(data),
      id,
    });
    return SolicityMappers.apiToDomain(response.json as SolicityResponseDto);
  }
  async getSolicityById(id: number) {
    const response = await this.api.getSolicityById(id);
    return SolicityMappers.apiToDomain(response.json as SolicityResponseDto);
  }
  async sendSolicityWithouDraft(data: CreateSolicity) {
    const response = await this.api.sendSolicityWithouDraft(
      SolicityMappers.domainToApi(data)
    );
    return SolicityMappers.apiToDomain(response.json as SolicityResponseDto);
  }
  async getSolicityBiIdEstablishment(id: number) {

    const response = await this.api.getSolicityByIdEstablishment(id);
    return SolicityMappers.apiToDomain(response.json as SolicityResponseDto);
  }
  async responseSolicity(data: ResponseSolicity) {
    const response = await this.api.responseSolicity(
      SolicityMappers.domainApi(data)
    );
    return SolicityMappers.apiToDomain(response.json as SolicityResponseDto);
  }

  async updateSolicity(data: CreateSolicity, id: number) {
    const response = await this.api.updateSolicity(
      {
        ...SolicityMappers.domainToApi(data),
        id,
      }
    );
    return SolicityMappers.apiToDomain(response.json as SolicityResponseDto);
  }


  async createManualSolicity(data: CreateSolicity) {
    const response = await this.api.createManualSolicity(
      SolicityMappers.domainToApi(data)
    );
    return SolicityMappers.apiToDomain(response.json as SolicityResponseDto);
  }

  async commentSolicity(solicity_id: number, comment: string) {
    const response = await this.api.commentSolicity({
      motive: comment,
      solicity_id: solicity_id,
    });
    return response;
  }
}
export default SolicityService;
