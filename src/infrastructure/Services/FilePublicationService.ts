import axios, { AxiosError } from "axios";
import { Row } from "../../utils/interface";
import { FilePublicationApi } from "../Api/FilePublication/FilePublicationApi";
import { FilePublicationEntity } from "../../domain/entities/PublicationEntity";
import FilePublicationMapper from "../../domain/mappers/FilePublicationMapper";




/**
 * @class FilePublicationService
 * @name FilePublicationService
 * @constructor
 * @param {FilePublicationApi} api - FilePublicationApi
 * @function generateBlob - genera un blob a partir de un arreglo de arreglos de Row
 * @function downloadFileFromUrl - descarga un archivo a partir de una url
 * 
 * @example
 * const api = new FilePublicationApi(axios);
 * const service = new FilePublicationService(api);
 * service.generateBlob(data);
 * service.downloadFileFromUrl(url);
 */
class FilePublicationService {
    /**
     * @constructor
     * @param api - FilePublicationApi
     * @returns {FilePublicationService} - FilePublicationService
     * @example
     * const api = new FilePublicationApi(axios);
     */
    constructor(private readonly api: FilePublicationApi) { }


    /**
     * @function generateBlob
     * @param data - arreglo de arreglos de Row
     * @returns  {Blob} - blob
     */
    generateBlob(data: Row[][]) {
        let csvContent = "";

        data.forEach(function (rowArray) {
            const row = rowArray.map((item) => item.value).join(",");
            csvContent += row + "\r\n";
        })

        return new Blob([csvContent], { type: 'text/csv' });

    }


    /**
     * 
     * 
     * 
     * @function downloadFileFromUrl - descarga un archivo a partir de una url
     * @param url - url del archivo
     * @returns {Blob} - blob
     */

    async downloadFileFromUrl(url: string): Promise<Blob | string> {

        try {
            const res = await axios.get(url, {
                responseType: 'blob',
                headers: {
                    //cors
                    'Access-Control-Allow-Origin': '*',
                }

            });

            if (res.data! instanceof Blob) {

                return url;

            }

            const blob = new Blob([res.data], { type: res.headers['content-type'] });
            return blob;


        } catch (e) {
            console.log(e);
            if (e instanceof AxiosError) {
                const _error = "Error al descargar el archivo: " + (e.response?.data?.message || e.message);

                throw new Error(_error);
            } else {
                if (e instanceof Error) {
                    throw new Error("Error al descargar el archivo: " + e.message);
                }
                throw new Error("No es posible descargar el archivo ");
            }
        }
    }

    /**
     * @function createFilePublication - crea una publicacion
     * @param {FilePublicationEntity} data - datos de la publicacion
     * @returns {FilePublicationEntity} - publicacion
     */

    async createFilePublication(data: FilePublicationEntity) {


        const response = await this.api.createFilePublication(FilePublicationMapper.fromDomainToApi(data, data.url_download as File));

        return FilePublicationMapper.fromApiToDomain(response);

    }
}

export default FilePublicationService;