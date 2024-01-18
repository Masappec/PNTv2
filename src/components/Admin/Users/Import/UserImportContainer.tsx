import UserImportPresenter from "./UserImportPresenter";


const UserImportContainer= ()=>{
  
    
return(
<UserImportPresenter
  error={""}
  onSearch= {()=>{}}
  onImport= {()=>{}}
  onCancel= {()=>{}}
  search={""}
  setSeach= {()=>{}}
  page= {0} 
  nextPage= {0}
  previousPage= {0}
  setPage= {()=>{}}
  setVisibleModal= {()=>{}}
  visibleModal={false}
  onConfirmDelete= {()=>{}}
  onCancelDelete= {()=>{}}
  onDelete= {()=>{}}
  loading= {false}
  success= {""}
  setError= {()=>{}}
  setSuccess= {()=>{}}
/>

)

}

export default UserImportContainer