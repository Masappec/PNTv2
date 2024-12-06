import MessageApi from "../Api/Message/Message";

class MessageService {
    constructor(private readonly api: MessageApi) {}

    // Obtener mensajes
    async fetchMessages() {
        return await this.api.getMessages();
    }

    // Enviar mensaje
    async sendMenssage(title: string, content: string) {
        return await this.api.createMessage(title, content);
    }
}

export default MessageService