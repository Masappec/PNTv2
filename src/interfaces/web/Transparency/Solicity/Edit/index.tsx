import SolicityEditContainer from "../../../../../components/Transparency/Solicity/Edit/SolicityEditContainer"
import PublicUseCase from "../../../../../domain/useCases/Public/PublicUseCase"
import SolicityUseCase from "../../../../../domain/useCases/SolicityUseCase/SolicityUseCase"
import api from "../../../../../infrastructure/Api"
import PublicApi from "../../../../../infrastructure/Api/Public/PublicApi"
import SolicityApi from "../../../../../infrastructure/Api/Solicity/SolicityApi"
import PublicService from "../../../../../infrastructure/Services/PublicService"
import SolicityService from "../../../../../infrastructure/Services/SolicityService"

const SolicityEdit = () => {

    const usecase = new SolicityUseCase(
        new SolicityService(
            new SolicityApi(api)
        )
    )
    const _public = new PublicUseCase(
        new PublicService(
            new PublicApi(api)
        )
    )
    return (
        <SolicityEditContainer
            publicusecase={_public}
            usecase={usecase}

        />
    )

}

export default SolicityEdit