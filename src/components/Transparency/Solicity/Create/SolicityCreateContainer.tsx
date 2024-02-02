import {  useState } from "react"
import SolicityCreatePresenter from "./SolicityCreatePresenter";
import { useNavigate } from "react-router-dom"



/**
 * 

 */
const SolicityCreateContainer= ()=>{

   
    const navigation = useNavigate()



    const [error, setError] = useState<string>("")

    const [success, setSuccess] = useState<string>("")


    const [loading, setLoading] = useState<boolean>(false)
    



    const handleCancel = ()=>{
        setLoading(false)
        navigation('/transparency/solicity')
    }


    return (
        <>
        <SolicityCreatePresenter
         handleSubmit={()=>{}}
         onCancel={handleCancel}
         data={[]}
         error={error}
         loading={loading}
         success={success}
         setError={setError}
         setSuccess={setSuccess}
         onCreateTag={()=>{}}
         onFilterTag={()=>{}}
        
         onSelectedTag={()=>{}}
         onChangeDescription={()=>{}}
         onChangeTitle={()=>{}}
         onChangeEvent={()=>{}}
         
        />
        </>
    )
    
}


export default SolicityCreateContainer