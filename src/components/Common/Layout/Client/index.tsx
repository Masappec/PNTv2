import { Outlet } from "react-router-dom"
import FooterInfo from "../../FooterInfo"
import Header from "../../Header"
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"

interface Props {
    usecase: PublicUseCase
}
const LayouClient = (props: Props) => {
    return (
        <>
            <Header />

            <Outlet
                context={{
                    usecase: props.usecase

                }}
            />
            <FooterInfo />
        </>
    )
}

export default LayouClient;