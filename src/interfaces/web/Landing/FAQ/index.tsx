import { useOutletContext } from "react-router-dom";
import FAQContainer from "../../../../components/Landing/FAQ/FAQContainer";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";



const FAQ = () => {

    const {usecase} = useOutletContext<{
        usecase: PublicUseCase
    }>()

    return (
        <FAQContainer
        usecase={usecase}
        />
    );
}


export default FAQ;