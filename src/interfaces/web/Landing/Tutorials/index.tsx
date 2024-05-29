import { useOutletContext } from "react-router-dom";
import TutorialsContainer from "../../../../components/Landing/Tutorials/TutorialsContainer";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";



const Tutorials = () => {

    const {usecase} = useOutletContext<{
        usecase: PublicUseCase
    }>()

    return (
        <TutorialsContainer
        usecase={usecase}
        />
    );
}


export default Tutorials;