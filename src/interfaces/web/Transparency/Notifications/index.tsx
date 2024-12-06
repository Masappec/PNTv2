import MessageUseCase from "../../../../domain/useCases/MessageUseCase/MessageUseCase"
import MessageApi from "../../../../infrastructure/Api/Message/Message"
import MessageService from "../../../../infrastructure/Services/MessageService"
import api from "../../../../infrastructure/Api"
import MessageList from "../../../../components/Admin/Notifications/MessageList"

const VerNotificaciones = () => {
    const messageApiInstance = new MessageApi(api)
    const messageServiceInstance = new MessageService(messageApiInstance)
    const messageUseCaseInstance = new MessageUseCase(messageServiceInstance)
    return (
        <>
            <MessageList usecase={messageUseCaseInstance} />
        </>
    )
}

export default VerNotificaciones