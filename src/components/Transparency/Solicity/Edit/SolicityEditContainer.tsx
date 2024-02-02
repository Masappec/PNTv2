import {  useState } from "react"
import SolicityEditPresenter from "./SolicityEditPresesnter"
import { useNavigate } from "react-router-dom"



/**
 * 

 */
const SolicityEditContainer= ()=>{

   
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
        <SolicityEditPresenter
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


export default SolicityEditContainer