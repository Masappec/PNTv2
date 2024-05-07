import { useEffect, useState } from "react";
import CollaborativeListPresenter from "./CollaborativeListPresenter";
import { useNavigate } from "react-router-dom";
import TransparencyCollab from "../../../../domain/entities/TransparencyCollab";
import TransparencyCollabUseCase from "../../../../domain/useCases/TransparencyCollabUseCase/TransparencyCollabUseCase";

const FocalizedListContainer = ({ usecase
}: {
  usecase: TransparencyCollabUseCase
}) => {


  const [transparencyFocus, setTransparencyFocus] = useState<TransparencyCollab[]>([])
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)
  const [selectedItem, setSelectedItem] = useState<TransparencyCollab | null>(null)
  const [type_alert, setTypeAlert] = useState<"success" | "warning" | "info" | "error">("success")
  const navigate = useNavigate()

  useEffect(() => {
    usecase.getTransparencyCollabList("", currentPage)
      .then((response) => {
        setTransparencyFocus(response.results)
        setCurrentPage(response.current)
        setFrom(response.from || 1)
        setTo(response.to || 1)
        setTotal(response.total)
        setTotalPage(response.total_pages || 0)

      })
      .catch((error) => {
        setError(error.message)
      })
  }, [])


  const handleAdd = () => {

    navigate("/admin/collaborative/create")
  }

  const handleEdit = (item: TransparencyCollab) => {
    navigate(`/admin/collaborative/edit/`, { state: { item } })
  }

  const handleDelete = (item: TransparencyCollab) => {
    setVisibleModal(true)
    setSelectedItem(item)
  }

  const onConfirmDelete = () => {
    if (selectedItem) {
      usecase.deleteTransparencyCollab(selectedItem.id)
        .then(() => {
          setVisibleModal(false)
          setTransparencyFocus(transparencyFocus.filter((item) => item.id !== selectedItem.id))
        })
        .catch((error) => {
          setError(error.message)
          setTypeAlert("error")
        })
    }
  }
  const onCancelDelete = () => {
    setVisibleModal(false)
  }
  return (
    <CollaborativeListPresenter
      error={error}
      data={transparencyFocus}
      onAdd={handleAdd}
      onCancelDelete={onCancelDelete}
      onConfirmDelete={onConfirmDelete}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onFilter={() => { }}
      onImport={() => { }}
      onSearch={() => { }}
      page={currentPage}
      search=""
      setPage={() => { }}
      setSeach={() => { }}
      setVisibleModal={setVisibleModal}
      visibleModal={visibleModal}
      from={from}
      to={to}
      total={total}
      totalPage={totalPage}
      selectedItem={selectedItem}
      type_alert={type_alert}

    />

  )
}

export default FocalizedListContainer;