import { AxiosError, AxiosInstance } from "axios";
import { TRANSPARENCY_PATH } from "..";
import { TagRequest, TagResponse } from "./interface";





class TagApi {

    constructor(private readonly _api: AxiosInstance) { 
        
    }



    async getTagByName(name: string) {


        try{
            const res = await this._api.get<TagResponse[]>(`${TRANSPARENCY_PATH}/tags/list`,{
                params: {
                    search: name
                }
            })
            
            return res.data;
        }catch(e){
            
            if (e instanceof AxiosError) {
                const error = e.response?.data?.message || e.message
                throw new Error(error)
            }else{
                throw new Error("Error al obtener las etiquetas")
            }
        }
        
    }


    async createNewTag(data: TagRequest){
        try{
            const res = await this._api.post<TagResponse>(`${TRANSPARENCY_PATH}/tags/create`,data)
            
            return res.data;
        }catch(e){
            
            if (e instanceof AxiosError) {
                const error = e.response?.data?.message || e.message
                throw new Error(error)
            }else{
                throw new Error("Error al crear la etiqueta")
            }
        }
    }
}

export default TagApi;