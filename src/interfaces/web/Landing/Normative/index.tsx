import { useOutletContext } from "react-router-dom";
import NormativeContainer from "../../../../components/Landing/Normative/NormativeContainer"
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";





const Normative = () => {
    const {usecase} = useOutletContext<{
        usecase: PublicUseCase
    }>()
    
    return (
        <NormativeContainer
            usecase={usecase}
        />
    )
}

export default Normative;