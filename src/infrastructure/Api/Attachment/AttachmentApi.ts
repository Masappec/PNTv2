import { AxiosError, AxiosInstance } from "axios";
import { AttachmentRequest, AttachmentResponse } from "./interface";
import { TRANSPARENCY_PATH } from "..";



class AttachmentApi {
    constructor(private readonly api: AxiosInstance) {}


    async createAttachment(data: AttachmentRequest){
        
        try{
            const res = await this.api.post<AttachmentResponse>(TRANSPARENCY_PATH+'/attachments/create', data);

            return res.data;
        }catch(error){
            if (error instanceof AxiosError){
                const _error = error.response?.data.message;

                throw new Error(_error);
            }else{
                throw new Error("Error al crear el link adjunto")
            }
        }
    }
}

export default AttachmentApi;