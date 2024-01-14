import { AxiosInstance } from "axios";
import { ADMIN_PATH } from "..";
import { PedagogyAreaRequest, PedagogyAreaResponse } from "./interface";


class PedagogyAreaApi {
    private api:AxiosInstance;
    constructor(api:AxiosInstance){
        this.api = api;
    }

    async getPedagogyArea(){
        try{

            const response = await this.api.get<PedagogyAreaResponse>(ADMIN_PATH+"/pedagogy-area/view");
            return response.data;
        }catch(error:any){
            const message = error?.response?.data?.message || "Ocurrió un error al obtener las áreas de pedagogía"
            throw new Error(message);
        }
    }
    
    async createPedagogyArea(data:PedagogyAreaRequest){
        try{
            const response = await this.api.post<PedagogyAreaResponse>(ADMIN_PATH+"/pedagogy-area/create",data);
            return response.data;
        }catch(error:any){
            const message = error?.response?.data?.message || "Ocurrió un error al crear las áreas de pedagogía"
            throw new Error(message);
        }
    }
}

export default PedagogyAreaApi;