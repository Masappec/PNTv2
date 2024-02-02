import {  FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import SolicityOnHoldPresenter from "./SolicityOnHoldPresenter"

const SolicityOnHoldContainer= ()=>{
    const navigation = useNavigate()

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)

    

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        

        setLoading(true)
        console.log("")
        
    }

    const handleCancel = ()=>{
        setLoading(false)
        navigation('/transparency/solicity')
    }



    return (
        <>
        <SolicityOnHoldPresenter
            handleSubmit={handleSubmit}
            onCancel={handleCancel}
            data={[]}
            error={error}
            loading={loading}
            success={success}
            setError={setError}
            setSuccess={setSuccess}
        />
        </>
    )
    
}



export default SolicityOnHoldContainer