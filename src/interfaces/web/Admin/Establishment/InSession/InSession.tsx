import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase"
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService"
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi"
import api from "../../../../../infrastructure/Api"
import EstablishmentEntity from "../../../../../domain/entities/Establishment"



const EstablihsmentInSession = ()=>{

    //const user = SessionService.USER_DATA_KEY
    const usecase = new EstablishmentUseCase(new EstablishmentService(new EstablishmentApi(api)))


    const [Establishment,SetEstablishment] =useState({} as EstablishmentEntity)

    useEffect(()=>{
        usecase.getByUserSession().then(res => SetEstablishment(res))
    },[])




    if(Establishment){
        return <Navigate to={'/admin/entities/' + Establishment.id} replace/>
    }

    return null
}

export default EstablihsmentInSession;