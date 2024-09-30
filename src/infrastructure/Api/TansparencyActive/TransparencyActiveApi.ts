import axios, { AxiosInstance } from "axios";
import { TransparencyActivePublicResponse, TransparencyActivePublish, TransparencyActivePublishResponse, TransparencyActiveTypeResponse } from "./interface";
import { TRANSPARENCY_PATH } from "..";
import { MessageTranslation } from "../../../utils/data";



class TransparencyActiveApi {

    constructor(private readonly api: AxiosInstance) {
        this.api = api;
    }

    async createPublication(data: TransparencyActivePublish) {

        try {

            const res = await this.api.post<MessageTranslation<TransparencyActivePublishResponse>>(TRANSPARENCY_PATH + '/transparency/active/publish', data);
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


    async updatePublication(data: TransparencyActivePublish) {

        try {

            const res = await this.api.put<MessageTranslation<TransparencyActivePublishResponse>>(TRANSPARENCY_PATH + '/transparency/active/update', data);
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

    async getPublicationsPublics(month: number, year: number, establishment_id: number) {
        try {
            const res = await this.api.get<TransparencyActivePublicResponse[]>(
                TRANSPARENCY_PATH + `/transparency/active/public`,
                {
                    params: {
                        month,
                        year,
                        establishment_id
                    }
                }
            );

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
    //transparency/active/all
    async getPublicationsAll(month: number, year: number, establishment_id: number) {
        try {
            const res = await this.api.get<TransparencyActivePublicResponse[]>(
                TRANSPARENCY_PATH + `/transparency/active/all`,
                {
                    params: {
                        month,
                        year,
                        establishment_id
                    }
                }
            );

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


    //transparency/approve"
    async approvePublication(data: TransparencyActiveTypeResponse) {
        try {
            const res = await this.api.post<MessageTranslation<TransparencyActivePublishResponse>>(
                TRANSPARENCY_PATH + `/transparency/active/approve/`, data
            );

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