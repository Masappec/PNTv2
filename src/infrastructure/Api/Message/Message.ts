import { AxiosError, AxiosInstance } from "axios";
import { TRANSPARENCY_PATH } from "..";

class MessageApi {
    constructor(private api: AxiosInstance) {}

    // Obtenemos mensajes
    getMessages = async () => {
        try {
            const response = await this.api.get(TRANSPARENCY_PATH + '/messages/');
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = error?.response?.data?.message || "Ocurrio un error al obtener los mensajes"
                throw new Error(message)
            } else {
                throw new Error("Ocurrio un error al obtener los mensajes")
            }
        }
    };

    // Crear los mensajes
    createMessage = async (title: string, content: string) => {
        try {
            const response = await this.api.post(TRANSPARENCY_PATH + '/messages/', {title, content});
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = error?.response?.data?.message || "Ocurrio un error al crear el mensaje"
                throw new Error(message)
            } else {
                throw new Error("Ocurrio un error al crear el mensaje")
            }
        }
    };

}

export default MessageApi