
import { useEffect, useState } from "react"

import PublicationListPresenter from "./PublicationListPresenter"
import { useNavigate } from "react-router-dom"
import TransparencyUseCase from "../../../../domain/useCases/Transparency/TransparencyUseCase"
import PublicationEntity from "../../../../domain/entities/PublicationEntity"

interface Props {
    usecase: TransparencyUseCase
}

const PublicationListContainer = ( props: Props
) => {
    const navigate = useNavigate()

    const [publicaciones, SetPublicaciones]= useState<PublicationEntity[]>([])
    const [error, SetError]= useState<string>("")

    const [totalPage, setTotalPage] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [from, setFrom] = useState<number>(0)
    const [to, setTo] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    
    const handleAdd = () => {
        navigate('/admin/transparency/create')
    }
    const handleEdit = () => {
        navigate(`/admin/transparecncy/edit`)
    }

    useEffect (
        () => {
            props.usecase.getListTransparency().then((res)=>{
                SetPublicaciones(res.results)
                setCurrentPage(res.current)
                setTotalPage(res.total_pages || 1)
                setTotal(res.total)
                setFrom(res.from|| 1)
                setTo(res.to)

            }).catch((error)=>{
                SetError(error.message)
            })
        
        },[]
    )


    return (
        <PublicationListPresenter

            error={error}
            data= {publicaciones}

            onAdd={handleAdd}
            onCancelDelete={()=>{}}
            onConfirmDelete={()=>{}}
            onDelete={()=>{}}
            onEdit={handleEdit}
            onFilter={() => { }}
            onImport={() => { }}
            onSearch={()=>{}}
            page={currentPage}
            search=""
    
            setPage={()=>{}}
            setSeach={() => { }}
            setVisibleModal={()=>{}}
            visibleModal={false}
            from={from}
            to={to}
            total={total}
            totalPage={totalPage}
        />
    )

}

export default PublicationListContainer;