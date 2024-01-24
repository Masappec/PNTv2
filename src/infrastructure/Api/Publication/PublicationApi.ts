import { AxiosError, AxiosInstance } from "axios";
import { PublicationRequest } from "./interface";
import { TRANSPARENCY_PATH } from "..";



class PublicationApi {
    constructor(readonly api: AxiosInstance) {}

    
    async createPublication(data: PublicationRequest){


        try{
            const response = await this.api.post(TRANSPARENCY_PATH + '/publications/create', data);
            return response.data;
        }catch(error){
            if (error instanceof AxiosError){
                const _error  = error.response?.data.message || error.message;

                throw new Error(_error);
            }else{
                throw new Error("Ocurrio un error al crear la publicación");

                
            }
        }

        
    }
}

export default PublicationApi;