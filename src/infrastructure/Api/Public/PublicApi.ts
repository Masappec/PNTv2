import { AxiosError, AxiosInstance } from "axios";
import { EstablishmentPublicListDto, Month } from "./interface";
import { ADMIN_PATH, PaginationLetter, TRANSPARENCY_PATH } from "..";
import { PedagogyAreaResponse } from "../PedagogyArea/interface";
import { URL_API } from "../../../utils/constans";


class PublicApi {

    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }


    async getEstablishments(search?: string, page?: number) {
        try {
            const response = await this.api.get<PaginationLetter<EstablishmentPublicListDto>>(ADMIN_PATH + '/public/establishment/list', {
                params: {
                    search,
                    page
                }
            });
            return {
                results: response.data.results.map((establishment) => {
                    return {
                        data: establishment.data.map((data) => {
                            return {
                                ...data,
                                logo: data.logo ? URL_API + ADMIN_PATH + data.logo : undefined
                            }
                        }),
                        letter: establishment.letter

                    }
                }),
                total: response.data.total,
            } as PaginationLetter<EstablishmentPublicListDto>;
        } catch (error) {
            if (error instanceof AxiosError) {
                const e: string = error.response?.data?.message || 'Error al obtener los establecimientos.';
                throw new Error(e);
            } else {
                throw new Error('Error de conexión');
            }
        }
    }

    async getEstablishment(slug: string) {
        try {
            const response = await this.api.get<EstablishmentPublicListDto>(ADMIN_PATH + "/public/establishment/" + slug);
            return {
                ...response.data,
                logo: response.data.logo ? URL_API + ADMIN_PATH + response.data.logo : undefined
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const e: string = error.response?.data?.message || 'Error al obtener el establecimiento.';
                throw new Error(e);
            } else {
                throw new Error('Error de conexión');
            }
        }
    }


    async getMonthsByTransparency(type:'A'|'F'|'C',establishment_id:number, year:number) {
        try {
            const response = await this.api.get<Month[]>(TRANSPARENCY_PATH + "/transparency/months", {
                params: {
                    establishment_id,
                    year,
                    type
                }
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const e: string = error.response?.data?.message || 'Error al obtener los meses.';
                throw new Error(e);
            } else {
                throw new Error('Error de conexión');
            }
        }
    }

    async getPedagogyArea() {
        try {

            const response = await this.api.get<PedagogyAreaResponse>(ADMIN_PATH + "/public/pedagogy-area/");
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const e: string = error.response?.data?.message || 'Error al obtener las áreas de pedagogía.';
                throw new Error(e);
            } else {
                throw new Error('Error de conexión');
            }
        }
    }

}

export default PublicApi;