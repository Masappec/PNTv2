import { useParams } from "react-router-dom";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";
import TransparencyUseCase from "../../../../domain/useCases/Transparency/TransparencyUseCase";
import PublicationDetailPresenter from "./PublicationDetailPresenter"
import { useEffect, useState } from "react";
import PublicationEntity from "../../../../domain/entities/PublicationEntity";
import EstablishmentEntity from "../../../../domain/entities/Establishment";


interface Props{
    usecase:PublicUseCase;
    transparencyUseCase?:TransparencyUseCase

}

const PublicationDetailContainer = (props:Props)=>{

    const {slug} = useParams<{slug:string}>()

    const [post, setPost] = useState<PublicationEntity>({
        
    })

    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [establishment, setEstablishment] = useState<EstablishmentEntity>({} as EstablishmentEntity)


    useEffect(() => {
        
        props.transparencyUseCase?.getDetailTransparency(slug||"").then((response) => {
            setPost(response)
            props.usecase.getEstablishment(response.establishment+""||"").then((response)=>{
                setEstablishment(response)
            })
        }).catch((error) => {

            setError(error.message) 
        }).finally(() => {
            setLoading(false)
        })

    }, [])

    return(
        <PublicationDetailPresenter
        loading={loading}
        error={error}
        description={post.description||""}
        title={post.name||""}
        user_name={post.userCreated||""}
        tags={post.tag?.map(v=>v.name)||[]}
        files={post.file_publication||[]}
        email_establishment={establishment.email_accesstoinformation||"---"}
        establishment={post.establishment_name||"---"}
        date_created={post.createdAt?.toLocaleString()||"---"}
        date_modified={post.updatedAt?.toLocaleString()||"---"}
        date_publication={post.createdAt?.toLocaleString()||"---"}
        attachments={post.attachment||[]}

        />
    )
}

export default PublicationDetailContainer