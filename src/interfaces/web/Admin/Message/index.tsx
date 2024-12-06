import MessageContainer from "../../../../components/Admin/Messages/create/MessageContainer.tsx";
import MessageApi from "../../../../infrastructure/Api/Message/Message.ts";
import MessageService from "../../../../infrastructure/Services/MessageService.ts";
import MessageUseCase from "../../../../domain/useCases/MessageUseCase/MessageUseCase.ts";
import api from "../../../../infrastructure/Api/index.ts";

function MessageCreate() {
    // Crear una instancia para api
    const messageApiInstance = new MessageApi(api)
    // Crear una instancia de MessageService
    const messageServiceInstance = new MessageService(messageApiInstance);
    // Pasar el servicio al constructor de MessageUseCase
    const messageUseCaseInstance = new MessageUseCase(messageServiceInstance);
    return (
        <>
            <MessageContainer usecase={messageUseCaseInstance} />
        </>
    );
}

export default MessageCreate;