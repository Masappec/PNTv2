import { AxiosInstance } from "axios";
import { ADMIN_PATH, Pagination } from "..";
import { EstablishmentListDto } from "./interface";


class EstablishmentApi{
    private api:AxiosInstance;
    constructor(api:AxiosInstance){
        this.api = api;
    }

    async getEstablishments(){
        try{
            const response = await this.api.get<Pagination<EstablishmentListDto>>(ADMIN_PATH+'/establishment/list');
            return response.data;
        }catch(error:any){
            const e:string = error.response?.data?.message || 'Error al obtener los establecimientos.';
            throw new Error(e);
        }
    }
}

export default EstablishmentApi;