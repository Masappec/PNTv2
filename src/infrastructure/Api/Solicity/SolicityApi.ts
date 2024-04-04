import { AxiosInstance } from "axios";
import { Pagination, TRANSPARENCY_PATH } from "..";
import { SolicityRequestDto, SolicityResponseDto, SolicityResult } from "./interface";


class SolicityApi {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }
  async getSolicity(search?: string, page?: number) {
    try {
      const response = await this.api.get<Pagination<SolicityResponseDto>>(
        TRANSPARENCY_PATH + "/solicity/list",
        { params: { search, page } }
      );
      return response.data;
    } catch (error: any) {
      const e: string =
        error.response?.data?.message || "Error al obtener las solicitudes.";
      throw new Error(e);
    }
  }

  async getEstablishmentSolicity(search?: string, page?: number) {
    try {
      const response = await this.api.get<Pagination<SolicityResponseDto>>(
        TRANSPARENCY_PATH + `/solicity_response/list`,
        {
          params: {
            search: search ? search : null,
            page: page ? page : null

          }
        }
      );
      return response.data;
    } catch (error: any) {
      const e: string =
        error.response?.data?.message || "Error al obtener la solicitud.";
      throw new Error(e);
    }
  }

  async createSolicity(data: SolicityRequestDto) {

    try {
      const response = await this.api.post<SolicityResponseDto>(TRANSPARENCY_PATH + "/solicity/create", data);
      return response.data;
    } catch (error: any) {
      const e: string = error.response?.data?.message || "Error al crear la solicitud.";
      throw new Error(e);
    }
  }

  async responseSolicity(data:SolicityResult){
    try {
      const response = await this.api.post<SolicityResponseDto>(TRANSPARENCY_PATH + "/solicity_response/create", data);
      return response.data;
    } catch (error: any) {
      const e: string = error.response?.data?.message || "Error al enviar la solicitud.";
      throw new Error(e);
    }

  }
}

export default SolicityApi;
