import { TaskEndAnualReportDto } from "../../../infrastructure/Api/AnualReport/interface";
import { AnualReportService } from "../../../infrastructure/Services/AnualReportService";
import { setAnualReports, setIsLoading, setTaskId,  } from "../../../infrastructure/Slice/AnualReportSlice";
import { store } from "../../../infrastructure/Store";
import { AnualReportEntity } from "../../entities/AnualReportEntity";

export class AnualReportUseCase {
  private worker: Worker | null = null;

  constructor(private readonly service: AnualReportService) {}

  async createAnualReport(data: AnualReportEntity) {
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
    const res = await this.service.getTAResume(establisment_id, isDefault, page, limit)
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
    this.worker = new Worker(new URL('./AnualReportWorker.ts', import.meta.url), { type: 'module' });

    this.worker.postMessage({ task_id });
    store.dispatch(setIsLoading(true));
    this.worker.onmessage = (event: MessageEvent<TaskEndAnualReportDto>) => {
      console.log(event.data);
      const  data  = event.data;
      if (data.data.task_status === "SUCCESS" || data.data.task_status === "FAILURE") {
        const url = data.data.results.url;
        // Import the store and dispatch the action
       
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
}