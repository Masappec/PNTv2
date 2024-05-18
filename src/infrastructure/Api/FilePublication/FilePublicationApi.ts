import { AxiosError, AxiosInstance, AxiosProgressEvent } from "axios";
import { FilePublicationRequest, FilePublicationResponse } from "./interface";
import { Pagination, TRANSPARENCY_PATH } from "..";


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
    async createFilePublication(data: FilePublicationRequest, callbackUpload?: (event: AxiosProgressEvent) => void): Promise<FilePublicationResponse> {
        try {
            const form = new FormData();
            form.append('name', data.name);
            form.append('description', data.description);
            form.append('url_download', data.url_download);
            const response = await this._api.post<FilePublicationResponse>(`${TRANSPARENCY_PATH}/publications/file/create`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    callbackUpload && callbackUpload(progressEvent);
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
    async getFilesPublications(type: "TA" | "TC" | "TF", page?: number, limit?: number, search?: string): Promise<Pagination<
        FilePublicationResponse>> {
        try {
            const response = await this._api.get<Pagination<FilePublicationResponse>>(`${TRANSPARENCY_PATH}/publications/file/list`, {
                params: {
                    type: type,
                    page: page,
                    limit: limit,
                    search: search

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
     * @function deleteFilePublication elimina una publicacion
     * @param {number} id - id de la publicacion
     * @returns {void}
     */
    async deleteFilePublication(id: number): Promise<void> {
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

    //publications/file/from-uri/
    async getFromUri(uri: string) {
        try {
            const response = await this._api.get<Blob>(`${TRANSPARENCY_PATH}/publications/file/from-uri/?uri=${uri}`,
                {
                    responseType: 'blob'
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

}
