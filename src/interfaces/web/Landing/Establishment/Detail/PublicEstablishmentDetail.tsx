import { useOutletContext } from "react-router-dom"
import PublicEstablishmentDetailContainer from "../../../../../components/Landing/Establishment/Detail/PublicEstablishmentDetailContainer"
import PublicUseCase from "../../../../../domain/useCases/Public/PublicUseCase"
import TransparencyUseCase from "../../../../../domain/useCases/Transparency/TransparencyUseCase"



const PublicEstablishmentDetail = () => {


    const { usecase, transparencyUseCase } = useOutletContext<{
        usecase: PublicUseCase,
        transparencyUseCase?: TransparencyUseCase
    }>()


    return (
        <div className="w-screen">


            <PublicEstablishmentDetailContainer
                usecase={usecase}
                transparencyUseCase={transparencyUseCase}
            />
        </div>
    )
}

export default PublicEstablishmentDetail