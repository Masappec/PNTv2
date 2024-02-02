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
    





    return (
        <>
        <SolicityCreatePresenter
         handleSubmit={()=>{}}
         onCancel={()=>{}}
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