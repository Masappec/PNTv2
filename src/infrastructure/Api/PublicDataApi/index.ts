import { AxiosResponse } from "axios";
import api, { PUBLIC_PATH } from "..";
import { RequestPublicApi, ResponsePublicApi } from "./interface";


class PublicDataApi {
    async getPublicData(body: RequestPublicApi) {
        try {


            const response: AxiosResponse<ReadableStream<Uint8Array>> = await api.post(PUBLIC_PATH + '/public_api_stream/', body);
            console.log(response)
            if (!response.data){
                return;
            }
            // Procesar los datos de la respuesta como un stream
            const reader = response.data.getReader();
            const chunks: Uint8Array[] = [];

            // Función para procesar cada fragmento de datos recibido
            const processChunk = ({ value }: ReadableStreamReadResult<Uint8Array | undefined>) => {
                if (value === undefined) {
                    return;
                }
                // Si se han recibido todos los datos, combinar los fragmentos en un solo Uint8Array
                const combinedChunks = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
                let offset = 0;
                for (const chunk of chunks) {
                    combinedChunks.set(chunk, offset);
                    offset += chunk.length;
                }

                // Convertir el Uint8Array a una cadena de texto
                const data = new TextDecoder().decode(combinedChunks);

                // Parsear los datos recibidos como JSON
                const jsonData: ResponsePublicApi[] = JSON.parse(data);

                // Hacer algo con los datos recibidos
                console.log(jsonData);


                // Agregar el fragmento de datos a la lista de fragmentos
                chunks.push(value);

                // Leer el siguiente fragmento de datos
                reader.read().then(processChunk);
            };

            // Iniciar el procesamiento de la respuesta como un stream
            reader.read().then(processChunk);
        } catch (error) {
            // Capturar cualquier error que ocurra durante la solicitud
            console.error('Error durante la solicitud:', error);
        }
    }
}

export default PublicDataApi;