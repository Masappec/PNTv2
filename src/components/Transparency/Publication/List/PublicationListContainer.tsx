

import PublicationListPresenter from "./PublicationListPresenter"
import { useNavigate } from "react-router-dom"
import TransparencyUseCase from "../../../../domain/useCases/Transparency/TransparencyUseCase"
import PublicationEntity from "../../../../domain/entities/PublicationEntity"
import { useEffect, useState } from "react"
import PublicationUseCase from "../../../../domain/useCases/PublicationUseCase/PublicationUseCase"

interface Props {
    usecase: TransparencyUseCase;
    publicationUsecase: PublicationUseCase

}

const PublicationListContainer = (props: Props
) => {
    const navigate = useNavigate()

    const [publicaciones, SetPublicaciones] = useState<PublicationEntity[]>([])
    const [publicationSelected, SetPublicationSelected] = useState<PublicationEntity | null>(null)
    const [visibleModal, SetVisibleModal] = useState<boolean>(false)
    const [error, SetError] = useState<string>("")

    const [totalPage, setTotalPage] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [from, setFrom] = useState<number>(0)
    const [to, setTo] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)

    const handleAdd = () => {
        navigate('/admin/active/create')
    }
    const handleEdit = (id: number) => {
        navigate(`/admin/transparency/${id}`)
    }

    useEffect(
        () => {
            props.usecase.getListTransparency().then((res) => {
                SetPublicaciones(res.results)
                setCurrentPage(res.current)
                setTotalPage(res.total_pages || 1)
                setTotal(res.total)
                setFrom(res.from || 1)
                setTo(res.to)

            }).catch((error) => {
                SetError(error.message)
            })

        }, []
    )


    const onCancelDelete = () => {
        SetPublicationSelected(null)
        SetVisibleModal(false)
    }

    const onConfirmDelete = () => {
        if (publicationSelected) {
            props.publicationUsecase.updateState(publicationSelected.id || 0).then((res) => {
                const copy = [...publicaciones]
                const index = copy.findIndex((item) => item.id === publicationSelected.id)
                if (index !== -1) {
                    copy[index] = res
                    SetPublicaciones(copy)
                }
                SetPublicationSelected(null)
                SetVisibleModal(false)
            }).catch((error) => {
                SetError(error.message)
            })
        }
    }

    const onDelete = (id: number) => {
        const publication = publicaciones.find((item) => item.id === id)
        if (publication) {
            SetPublicationSelected(publication)
            SetVisibleModal(true)
        }
    }

    return (
        <PublicationListPresenter

            error={error}
            data={publicaciones}

            onAdd={handleAdd}
            onCancelDelete={onCancelDelete}
            onConfirmDelete={onConfirmDelete}
            onDelete={onDelete}
            onEdit={handleEdit}
            onFilter={() => { }}
            onImport={() => { }}
            onSearch={() => { }}
            page={currentPage}
            search=""

            setPage={() => { }}
            setSeach={() => { }}
            setVisibleModal={SetVisibleModal}
            visibleModal={visibleModal}
            from={from}
            to={to}
            total={total}
            totalPage={totalPage}
            publicationSelected={publicationSelected}

        />
    )

}

export default PublicationListContainer;