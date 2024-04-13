import { useEffect, useState } from "react";
import TransparencyFocusEntity from "../../../../domain/entities/TransparencyFocus";
import TransparencyFocusUseCase from "../../../../domain/useCases/TransparencyFocusUseCase/TransparencyFocusUseCase";
import FocalizedListPresenter from "./FocalizedListPresenter";
import { useNavigate } from "react-router-dom";

const FocalizedListContainer = ({ usecase
}: {
    usecase: TransparencyFocusUseCase
}) => {


    const [transparencyFocus, setTransparencyFocus] = useState<TransparencyFocusEntity[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [selectedTransparencyFocus, setSelectedTransparencyFocus] = useState<TransparencyFocusEntity | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(0)
    
    const navigate = useNavigate()

    useEffect(() => {
        usecase.getTransparencyFocusList()
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
            
        navigate("/admin/focalized/create")
    }

    return(
<FocalizedListPresenter
  error={error}
  data={transparencyFocus}
  onAdd={handleAdd}
  onCancelDelete={()=>{}}
  onConfirmDelete={()=>{}}
  onDelete={()=>{}}
  onEdit={()=>{}}
  onFilter={() => { }}
  onImport={() => { }}
  onSearch={()=>{}}
  page={currentPage}
  search=""
  selectedTransparencyFocus={selectedTransparencyFocus}
  setPage={()=>{}}
  setSeach={() => { }}
  setVisibleModal={setVisibleModal}
  visibleModal={visibleModal}
  from={from}
  to={to}
  total={total}
  totalPage={totalPage}
/>

    )
}

export default FocalizedListContainer;