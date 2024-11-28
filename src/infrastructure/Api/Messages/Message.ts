import { MessageDTO } from "./interface";
import { TRANSPARENCY_PATH } from "..";

class MessageApi {
    // Obtener mensajes
    getMessages = async (): Promise<MessageDTO[]> => {
        try {
            const response = await fetch(`${TRANSPARENCY_PATH}/messages`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error al obtener mensajes: ${response.statusText}`);
            }

            const data: MessageDTO[] = await response.json();
            return data;
        } catch (error) {
            console.error("Error en getMessages:", error);
            throw error;
        }
    };

    // Crear mensaje
    createMessage = async (data: Partial<MessageDTO>): Promise<MessageDTO> => {
        try {
            const response = await fetch(`${TRANSPARENCY_PATH}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Error al crear mensaje: ${response.statusText}`);
            }

            const createdMessage: MessageDTO = await response.json();
            return createdMessage;
        } catch (error) {
            console.error("Error en createMessage:", error);
            throw error;
        }
    };
}

export default MessageApi;
