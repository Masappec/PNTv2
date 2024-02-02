import { AxiosError, AxiosInstance } from "axios";
import { PublicationRequest } from "./interface";
import { TRANSPARENCY_PATH } from "..";
import { PublicationResponse } from "../Transparency/interface";
import { MessageTranslation } from "../../../utils/data";



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

    async getPublication(id:number){
            
            try{
                const response = await this.api.get<PublicationResponse>(TRANSPARENCY_PATH + `/publications/detail/${id}`);
                return response.data;
            }catch(error){
                if (error instanceof AxiosError){
                    const _error  = error.response?.data.message || error.message;
    
                    throw new Error(_error);
                }else{
                    throw new Error("Ocurrio un error al obtener la publicación");
    
                    
                }
            }
    }

    async updatePublication(id:number, data: PublicationRequest){
        try{
            const response = await this.api.put<MessageTranslation<PublicationResponse>>(TRANSPARENCY_PATH + `/publications/edit/${id}`, data);
            return response.data.json as PublicationResponse;
        }catch(error){
            if (error instanceof AxiosError){
                const _error  = error.response?.data.message || error.message;

                throw new Error(_error);
            }else{
                throw new Error("Ocurrio un error al actualizar la publicación");

                
            }
        }
    }

    async updateState(id:number){
        try{
            const response = await this.api.put<MessageTranslation<PublicationResponse>>(TRANSPARENCY_PATH + `/publications/state/${id}`);
            return response.data.json as PublicationResponse;
        }catch(error){
            if (error instanceof AxiosError){
                const _error  = error.response?.data.message || error.message;

                throw new Error(_error);
            }else{
                throw new Error("Ocurrio un error al actualizar la publicación");

                
            }
        }
    }
}

export default PublicationApi;