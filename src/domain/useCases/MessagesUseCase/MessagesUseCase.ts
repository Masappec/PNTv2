import MessageService from '../../../infrastructure/Services/MessageService';

class MessageUseCase {
    constructor(
        private readonly service: MessageService,
    ) { }

  async getUnreadMessages() {
    return await this.service.fetchMessages();
  }

  async createNewMessage(data: any) {
    return await this.service.sendMessage(data);
  }
}

export default MessageUseCase