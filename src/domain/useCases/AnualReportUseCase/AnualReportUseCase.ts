import { TaskEndAnualReportDto } from "../../../infrastructure/Api/AnualReport/interface";
import { AnualReportService } from "../../../infrastructure/Services/AnualReportService";
import { setAnualReports, setIsLoading, setMessage, setProgress, setTaskId,  } from "../../../infrastructure/Slice/AnualReportSlice";
import { store } from "../../../infrastructure/Store";
import { DatePnt } from "../../../utils/date";
import { AnualReportEntity } from "../../entities/AnualReportEntity";

export class AnualReportUseCase {
  private worker: Worker | null = null;

  constructor(private readonly service: AnualReportService) {}

  async createAnualReport(data: AnualReportEntity) {
    data.year = new DatePnt().getYearToUpload();

    if (data.have_public_records) {
      if (data.norme_archive_utility.trim().length === 0) {
        throw new Error(
          "Norma archivística utilizada: no puede estar vacía"
        );
      }
      if (data.comment_aclaration.trim().length === 0) {
        throw new Error("Comentario aclaratorio no puede estar vacío");
      }
    }

    if (data.have_quality_problems) {
      if (data.total_quality_problems === 0) {
        throw new Error("Cantidad de gestiones oficiosas no puede ser 0");
      }

      if (data.description_quality_problems.trim().length === 0) {
        throw new Error(
          "Descripción específica de la corrección de información no puede estar vacía"
        );
      }
    }

    if (data.have_sanctions) {
      if (data.total_organic_law_public_service === 0) {
        throw new Error(
          "Cantidad de sanciones por la ley orgánica del servicio público no puede ser 0"
        );
      }

      if (data.description_organic_law_public_service.trim().length === 0) {
        throw new Error(
          "Descripción específica de sanciones por la ley orgánica del servicio público no puede estar vacía"
        );
      }

      if (data.total_organic_law_contraloria === 0) {
        throw new Error(
          "Cantidad de sanciones por la ley orgánica de la contraloría no puede ser 0"
        );
      }

      if (data.description_organic_law_contraloria.trim().length === 0) {
        throw new Error(
          "Descripción específica de sanciones por la ley orgánica de la contraloría no puede estar vacía"
        );
      }

      if (data.total_organic_law_national_system === 0) {
        throw new Error(
          "Cantidad de sanciones por la ley orgánica del sistema nacional de control no puede ser 0"
        );
      }

      if (data.description_organic_law_national_system.trim().length === 0) {
        throw new Error(
          "Descripción específica de sanciones por la ley orgánica del sistema nacional de control no puede estar vacía"
        );
      }

      if (data.total_organic_law_citizen_participation === 0) {
        throw new Error(
          "Cantidad de sanciones por la ley orgánica de participación ciudadana no puede ser 0"
        );
      }

      if (
        data.description_organic_law_citizen_participation.trim().length === 0
      ) {
        throw new Error(
          "Descripción específica de sanciones por la ley orgánica de participación ciudadana no puede estar vacía"
        );
      }
    }
    if (data.have_activities) {
      if (data.total_activities === 0) {
        throw new Error("Cantidad de actividades no puede ser 0");
      }

      if (data.description_activities.trim().length === 0) {
        throw new Error("Descripción de actividades no puede estar vacía");
      }
    }

    if (data.did_you_entity_receive) {
      if (data.total_saip_in_portal === 0) {
        throw new Error(
          "Cantidad de solicitudes de información pública recibidas en el portal no puede ser 0"
        );
      }

      if (data.total_saip_no_portal === 0) {
        throw new Error(
          "Cantidad de solicitudes de información pública recibidas fuera del portal no puede ser 0"
        );
      }

      if (data.description_rason_no_portal.trim().length === 0) {
        throw new Error(
          "Descripción de razón de solicitudes no recibidas en el portal no puede estar vacía"
        );
      }

      if (data.have_responded_solicities_no_portal) {
        if (data.total_no_registered === 0) {
          throw new Error(
            "Cantidad de solicitudes no registradas no puede ser 0"
          );
        }

        if (data.comment_aclaration_no_registered.trim().length === 0) {
          throw new Error(
            "Comentario aclaratorio de solicitudes no registradas no puede estar vacío"
          );
        }
      }
    }

    if (data.reserve_information) {
      if (data.number_of_reserves === 0) {
        throw new Error("Cantidad de información reservada no puede ser 0");
      }

      if (data.number_of_confidential === 0) {
        throw new Error("Cantidad de información confidencial no puede ser 0");
      }

      if (data.number_of_secret === 0) {
        throw new Error("Cantidad de información secreta no puede ser 0");
      }

      if (data.number_of_secretism === 0) {
        throw new Error("Cantidad de información ultra secreta no puede ser 0");
      }
    }

    const response = await this.service.createAnualReport(data);
    return response;
  }

  public async getSolicityStats(establisment_id: number) {
    return await this.service.getSolicityStats(establisment_id);
  }

  public async getTAResume(
    establisment_id: number,
    isDefault: boolean,
    page: number,
    limit?: number
  ) {
    const res = await this.service.getTAResume(
      establisment_id,
      isDefault,
      page,
      limit
    );
    return res;
  }

  public async getTFResume(
    establisment_id: number,
    page: number,
    limit?: number
  ) {
    return await this.service.getTFResume(establisment_id, page, limit);
  }

  public async getTCResume(
    establishment_id: number,
    page: number,
    limit?: number
  ) {
    return await this.service.getTCResume(establishment_id, page, limit);
  }

  public async generateAnualReport(year: number) {
    const res = await this.service.generateAnualReport(year);
    store.dispatch(setTaskId(res.task_id));
    return res;
  }

  public startWorker(task_id: string) {
    if (this.worker) {
      this.worker.terminate();
    }
    this.worker = new Worker(
      new URL("./AnualReportWorker.ts", import.meta.url),
      { type: "module" }
    );

    this.worker.postMessage({ task_id });
    store.dispatch(setIsLoading(true));
    this.worker.onmessage = (event: MessageEvent<TaskEndAnualReportDto>) => {
      const data = event.data;
      if (data.data.task_status === "PROGRESS") {
        store.dispatch(setIsLoading(true));
        store.dispatch(setProgress(data.data.meta?.progress || 0));
        store.dispatch(setMessage(data.data.meta?.message || ""));
      }
      if (
        data.data.task_status === "SUCCESS" ||
        data.data.task_status === "FAILURE"
      ) {
        const url = data.data.results.url;
        // Import the store and dispatch the action
        store.dispatch(setTaskId(""));
        store.dispatch(setAnualReports(url));
        store.dispatch(setIsLoading(false));
        this.stopWorker();
      }
    };
  }

  public stopWorker() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  public async getTaskEndAnualReport(task_id: string) {
    return await this.service.getTaskEndAnualReport(task_id);
  }
  //getPublicAudiencias
  public async getReservas(ruc: string,year: number) {
    return await this.service.getReservas(ruc,year);
  }
}