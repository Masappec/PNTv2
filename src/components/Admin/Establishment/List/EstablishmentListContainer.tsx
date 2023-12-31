import { useEffect, useState } from "react"
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase"
import EstablishmentListPresenter from "./EstablishmentListPresenter"
import EstablishmentEntity from "../../../../domain/entities/Establishment"



const EstablishmentListContainer = ({
    usecase
}:{
    usecase: EstablishmentUseCase
}) => {


    const [establishments, setEstablishments] = useState<EstablishmentEntity[]>([])

    useEffect(() => {
        usecase.getEstablishments()
            .then((response) => {
                setEstablishments(response.results)
            })
            .catch((error) => {
                console.log(error)
            })
    },[])

    return(
        <EstablishmentListPresenter 
        
        error={""}
        establishments={establishments}
        nextPage={1}
        onAdd={()=>{}}
        onCancelDelete={()=>{}}
        onConfirmDelete={()=>{}}
        onDelete={()=>{}}
        onEdit={()=>{}}
        onFilter={()=>{}}
        onImport={()=>{}}
        onSearch={()=>{}}
        page={1}
        previousPage={1}
        search=""
        selectedEstablishment={null}
        setPage={()=>{}}
        setSeach={()=>{}}
        setVisibleModal={()=>{}}
        visibleModal={false}
        />
    )

}

export default EstablishmentListContainer