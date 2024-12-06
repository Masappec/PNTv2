import { AxiosInstance } from "axios";
import { IReportRow } from "./interface";
import { Pagination, TRANSPARENCY_PATH } from "..";
import {  URL_API } from "../../../utils/constans";



class ReportsApi {
    private api:AxiosInstance;
  constructor(_api:AxiosInstance){
    this.api = _api;
  }

    //reports/view/archivos-subidos
    async getReport(year:number, establishmentId:number,page?:number):Promise<Pagination<IReportRow>>{
        try{
            const response = await this.api.get<Pagination<IReportRow>>(TRANSPARENCY_PATH+`/reports/view/archivos-subidos`,{
                params:{
                    year,
                    establishment_id:establishmentId,
                    page
                }
            });
            return {
                ...response.data,
                results:response.data.results.map((r:IReportRow)=>({
                    ...r,
                    enlace: r.enlace ? URL_API +TRANSPARENCY_PATH+r.enlace : ""
                }))
            
            }
        }catch(error:any){
            const e = error?.response?.data?.message || "Error al obtener el reporte";
            throw new Error(e);
        }
    }


    //reports/download/reporte-respuestas
    async generateReportSolicitiesResponse(year:number){
        try{
            const response = await this.api.post(TRANSPARENCY_PATH+`/reports/download/reporte-respuestas`,{
                year
            },{
                responseType: 'blob'
            });
            return response.data;
        } catch(error:any){
            const e = error?.response?.data?.message || "Error al obtener el reporte";
            throw new Error(e);
        }
    }

    //reports/download/archivos-subidos
    async generateReportFiles(year:number, establishmentId:number){
        try{
            const response = await this.api.post(TRANSPARENCY_PATH+`/reports/download/archivos-subidos`,{
                year,
                establishment_id:establishmentId
            },{
                responseType: 'blob'
            });
            return response.data;
        } catch(error:any){
            const e = error?.response?.data?.message || "Error al obtener el reporte";
            throw new Error(e);
        }
    }


    //reports/download/reporte-no-respuestas
    async generateReportNoSolicities(year:number){
        try{
            const response = await this.api.post(TRANSPARENCY_PATH+`/reports/download/reporte-no-respuestas`,{
                year
            },{
                responseType: 'blob'
            });
            return response.data;
        } catch(error:any){
            const e = error?.response?.data?.message || "Error al obtener el reporte";
            throw new Error(e);
        }
    }


    //reports/download/reporte-solicitudes
    async generateReportSolicities(year:number){
        try{
            const response = await this.api.post(TRANSPARENCY_PATH+`/reports/download/reporte-solicitudes`,{
                year
            },{
                responseType: 'blob'
            });
            return response.data;
        } catch(error:any){
            const e = error?.response?.data?.message || "Error al obtener el reporte";
            throw new Error(e);
        }
    }

    // Nuevo método para generar el reporte de todas las solicitudes
    async generateReportAllSolicities(year: number) {
        try {
            const response = await this.api.post(TRANSPARENCY_PATH + `/reports/download/reporte-todas-solicitudes`,
                {
                    year
                },
                {
                    responseType: 'blob' // Asegúrate de manejar la respuesta como un blob para descargar el archivo
                }
            );
            return response.data;
        } catch (error: any) {
            const e = error?.response?.data?.message || "Error al obtener el reporte";
            throw new Error(e);
        }
    }

    
}

export default ReportsApi;