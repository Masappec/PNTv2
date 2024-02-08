import { AxiosError, AxiosInstance } from "axios";
import { EstablishmentPublicListDto } from "./interface";
import { ADMIN_PATH, Pagination } from "..";
import { PedagogyAreaResponse } from "../PedagogyArea/interface";
import { URL_API } from "../../../utils/constans";


class PublicApi {

    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }


    async getEstablishments(search?: string, page?: number) {
        try {
            const response = await this.api.get<Pagination<EstablishmentPublicListDto>>(ADMIN_PATH + '/public/establishment/list', {
                params: {
                    search,
                    page
                }
            });
            return {
                current: response.data.current,
                limit: response.data.limit,
                next: response.data.next,
                previous: response.data.previous,
                results: response.data.results.map((establishment: EstablishmentPublicListDto) => {
                    return {
                        ...establishment,
                        logo:establishment.logo ? URL_API+ ADMIN_PATH+establishment.logo : undefined

                    }
                }),
                total: response.data.total,
                total_pages: response.data.total_pages
            } as Pagination<EstablishmentPublicListDto>;
        } catch (error) {
            if (error instanceof AxiosError) {
                const e: string = error.response?.data?.message || 'Error al obtener los establecimientos.';
                throw new Error(e);
            } else {
                throw new Error('Error de conexión');
            }
        }
    }

    async getEstablishment(slug: string){
        try{
            const response = await this.api.get<EstablishmentPublicListDto>(ADMIN_PATH+"/public/establishment/"+slug);
            return {
                ...response.data,
                logo:response.data.logo ? URL_API+ ADMIN_PATH+response.data.logo : undefined
            }
        }catch(error){
            if (error instanceof AxiosError) {
                const e: string = error.response?.data?.message || 'Error al obtener el establecimiento.';
                throw new Error(e);
            } else {
                throw new Error('Error de conexión');
            }
        }
    }

    async getPedagogyArea(){
        try{

            const response = await this.api.get<PedagogyAreaResponse>(ADMIN_PATH+"/public/pedagogy-area/");
            return response.data;
        }catch(error){
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