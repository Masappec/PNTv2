import { AxiosError, AxiosInstance } from "axios";
import { Pagination, TRANSPARENCY_PATH } from "..";
import { PublicationResponse } from "./interface";
import { URL_API } from "../../../utils/constans";



/**
 * clase que contiene los metodos de la api de transparencia
 * @param {AxiosInstance} api instancia de axios
 * @returns {TransparencyApi} instancia de la clase
 * @constructor se inyecta la instancia de axios para ser usada en la clase
 * @function getTransparencyActive obtiene las publicaciones activas
 * @function getDetailTransparency obtiene el detalle de una publicacion
 * @name TransparencyApi
 */
class TransparencyApi {

    private readonly _api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this._api = api;
    }


    /**
     * 
     * @function getTransparencyActive obtiene las publicaciones activas
     * @param id_establishment id de la institucion
     * @param page pagina a consultar
     * @returns {Pagination<PublicationResponse>} lista de publicaciones
     */
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


    /**
     * @function getDetailTransparency obtiene el detalle de una publicacion
     * @param slug slug de la publicacion
     * @returns {PublicationResponse} detalle de la publicacion
     */
    async getDetailTransparency(slug: string)  : Promise<PublicationResponse>{

        try {
            const response = await this._api.get<PublicationResponse>(`${TRANSPARENCY_PATH}/public/transparency/active/detail/${slug}`)

            return {
                ...response.data,
                file_publication: response.data.file_publication.map((file) => {
                    return {
                        ...file,
                        url_download: `${URL_API+ TRANSPARENCY_PATH}${file.url_download}`
                    }
                })
                    
            }
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