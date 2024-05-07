import { useOutletContext } from "react-router-dom"
import PublicEstablishmentDetailContainer from "../../../../../components/Landing/Establishment/Detail/PublicEstablishmentDetailContainer"
import PublicUseCase from "../../../../../domain/useCases/Public/PublicUseCase"
import TransparencyUseCase from "../../../../../domain/useCases/Transparency/TransparencyUseCase"
import TransparencyActiveUseCase from "../../../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase"
import TransparencyActiveService from "../../../../../infrastructure/Services/TransparencyActiveService"
import TransparencyActiveApi from "../../../../../infrastructure/Api/TansparencyActive/TransparencyActiveApi"
import api from "../../../../../infrastructure/Api"
import TransparencyFocusUseCase from "../../../../../domain/useCases/TransparencyFocusUseCase/TransparencyFocusUseCase"
import TransparencyFocusService from "../../../../../infrastructure/Services/TransparencyFocusService"
import TransparencyFocusApi from "../../../../../infrastructure/Api/TransparencyFocus/TransparencyFocusApi"
import TransparencyCollabUseCase from "../../../../../domain/useCases/TransparencyCollabUseCase/TransparencyCollabUseCase"
import TransparencyCollabService from "../../../../../infrastructure/Services/TransparencyCollabService"
import TransparencyCollabApi from "../../../../../infrastructure/Api/TransparencyCollab/TransparencyCollab"



const PublicEstablishmentDetail = () => {


    const { usecase, } = useOutletContext<{
        usecase: PublicUseCase,
        transparencyUseCase?: TransparencyUseCase
    }>()

    const taUseCase = new TransparencyActiveUseCase(
        new TransparencyActiveService(
            new TransparencyActiveApi(api)
        )
    )
    const tfocalized = new TransparencyFocusUseCase(
        new TransparencyFocusService(
            new TransparencyFocusApi(api)
        )
    )
    const tcollab = new TransparencyCollabUseCase(
        new TransparencyCollabService(
            new TransparencyCollabApi(api)
        )
    )

    return (
        <div className="w-screen">


            <PublicEstablishmentDetailContainer
                usecase={usecase}
                transparencyUseCase={taUseCase}
                tcusecase={tcollab}
                tfusecase={tfocalized}
            />
        </div>
    )
}

export default PublicEstablishmentDetail