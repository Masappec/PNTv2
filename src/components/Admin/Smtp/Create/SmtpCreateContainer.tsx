import React from "react";
import SmtpCreatePresenter from "./SmtpCreatePresenter";
import { useNavigate } from "react-router-dom"


const SmtpCreateContainer= ()=>{
    
    return(
        <SmtpCreatePresenter
            handleSubmit={()=>{}}
            onCancel={()=>{}}
            data={0}
            setData={()=>{}}
            error={""}
            loading={false}
            success={""}
            setError={()=>{}}
            setSuccess={()=>{}}

        />

    )
}

export default SmtpCreateContainer;