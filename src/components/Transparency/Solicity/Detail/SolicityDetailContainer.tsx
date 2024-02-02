import {  } from "react"
import { useNavigate } from "react-router-dom"
import SolicityDetailPresenter from "./SolicityDetailPresenter";


const SolicityDetailContainer= ()=>{
    const navigation = useNavigate()





    const handleCancel = () => {
    }

    return (
        <>
        <SolicityDetailPresenter
            handleSubmit={()=>{}}
            onCancel={handleCancel}
            data={[]}
    
            detail={[]}
            
        />
        </>
    )
    
}



export default SolicityDetailContainer