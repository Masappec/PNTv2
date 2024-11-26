import { AxiosError, AxiosInstance } from "axios";
import { Pagination, TRANSPARENCY_PATH } from "..";
import { CommentDto, SendDraftSolicity, SolicityDraftRequestDto, SolicityResponseDto, SolicityResult } from "./interface";
import { MessageTranslation } from "../../../utils/data";


class SolicityApi {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }
  async getSolicity(search?: string, page?: number, limit?: number,sort?:string[],
    range_start?: string, range_end?: string) {
    try {
      const response = await this.api.get<Pagination<SolicityResponseDto>>(
        TRANSPARENCY_PATH + "/solicity/list",
        {
          params: {
            search, page, limit, sort, range_start, range_end
 } }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string =
          error.response?.data?.message || "Error al obtener las solicitudes.";
        throw new Error(e);
      } else {
        throw new Error("Error al obtener las solicitudes.");
      }
    }
  }

  async getEstablishmentSolicity(search?: string, page?: number, limit?: number, sort?: string[],status?:string,establishment_id?:number) {
    try {
      const response = await this.api.get<Pagination<SolicityResponseDto>>(
        TRANSPARENCY_PATH + `/solicity_response/list`,
        {
          params: {
            search: search ? search : null,
            page: page ? page : null,
            limit: limit ? limit : null,
            sort: sort ? sort : null,
            status:status?status:null,
            establishment_id:establishment_id?establishment_id:null

          }
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string =
          error.response?.data?.message || "Error al obtener las solicitudes.";
        throw new Error(e);
      } else {
        throw new Error("Error al obtener las solicitudes.");
      }
    }
  }

  async getSolicityById(id: number) {
    try {
      const response = await this.api.get<MessageTranslation<SolicityResponseDto>>(
        TRANSPARENCY_PATH + `/solicity/detail/${id}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string =
          error.response?.data?.message || "Error al obtener la solicitud.";
        throw new Error(e);
      } else {
        throw new Error("Error al obtener la solicitud.");
      }
    }
  }

  async getSolicityByIdEstablishment(id: number) {
    try {
      const response = await this.api.get<MessageTranslation<SolicityResponseDto>>(
        TRANSPARENCY_PATH + `/solicity_response/detail/${id}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string =
          error.response?.data?.message || "Error al obtener la solicitud.";
        throw new Error(e);
      } else {
        throw new Error("Error al obtener la solicitud.");
      }
    }
  }

  async updateSolicity(data: SendDraftSolicity) {
    try {
      const response = await this.api.put<MessageTranslation<SolicityResponseDto>>(
        TRANSPARENCY_PATH + `/solicity/update`,
        data
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string =
          error.response?.data?.message || "Error al actualizar la solicitud.";
        throw new Error(e);
      } else {
        throw new Error("Error al actualizar la solicitud.");
      }
    }
  }

  async createDraftSolicity(data: SolicityDraftRequestDto) {

    try {
      const response = await this.api.post<MessageTranslation<SolicityResponseDto>>(TRANSPARENCY_PATH + "/solicity/create/draft", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string = error.response?.data?.message || "Error al crear la solicitud.";
        throw new Error(e);
      } else {
        throw new Error("Error al crear la solicitud.");
      }
    }
  }


  //solicity/create_manual
  async createManualSolicity(data: SolicityDraftRequestDto) {

    try {
      const response = await this.api.post<MessageTranslation<SolicityResponseDto>>(TRANSPARENCY_PATH + "/solicity/create_manual", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string = error.response?.data?.message || "Error al crear la solicitud.";
        throw new Error(e);
      } else {
        throw new Error("Error al crear la solicitud.");
      }
    }
  }

  async getLastDraftSolicity() {
    try {
      const response = await this.api.get<MessageTranslation<SolicityResponseDto>>(TRANSPARENCY_PATH + "/solicity/get_last_draft");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string = error.response?.data?.message || "Error al obtener la solicitud.";
        throw new Error(e);
      } else {
        throw new Error("Error al obtener la solicitud.");
      }
    }
  }

  async sendDraftSolicity(data: SendDraftSolicity) {
    try {
      const response = await this.api.post<MessageTranslation<SolicityResponseDto>>(TRANSPARENCY_PATH + "/solicity/draft/send", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string = error.response?.data?.message || "Error al crear la solicitud.";
        throw new Error(e);
      } else {
        throw new Error("Error al crear la solicitud.");
      }
    }
  }


  async sendSolicityWithouDraft(data: SolicityDraftRequestDto) {
    try {
      const response = await this.api.post<MessageTranslation<SolicityResponseDto>>(TRANSPARENCY_PATH + "/solicity/send", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string = error.response?.data?.message || "Error al crear la solicitud.";
        throw new Error(e);
      } else {
        throw new Error("Error al crear la solicitud.");
      }
    }
  }




  async responseSolicity(data: SolicityResult) {
    try {
      const response = await this.api.post<MessageTranslation<SolicityResponseDto>>(TRANSPARENCY_PATH + "/solicity_response/create", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string = error.response?.data?.message || "Error al responder la solicitud.";
        throw new Error(e);
      } else {
        throw new Error("Error al responder la solicitud.");
      }
    }

  }

  async commentSolicity(data: CommentDto) {
    try{
      const res = await this.api.post(TRANSPARENCY_PATH+'/solicity/comment',data);
      return res.data;
    } catch (error){
      if (error instanceof AxiosError) {
        const e: string = error.response?.data?.message || "Error al enviar commentario.";
        throw new Error(e);
      } else {
        throw new Error("Error al responder la solicitud.");
      }
    }

  }

  async changeStatus(data:{solicity_id:number,
    text:string,
  }) {
    try {
      const res = await this.api.post<MessageTranslation<SolicityResponseDto>>(TRANSPARENCY_PATH + '/solicity/change-status', data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string = error.response?.data?.message || "Error al enviar commentario.";
        throw new Error(e);
      } else {
        throw new Error("Error al solicitar operación");
      }
    }
  }

  async deleteSolicity(id: number) {

    //solicity/draft/delete/

    try {
      const response = await this.api.delete(TRANSPARENCY_PATH + `/solicity/draft/delete/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const e: string = error.response?.data?.message || "Error al eliminar la solicitud.";
        throw new Error(e);
      } else {
        throw new Error("Error al eliminar la solicitud.");
      }
    }
  }
}

export default SolicityApi;
