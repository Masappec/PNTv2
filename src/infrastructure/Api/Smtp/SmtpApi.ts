import { AxiosError, AxiosInstance } from "axios";
import { ADMIN_PATH } from "..";
import { SmtpRequestDto, SmtpResponseDto } from "./interface";



class SmtpApi {

    private api:AxiosInstance;
    constructor(api:AxiosInstance){
        this.api = api;
    }

    async getSmtp(){
        try {
            const response = await this.api.get<SmtpResponseDto[]>(ADMIN_PATH + '/smtp/');
            return response.data;
        } catch (error:unknown) {
            let error_:string = '';
            if (error instanceof AxiosError) {
                error_ = error.response?.data?.message || 'Error al obtener datos';
            }
            

            throw new Error(error_ || 'Error al obtener datos');
        }
    }

    async update(data:SmtpRequestDto[]){
        try {
            const response = await this.api.put<SmtpResponseDto[]>(ADMIN_PATH + '/smtp/update', data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message || 'Error al actualizar los campos del formulario');
            }
            throw new Error('Error al actualizar los campos del formulario');
        }
    }
        
}

export default SmtpApi;