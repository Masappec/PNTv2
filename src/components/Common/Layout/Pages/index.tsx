import { Outlet } from "react-router-dom"
import HeaderPages from "../../HeaderPages"
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"
import TransparencyUseCase from "../../../../domain/useCases/Transparency/TransparencyUseCase"

interface Props {
    usecase: PublicUseCase
    transparencyUseCase?: TransparencyUseCase
}
const LayouPages = (props: Props) => {
    return (
        <>
            <HeaderPages />
            <Outlet
                context={{
                    usecase: props.usecase,
                    transparencyUseCase: props.transparencyUseCase,

                }}
            />

        </>

    )
}
export default LayouPages