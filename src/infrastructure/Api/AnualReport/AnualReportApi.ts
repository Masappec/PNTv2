import { AxiosError, AxiosInstance } from "axios";
import { Pagination, PUBLIC_PATH, TRANSPARENCY_PATH } from "..";
import {
  AnualReportCreateDto,
  AnualReportResponseDto,
  ReservasPnt2,
  SolicityStatsAnualReportDto,
  TaskAnualReportDto,
  TaskEndAnualReportDto,
} from "./interface";
import { TransparencyActivePublicResponse } from "../TansparencyActive/interface";
import { TransparencyFocusListDto } from "../TransparencyFocus/interface";
import { TransparencyCollabListDto } from "../TransparencyCollab/interface";

export class AnualReportApi {
  constructor(private readonly api: AxiosInstance) {}

  public async createAnualReport(data: AnualReportCreateDto) {
    try {
      const res = await this.api.post<AnualReportResponseDto>(
        TRANSPARENCY_PATH + "/anual-report",
        data
      );
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err.response?.data;
        if (error) {
          throw new Error(error.message);
        }
        throw new Error(err.message);
      } else {
        throw new Error("Ocurrió un error inesperado");
      }
    }
  }

  public async getSolicityStats(establisment_id: number) {
    try {
      const res = await this.api.get<SolicityStatsAnualReportDto[]>(
        TRANSPARENCY_PATH + "/anual-report/solicity/stats",
        {
          params: {
            establisment_id,
          },
        }
      );

      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err.response?.data;
        if (error) {
          throw new Error(error.message);
        }
        throw new Error(err.message);
      } else {
        throw new Error("Ocurrió un error inesperado");
      }
    }
  }

  public async getTAResume(
    establishment_id: number,
    isDefault: boolean,
    page: number,
    limit?: number
  ) {
    try {
      const res = await this.api.get<
        Pagination<TransparencyActivePublicResponse>
      >(TRANSPARENCY_PATH + "/anual-report/ta/stats", {
        params: {
          establishment_id,
          is_default: isDefault ? 1 : 0,
          page,
          limit,
        },
      });
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err.response?.data;
        if (error) {
          throw new Error(error.message);
        }
        throw new Error(err.message);
      } else {
        throw new Error("Ocurrió un error inesperado");
      }
    }
  }

  public async getTFResume(
    establishment_id: number,
    page: number,
    limit?: number
  ) {
    try {
      const res = await this.api.get<Pagination<TransparencyFocusListDto>>(
        TRANSPARENCY_PATH + "/anual-report/tf/stats",
        {
          params: {
            establishment_id,
            page,
            limit,
          },
        }
      );
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err.response?.data;
        if (error) {
          throw new Error(error.message);
        }
        throw new Error(err.message);
      } else {
        throw new Error("Ocurrió un error inesperado");
      }
    }
  }

  public async getTCResume(
    establishment_id: number,
    page: number,
    limit?: number
  ) {
    try {
      const res = await this.api.get<Pagination<TransparencyCollabListDto>>(
        TRANSPARENCY_PATH + "/anual-report/tc/stats",
        {
          params: {
            establishment_id,
            page,
            limit,
          },
        }
      );
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err.response?.data;
        if (error) {
          throw new Error(error.message);
        }
        throw new Error(err.message);
      } else {
        throw new Error("Ocurrió un error inesperado");
      }
    }
  }

  public async generateAnualReport(year: number) {
    try {
      const res = await this.api.get<TaskAnualReportDto>(
        TRANSPARENCY_PATH + "/anual-report/generate",
        {
          params: {
            year,
          },
        }
      );
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err.response?.data;
        if (error) {
          throw new Error(error.message);
        }
        throw new Error(err.message);
      } else {
        throw new Error("Ocurrió un error inesperado");
      }
    }
  }

  public async getTaskEndAnualReport(task_id: string) {
    try {
      const res = await this.api.get<TaskEndAnualReportDto>(
        TRANSPARENCY_PATH + "/task/status/" + task_id
      );
      return res.data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const error = err.response?.data;
        if (error) {
          throw new Error(error.message);
        }
        throw new Error(err.message);
      } else {
        throw new Error("Ocurrió un error inesperado");
      }
    }
  }

  //    //public/audiencias
  async getReservas(ruc: string, year: number) {
    const res = await this.api.get<ReservasPnt2[]>(
      PUBLIC_PATH + "/public/numeral-16",
      {
        params: {
          ruc,
          year: year
        },
      }
    );
    return res.data;
  }
}
