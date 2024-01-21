import { ChangeEvent, FormEvent, useState } from "react"
import PublicationCreatePresenter from "./PublicationCreatePresenter";
import { useNavigate } from "react-router-dom"



const PublicationCreateContainer= ()=>{
    const navigation = useNavigate()

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <>
        <PublicationCreatePresenter
            handleSubmit={()=>{}}
            onCancel={()=>{}}
            data={[]}
            setData={()=>{}}
            onChageLogo={()=>{}}
            error={""}
            loading={loading}
            success={""}
            setError={()=>{}}
            setSuccess={()=>{}}

        />
        </>
    )
    
}


export default PublicationCreateContainer