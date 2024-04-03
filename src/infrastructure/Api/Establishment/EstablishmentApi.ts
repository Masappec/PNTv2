import { AxiosError, AxiosInstance } from "axios";
import { ADMIN_PATH, Pagination } from "..";
import { EstablishmentCreateDTO, EstablishmentDetailDTO, EstablishmentListDto } from "./interface";
import { URL_API } from "../../../utils/constans";
import { MessageTranslation } from "../../../utils/data";


class EstablishmentApi {
    private api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getEstablishments(search?: string, page?: number) {
        try {
            const response = await this.api.get<Pagination<EstablishmentListDto>>(ADMIN_PATH + '/establishment/list', {
                params: {
                    search,
                    page
                }
            });
            return response.data;
        } catch (error: any) {
            const e: string = error.response?.data?.message || 'Error al obtener los establecimientos.';
            throw new Error(e);
        }
    }


    async Create(data: EstablishmentCreateDTO) {
        try {
            const form = new FormData();
            for (const key in data) {
                form.append(key, data[key as keyof EstablishmentCreateDTO] as string | Blob);
            }
            const response = await this.api.post(ADMIN_PATH + '/establishment/create', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;

        } catch (error: any) {
            const e: string = error.response?.data?.message || 'Error al crear el establecimiento.';
            throw new Error(e);
        }

    }


    async update(data: EstablishmentCreateDTO, id: string) {
        try {
            const form = new FormData();
            for (const key in data) {
                form.append(key, data[key as keyof EstablishmentCreateDTO] as string | Blob);
            }
            const response = await this.api.put(ADMIN_PATH + '/establishment/update/' + id, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;

        } catch (error: any) {
            const e: string = error.response?.data?.message || 'Error al actualizar el establecimiento.';
            throw new Error(e);
        }

    }

    async detail(id: string): Promise<EstablishmentDetailDTO> {
        try {
            const response = await this.api.get<EstablishmentDetailDTO>(ADMIN_PATH + '/establishment/detail/' + id);
            return {
                ...response.data,
                logo: response.data.logo ? URL_API + ADMIN_PATH + response.data.logo : undefined
            };

        } catch (error: any) {
            const e: string = error.response?.data?.message || 'Error al obtener el establecimiento.';
            throw new Error(e);
        }
    }

    async delete(id: string) {
        try {
            const response = await this.api.delete<MessageTranslation<null>>(ADMIN_PATH + '/establishment/delete/' + id);
            return response.data;
        } catch (error: any) {
            const e: string = error.response?.data?.message || 'Error al eliminar el establecimiento.';
            throw new Error(e);
        }
    }

    async getByUserSession() {
        try {
            const res = await this.api.get<EstablishmentDetailDTO>(ADMIN_PATH + '/establishment/user/session')
            return res.data
        } catch (error) {
            if (error instanceof AxiosError) {

                const e: string = error.response?.data?.message || 'Error al eliminar el establecimiento.';
                throw new Error(e);
            } else {
                throw new Error("Ocurrio un error")
            }
        }
    }
}

export default EstablishmentApi;