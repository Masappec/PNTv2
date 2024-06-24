import { useOutletContext } from "react-router-dom"
import PublicEstablishmentContainer from "../../../../../components/Landing/Establishment/List/PublicEstablishmentContainer"
import PublicUseCase from "../../../../../domain/useCases/Public/PublicUseCase"
import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase"
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi"
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService"
import api from "../../../../../infrastructure/Api"




const PublicEstablishment = () => {

    const { usecase } = useOutletContext<{
        usecase: PublicUseCase
    }>()


    const est = new EstablishmentUseCase(
        new EstablishmentService(
            new EstablishmentApi(api)
        )
    )

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">


           
            <PublicEstablishmentContainer
                usecase={usecase}
                usecaseEst={est}
            />
        </div>
    )
}
export default PublicEstablishment