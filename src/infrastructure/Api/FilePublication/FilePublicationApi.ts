import { AxiosError, AxiosInstance } from "axios";
import { FilePublicationRequest, FilePublicationResponse } from "./interface";
import { TRANSPARENCY_PATH } from "..";


/**
 * FilePublicationApi
 * @constructor
 * @param {AxiosInstance} api - AxiosInstance
 * @function createFilePublication - crea una publicacion
 * @function getFilesPublications - obtiene una publicacion
 * @function deleteFilePublication - elimina una publicacion
 * @returns {void}
 * @classdesc FilePublicationApi maneja las peticiones a la api de publicaciones
 * @example
 * const api = new FilePublicationApi(axios);
 * api.createFilePublication(data);
 * api.getFilesPublications()
 * api.deleteFilePublication(id)
 */


export class FilePublicationApi {
    private _api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this._api = api;
    }

    /**
     * 
     * @function createFilePublication crea una publicacion
     * @param {FilePublicationRequest} data - datos de la publicacion
     * @returns {FilePublicationResponse} publicacion creada
     */
    async createFilePublication(data: FilePublicationRequest) : Promise<FilePublicationResponse> {
        try {
            const form  = new FormData();
            form.append('name', data.name);
            form.append('description', data.description);
            form.append('url_download', data.url_download);
            const response = await this._api.post<FilePublicationResponse>(`${TRANSPARENCY_PATH}/publications/file/create`, data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

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
     * 
     * @function getFilesPublications obtiene una publicacion
     * @param {number} id - id de la publicacion
     * @returns {FilePublicationResponse} publicacion
     */
    async getFilesPublications() : Promise<FilePublicationResponse> {
        try {
            const response = await this._api.get<FilePublicationResponse>(`${TRANSPARENCY_PATH}/publication/file/list`);

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
     * 
     * @function deleteFilePublication elimina una publicacion
     * @param {number} id - id de la publicacion
     * @returns {void}
     */
    async deleteFilePublication(id: number) : Promise<void> {
        try {
            await this._api.delete(`${TRANSPARENCY_PATH}/publications/file/delete/${id}`);
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