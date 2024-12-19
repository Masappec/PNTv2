import { AxiosInstance } from "axios";

export class AnualReportApi{

    constructor(private readonly api: AxiosInstance) {}

    public async createAnualReport(data: any) {
        return this.api.post('/anual-report', data);
    }
}