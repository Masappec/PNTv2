import { useOutletContext } from "react-router-dom"
import PublicEstablishmentContainer from "../../../../../components/Landing/Establishment/List/PublicEstablishmentContainer"
import PublicUseCase from "../../../../../domain/useCases/Public/PublicUseCase"




const PublicEstablishment = () => {

    const { usecase } = useOutletContext<{
        usecase: PublicUseCase
    }>()



    return (
        <div className="flex flex-col items-center justify-center w-full h-full">


           
            <PublicEstablishmentContainer
                usecase={usecase}
            />
        </div>
    )
}
export default PublicEstablishment