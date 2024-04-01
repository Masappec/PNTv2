import FocalizedListPresenter from "./FocalizedListPresenter";
import { useNavigate } from "react-router-dom";

const FocalizedListContainer = ()=>{

    const navigate = useNavigate()
    const handleAdd = () => {
            
        navigate("/admin/focalized/create")
    }

    return(
<FocalizedListPresenter
 onFilter={() => {}}
 data={[]}
 showPagination={true}
 onAdd={handleAdd}
/>

    )
}

export default FocalizedListContainer;