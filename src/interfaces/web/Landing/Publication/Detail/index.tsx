import PublicationDetailContainer from "../../../../../components/Landing/Publication/Detail/PublicationDetailContainer"
import { useOutletContext, useParams } from "react-router-dom"
import PublicUseCase from "../../../../../domain/useCases/Public/PublicUseCase"
import TransparencyUseCase from "../../../../../domain/useCases/Transparency/TransparencyUseCase"
import { Breadcrumb } from "flowbite-react"
import { HiHome } from "react-icons/hi"

const PublicationDetail = () => {

    const { slug } = useParams<{ slug: string }>()
    const { usecase, transparencyUseCase } = useOutletContext<{
        usecase: PublicUseCase,
        transparencyUseCase?: TransparencyUseCase
    }>()
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">

            <Breadcrumb aria-label="Default breadcrumb example" className="w-10/12 mt-16">
                <Breadcrumb.Item href="/" icon={HiHome}>
                    Inicio
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/entidades">Entidades</Breadcrumb.Item>
                <Breadcrumb.Item href={"/publicaciones/" + slug}>
                    {slug}
                </Breadcrumb.Item>
            </Breadcrumb>
            <PublicationDetailContainer
                usecase={usecase}
                transparencyUseCase={transparencyUseCase}
            />
        </div>
    )
}

export default PublicationDetail