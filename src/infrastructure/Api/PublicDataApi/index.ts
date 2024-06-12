import api, { PUBLIC_PATH, TRANSPARENCY_PATH } from "..";
import { PersonalRemunerations, PublicDataApiResponse, RequestPersonalApi, RequestPresupuestoApi, RequestPublicApi, ResponsePresupuestos, ResponsePublicApi } from "./interface";
import { URL_API } from "../../../utils/constans";


class PublicDataApi {
    async getPublicData(body: RequestPublicApi,onUpdate: (data: ResponsePublicApi) => void) {
        try {


            const response = await fetch(URL_API + PUBLIC_PATH + '/public_api_stream/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            if (!response.body){
                throw new Error('Failed to fetch data');

            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let buffer = '';

            const readStream = async () => {
                const { value, done } = await reader.read();
                if (done) {
                    console.log('Stream completed');
                    return;
                }

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');

                for (let i = 0; i < lines.length - 1; i++) {
                    const line = lines[i];
                    if (line.startsWith('data: ')) {
                        const jsonString = line.slice(6);
                        try {
                            const parsedData = JSON.parse(jsonString);
                            onUpdate(parsedData)
                        } catch (err) {
                            console.error('Error parsing JSON:', err);
                        }
                    }
                }

                buffer = lines[lines.length - 1];
                readStream();
            };

            readStream();
        } catch (error) {
            // Capturar cualquier error que ocurra durante la solicitud
            console.error('Error durante la solicitud:', error);
        }
    }

    public async getPublicDataCount(establishment_id?: number|null,year?:number|null) {
        try {
            const response = await api.get<PublicDataApiResponse>(TRANSPARENCY_PATH + '/stats/citizen', {
                params: {
                    establishment_id,
                    year
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener los datos');
        }
    }


    public async getPersonalData(body: RequestPersonalApi) {
        try {
            const response = await api.post<PersonalRemunerations[]>(PUBLIC_PATH + '/public/personal-remuneraciones/', body);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener los datos');
        }
    }

    public async getPresupuestoData(body: RequestPresupuestoApi) {
        try {
            const response = await api.post<ResponsePresupuestos[]>(PUBLIC_PATH + '/public/presupuesto', body);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener los datos');
        }
    }
}





export default PublicDataApi;