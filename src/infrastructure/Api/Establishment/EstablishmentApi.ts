import { AxiosInstance } from "axios";
import { ADMIN_PATH, Pagination } from "..";
import { EstablishmentCreateDTO, EstablishmentListDto } from "./interface";


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


    async Create(data:EstablishmentCreateDTO)
    {   
        try{
            const form = new FormData();
            for(const key in data){
                form.append(key,data[key as keyof EstablishmentCreateDTO]);
            }
            const response = await this.api.post(ADMIN_PATH+'/establishment/create',form,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            return response.data;

        }catch(error:any){
            const e:string = error.response?.data?.message || 'Error al crear el establecimiento.';
            throw new Error(e);
        }

    }
}

export default EstablishmentApi;