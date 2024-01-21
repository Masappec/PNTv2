import { ChangeEvent, FormEvent, useState } from "react"
import PublicationEditPresenter from "./PublicationEditPresenter"
import { useNavigate } from "react-router-dom"



const PublicationEditContainer= ()=>{
    const navigation = useNavigate()

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <>
        <PublicationEditPresenter
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


export default PublicationEditContainer