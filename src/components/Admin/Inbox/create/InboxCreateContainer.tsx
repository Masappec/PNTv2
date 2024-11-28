import InboxCreatePresenter from "./InboxCreatePresenter";
import MessageApi from "../../../../infrastructure/Api/Messages/Message";
import MessageService from "../../../../infrastructure/Services/MessageService";
import MessageUseCase from "../../../../domain/useCases/MessagesUseCase/MessagesUseCase";


const messageApi = new MessageApi();

// Instancia de MessageService pasando MessageApi
const messageService = new MessageService(messageApi);

// Instancia de MessageUseCase pasando MessageService
const messageUseCase = new MessageUseCase(messageService);

function InboxCreateContainer() {
    

    return (
        <InboxCreatePresenter usecase={messageUseCase}
        />
    )
}

export default InboxCreateContainer
