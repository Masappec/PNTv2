import FocalizedCreateContainer from "../../../../../components/Transparency/focalized/Create/FocalizedCreateContainer";
import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase";
import FilePublicationUseCase from "../../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase";
import TransparencyFocusUseCase from "../../../../../domain/useCases/TransparencyFocusUseCase/TransparencyFocusUseCase";
import api from "../../../../../infrastructure/Api";
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi";
import { FilePublicationApi } from "../../../../../infrastructure/Api/FilePublication/FilePublicationApi";
import TransparencyFocusApi from "../../../../../infrastructure/Api/TransparencyFocus/TransparencyFocusApi";
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService";
import FilePublicationService from "../../../../../infrastructure/Services/FilePublicationService";
import TransparencyFocusService from "../../../../../infrastructure/Services/TransparencyFocusService";

const FocalizedCreate = () => {


    const estab = new EstablishmentUseCase(
        new EstablishmentService(
            new EstablishmentApi(api)
        )
    )
    const file = new FilePublicationUseCase(
        new FilePublicationService(
            new FilePublicationApi(api)
        )
    )
    const tfocalized = new TransparencyFocusUseCase(
        new TransparencyFocusService(
            new TransparencyFocusApi(api)
        )
    )
    return (
        <FocalizedCreateContainer
            establishmentUseCase={estab}
            fileUseCase={file}
            tfocalizedUseCase={tfocalized}
        />
    )
}

export default FocalizedCreate;