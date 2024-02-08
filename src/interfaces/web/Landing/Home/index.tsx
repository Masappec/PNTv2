import { useOutletContext } from "react-router-dom"
import LandingContainer from "../../../../components/Landing/Home/LadingContainer"
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"


const Home = ()=>{
    const {usecase} = useOutletContext<{
        usecase: PublicUseCase
    }>()
    return (
        <LandingContainer usecase={usecase}/>
    )
}

export default Home;