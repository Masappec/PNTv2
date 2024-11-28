import MessageApi from '../Api/Messages/Message.ts';

class MessageService {
    constructor(private readonly api: MessageApi) { }
    async fetchMessages() {
      return await this.api.getMessages();
    }
  
    async sendMessage(data: any) {
      return await this.api.createMessage(data);
    }
 }

export default MessageService