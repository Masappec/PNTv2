import { AxiosInstance } from "axios";
import { Pagination, TRANSPARENCY_PATH } from "..";
import { TransparencyFocusListDto } from "./interface";



class TransparencyFocusApi {


    constructor(public readonly api : AxiosInstance){
        this.api = api;
        
    }

 async TransparencyList(search?: string, page? :number){
    try{
        const response = await this.api.get<Pagination<TransparencyFocusListDto>>(TRANSPARENCY_PATH +  "/transparency/focus/list ",
  {  params: {
        search,
        page
    
    }
    });

    return response.data;
   
} catch (error:any){
    const e: string=error.response?.data?.message || "Error al obtener listado.";
    throw new Error(e);
}

}

}
export default TransparencyFocusApi