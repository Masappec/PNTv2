
import { useEffect, useState } from "react"

import PublicationListPresenter from "./PublicationListPresenter"
import { useNavigate } from "react-router-dom"



const PublicationListContainer = (
) => {
    const navigate = useNavigate()
    const handleAdd = () => {
        navigate('/admin/transparency/create')
    }
    const handleEdit = () => {
        navigate(`/admin/transparecncy/edit`)
    }


    return (
        <PublicationListPresenter

            error={""}

            onAdd={handleAdd}
            onCancelDelete={()=>{}}
            onConfirmDelete={()=>{}}
            onDelete={()=>{}}
            onEdit={handleEdit}
            onFilter={() => { }}
            onImport={() => { }}
            onSearch={()=>{}}
            page={0}
            search=""
    
            setPage={()=>{}}
            setSeach={() => { }}
            setVisibleModal={()=>{}}
            visibleModal={false}
            from={0}
            to={0}
            total={0}
            totalPage={0}
        />
    )

}

export default PublicationListContainer;