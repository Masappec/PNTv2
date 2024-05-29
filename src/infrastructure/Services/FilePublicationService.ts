import axios, { AxiosError, AxiosProgressEvent } from "axios";
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
            const row = rowArray.map((item) => item.value).join(";");
            csvContent += row + "\r\n";
        })

        const utf8Bytes = new TextEncoder().encode(csvContent);
        return new Blob([utf8Bytes], { type: 'application/csv;charset=UTF-8' });

    }

    generateBlobVertical(data: Row[][]) {
        let csvContent = "";
        /**
         * [ [ {value: "1", "is_header":true}, {value: "2","is_header":true},
         *  {value: "3","is_header":true}], [{value: "4"}, {value: "5"}, {value: "6"}]
         * 
         */
        const transposedData = data[0].map((_, colIndex) => data.map(row => row[colIndex]));

        transposedData.forEach((column) => {
            column.forEach((cell, rowIndex) => {
                // Si es la primera fila, agregar el valor al CSV directamente; si no, agregarlo con un salto de línea
                csvContent += (rowIndex === 0) ? cell.value : ";" + cell.value;
            });
            csvContent += "\r\n"; // Agregar un salto de línea después de cada columna
        });

        const utf8Bytes = new TextEncoder().encode(csvContent);
        return new Blob([utf8Bytes], { type: 'application/csv;charset=UTF-8' });

    }

    generateContentCsv = (data: Row[][]) => {
        let csvContent = "";

        data.forEach(function (rowArray) {
            const row = rowArray.map((item) => item.value).join(";");
            csvContent += row + "\r\n";
        })

        return csvContent
    }


    generateContentCsvVertical = (data: Row[][]) => {
        let csvContent = "";
        const transposedData = data[0].map((_, colIndex) => data.map(row => row[colIndex]));
        if(transposedData === undefined){

            return csvContent;
        }
            
        if (transposedData.length === 0) {
            return csvContent;
        }
        console.log(transposedData)
        transposedData.forEach((column) => { 
            column.forEach((cell, rowIndex) => {
                console.log(cell)
                // Si es la primera fila, agregar el valor al CSV directamente; si no, agregarlo con un salto de línea
                csvContent += (rowIndex === 0) ? (cell.value ? cell.value+";" : ";") : cell.value +";"
            });
            csvContent += "\r\n"; // Agregar un salto de línea después de cada columna
        });
        return csvContent;
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

    async createFilePublication(data: FilePublicationEntity,

        callbackUpload?: (event: AxiosProgressEvent) => void
    ) {


        const response = await this.api.createFilePublication(FilePublicationMapper.fromDomainToApi(data, data.url_download as File),
            callbackUpload);

        return FilePublicationMapper.fromApiToDomain(response);

    }


    async getFilesPublications(type: "TA" | "TC" | "TF", numeral_id: number, page?: number, limit?: number, search?: string) {
        const response = await this.api.getFilesPublications(type, numeral_id, page, limit, search);

        return {
            ...response,
            results: response.results?.map((file) => FilePublicationMapper.fromApiToDomain(file)) || [],

        }
    }
    async getFromUri(uri: string) {
        const response = await this.api.getFromUri(uri);

        return response;
    }
}

export default FilePublicationService;