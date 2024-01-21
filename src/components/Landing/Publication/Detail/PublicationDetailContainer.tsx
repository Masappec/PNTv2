import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";
import TransparencyUseCase from "../../../../domain/useCases/Transparency/TransparencyUseCase";
import PublicationDetailPresenter from "./PublicationDetailPresenter"


interface Props{
    usecase:PublicUseCase;
    transparencyUseCase?:TransparencyUseCase

}

const PublicationDetailContainer = (props:Props)=>{
    return(
        <PublicationDetailPresenter/>
    )
}

export default PublicationDetailContainer