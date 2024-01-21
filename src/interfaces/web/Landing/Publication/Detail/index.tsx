import PublicationDetailContainer from "../../../../../components/Landing/Publication/Detail/PublicationDetailContainer"
import { useOutletContext } from "react-router-dom"
import PublicUseCase from "../../../../../domain/useCases/Public/PublicUseCase"
import TransparencyUseCase from "../../../../../domain/useCases/Transparency/TransparencyUseCase"

const PublicationDetail= ()=>{
    const { usecase, transparencyUseCase } = useOutletContext<{
        usecase: PublicUseCase,
        transparencyUseCase?: TransparencyUseCase
    }>()
    return(
        <PublicationDetailContainer
        usecase={usecase}
        transparencyUseCase={transparencyUseCase}
        />
    )
}

export default PublicationDetail