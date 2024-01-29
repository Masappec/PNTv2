import {  FormEvent, useState } from "react"
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
    





    return (
        <>
        <SolicityEditPresenter
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


export default SolicityEditContainer