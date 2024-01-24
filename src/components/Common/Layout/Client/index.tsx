import { Outlet } from "react-router-dom"
import FooterInfo from "../../FooterInfo"
import Header from "../../Header"
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"
import TransparencyUseCase from "../../../../domain/useCases/Transparency/TransparencyUseCase"

interface Props {
    usecase: PublicUseCase
    transparencyUseCase?: TransparencyUseCase
}
const LayouClient = (props: Props) => {
    return (
        <>
            <Header />
            <div className="bg-[#fbf9f8]">
            <Outlet
                context={{
                    usecase: props.usecase,
                    transparencyUseCase: props.transparencyUseCase,

                }}
            />
            </div>
            <FooterInfo />
        </>
    )
}

export default LayouClient;