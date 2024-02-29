import { useOutletContext, useParams } from "react-router-dom"
import PublicEstablishmentDetailContainer from "../../../../../components/Landing/Establishment/Detail/PublicEstablishmentDetailContainer"
import PublicUseCase from "../../../../../domain/useCases/Public/PublicUseCase"
import { Breadcrumb } from "flowbite-react"
import { HiHome } from "react-icons/hi"
import TransparencyUseCase from "../../../../../domain/useCases/Transparency/TransparencyUseCase"



const PublicEstablishmentDetail = () => {


    const {slug} = useParams<{slug: string}>()
    const { usecase, transparencyUseCase } = useOutletContext<{
        usecase: PublicUseCase,
        transparencyUseCase?: TransparencyUseCase
    }>()


    return (
        <div className="flex flex-col items-center justify-center w-full h-full">

           
            <PublicEstablishmentDetailContainer
                usecase={usecase}
                transparencyUseCase={transparencyUseCase}
            />
        </div>
    )
}

export default PublicEstablishmentDetail