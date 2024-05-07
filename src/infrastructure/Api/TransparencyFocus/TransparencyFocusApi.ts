import { AxiosInstance } from "axios";
import { Pagination, TRANSPARENCY_PATH } from "..";
import { TransparencyFocusCreateDto, TransparencyFocusListDto } from "./interface";
import { MessageTranslation } from "../../../utils/data";



class TransparencyFocusApi {


    constructor(public readonly api: AxiosInstance) {
        this.api = api;

    }

    async TransparencyList(search?: string, page?: number) {
        try {
            const response = await this.api.get<Pagination<TransparencyFocusListDto>>(TRANSPARENCY_PATH + "/transparency/focus/list ",
                {
                    params: {
                        search,
                        page

                    }
                });

            return response.data;

        } catch (error: any) {
            const e: string = error.response?.data?.message || "Error al obtener listado.";
            throw new Error(e);
        }

    }


    async createTransparencyFocus(data: TransparencyFocusCreateDto) {

        try {
            const res = await this.api.post<MessageTranslation<TransparencyFocusListDto>>(TRANSPARENCY_PATH + "/transparency/focus/create", data);

            return res.data;
        } catch (error: any) {
            const e: string = error.response?.data?.message || "Error al crear publicación.";

            throw new Error(e);
        }

    }

    async updateTransparencyFocus(data: TransparencyFocusCreateDto, id: number) {
        try {
            const res = await this.api.put<MessageTranslation<TransparencyFocusListDto>>(TRANSPARENCY_PATH + `/transparency/focus/update/${id}`, data);
            return res.data;

        } catch (error: any) {
            const e: string = error.response?.data?.message || "Error al actualizar publicación.";
            throw new Error(e);
        }
    }


    async getTransparencyFocusPublic(month: number, year: number, establishment_id: number) {
        try {
            const res = await this.api.get<TransparencyFocusListDto[]>
                (TRANSPARENCY_PATH + `/transparency/focus/public`, {
                    params: {
                        month,
                        year,
                        establishment_id
                    }
                }
                );

            return res.data;
        } catch (error: any) {
            const e: string = error.response?.data?.message || "Error al obtener publicaciones.";
            throw new Error(e);
        }
    }

    //transparency/focus/delete/
    async deleteTransparencyFocus(id: number) {
        try {
            const res = await this.api.delete(TRANSPARENCY_PATH + '/transparency/focus/delete/' + id)
            return res.data;
        } catch (error: any) {
            const e: string = error.response?.data?.message || "Error al eliminar publicación.";
            throw new Error(e);
        }
    }

}
export default TransparencyFocusApi