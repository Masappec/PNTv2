import { AxiosError, AxiosInstance } from "axios";
import { Pagination, TRANSPARENCY_PATH } from "..";
import { PublicationResponse } from "./interface";




class TransparencyApi {

    private readonly _api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this._api = api;
    }


    async getTransparencyActive(id_establishment?: number, page: number = 1) {

        try {
            const response = await this._api.get<Pagination<PublicationResponse>>(`${TRANSPARENCY_PATH}/public/transparency/active/list`, {
                params: {
                    id_establishment: id_establishment,
                    page: page
                }
            })

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const _error = error.response?.data?.message;

                throw new Error(_error);
            } else {
                throw new Error('Error de conexión');
            }
        }
    }


    async getDetailTransparency(id: number) {

        try {
            const response = await this._api.get<PublicationResponse>(`${TRANSPARENCY_PATH}/public/transparency/active/${id}`)

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const _error = error.response?.data?.message;

                throw new Error(_error);
            } else {
                throw new Error('Error de conexión');
            }
        }
    }


}

export default TransparencyApi;