import { AxiosError, AxiosInstance } from "axios";
import { TRANSPARENCY_PATH } from "..";
import { AnualReportCreateDto, AnualReportResponseDto } from "./interface";

export class AnualReportApi {

    constructor(private readonly api: AxiosInstance) {}

    public async createAnualReport(data: AnualReportCreateDto) {
        try{
            const res = await this.api.post<AnualReportResponseDto>(TRANSPARENCY_PATH+'/anual-report', data);
            return res.data;
        }catch(err){
            if(err instanceof AxiosError){
                let error = err.response?.data;
                if(error){
                    throw new Error(error.message);
                }
                throw new Error(err.message);
            }else{
                throw new Error("Ocurrió un error inesperado");
            }
        }
    }
}