import axios, { AxiosInstance } from "axios";
import { TransparencyActivePublish, TransparencyActivePublishResponse } from "./interface";
import { TRANSPARENCY_PATH } from "..";



class TransparencyActiveApi {

    constructor(private readonly api: AxiosInstance) {
        this.api = api;
    }

    async createPublication(data: TransparencyActivePublish) {

        try {

            const res = await this.api.post<TransparencyActivePublishResponse>(TRANSPARENCY_PATH + '/transparency/active/publish', data);
            return res.data;

        } catch (e) {
            if (axios.isAxiosError(e)) {
                const message = e.response?.data.message || e.message || 'Error desconocido';
                throw new Error(message);
            } else {
                throw new Error('Error desconocido');
            }
        }
    }
}

export default TransparencyActiveApi;