/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import PublicationEditPresenter from "./PublicationEditPresenter"
import { useNavigate } from "react-router-dom"



const PublicationEditContainer= ()=>{
    const navigation = useNavigate()

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)


    const handleCancel = () => {
        navigation("/admin/trasnparencia")
    }

    return (
        <>
        <PublicationEditPresenter
            handleSubmit={()=>{}}
            onCancel={handleCancel}
            data={[]}
            setData={()=>{}}
            onChageLogo={()=>{}}
            error={error}
            loading={loading}
            success={success}
            setError={()=>{}}
            setSuccess={()=>{}}

        />
        </>
    )
    
}


export default PublicationEditContainer