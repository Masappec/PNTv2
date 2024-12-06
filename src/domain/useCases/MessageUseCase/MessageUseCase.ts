import MessageService from "../../../infrastructure/Services/MessageService";

class MessageUseCase {
    constructor(private service: MessageService) {}

    async getAllMessages() {
        return await this.service.fetchMessages();
    }

    async createNewMessage(title: string, content: string) {
        return await this.service.sendMenssage(title, content)
    }
}

export default MessageUseCase