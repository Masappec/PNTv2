import { AxiosError, AxiosInstance } from "axios";
import { NumeralDTO, NumeralDetailDTO } from "./interface";
import { TRANSPARENCY_PATH } from "..";

class NumeralApi {
  constructor(private readonly api: AxiosInstance) {}

  async getNumeralByEstablishment(id: number, year?: number, month?: number) {
    try {
      const response = await this.api.get<NumeralDTO[]>(
        TRANSPARENCY_PATH + "/numerals/",
        {
          params: {
            establishtment_id: id,
            year,
            month,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Ocurrió un error al obtener los numerales";
        throw new Error(message);
      } else {
        throw new Error("Ocurrió un error al obtener los numerales");
      }
    }
  }

  async getNumeralById(id: number, type?: string) {
    try {
      const response = await this.api.get<NumeralDetailDTO>(
        TRANSPARENCY_PATH + "/numerals/detail/",
        {
          params: {
            numeral_id: id || null,
            type,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Ocurrió un error al obtener el numeral";
        throw new Error(message);
      } else {
        throw new Error("Ocurrió un error al obtener el numeral");
      }
    }
  }

  async getNumeralsAllowed() {
    try {
      const response = await this.api.get<NumeralDetailDTO[]>(
        TRANSPARENCY_PATH + "/numerals/allow/",
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Ocurrió un error al obtener los numerales permitidos";
        throw new Error(message);
      } else {
        throw new Error("Ocurrió un error al obtener los numerales permitidos");
      }
    }
  }

  async updateNumeralState(id: number, data: { isDefault: boolean }) {
    try {
      const response = await this.api.patch(
        `${TRANSPARENCY_PATH}/numerals/${id}/update-state/`,
        data,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Ocurrió un error al actualizar el estado del numeral";
        throw new Error(message);
      } else {
        throw new Error("Ocurrió un error al actualizar el estado del numeral");
      }
    }
  }
}

export default NumeralApi;
