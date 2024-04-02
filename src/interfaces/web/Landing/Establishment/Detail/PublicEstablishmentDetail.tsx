import { useOutletContext } from "react-router-dom"
import PublicEstablishmentDetailContainer from "../../../../../components/Landing/Establishment/Detail/PublicEstablishmentDetailContainer"
import PublicUseCase from "../../../../../domain/useCases/Public/PublicUseCase"
import TransparencyUseCase from "../../../../../domain/useCases/Transparency/TransparencyUseCase"
import TransparencyActiveUseCase from "../../../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase"
import TransparencyActiveService from "../../../../../infrastructure/Services/TransparencyActiveService"
import TransparencyActiveApi from "../../../../../infrastructure/Api/TansparencyActive/TransparencyActiveApi"
import api from "../../../../../infrastructure/Api"



const PublicEstablishmentDetail = () => {


    const { usecase, transparencyUseCase } = useOutletContext<{
        usecase: PublicUseCase,
        transparencyUseCase?: TransparencyUseCase
    }>()

    const taUseCase = new TransparencyActiveUseCase(
        new TransparencyActiveService(
            new TransparencyActiveApi(api)
        )
    )


    return (
        <div className="w-screen">


            <PublicEstablishmentDetailContainer
                usecase={usecase}
                transparencyUseCase={taUseCase}
            />
        </div>
    )
}

export default PublicEstablishmentDetail