import { useLocation, useNavigate } from "react-router-dom";
import FocalizedCreatePresenter from "./FocalizedCreatePresenter";
import { useState } from "react";

const FocalizedCreateContainer = () => {


  const location = useLocation()

  const navigate = useNavigate()

  const state = location.state as [];

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);





  const handleEdit = () => {
    navigate("")
  }
  return (
    <FocalizedCreatePresenter
      title={""}
      handleSubmit={()=>{}}
      error={error || ""}
      loading={loading}
      onChageFile={()=>{}}
      onEdit={handleEdit}
      setData={() => { }}
      setError={setError}
      setSuccess={setSuccess}
      templates={[]}
      onChageLink={()=>{}}
      success={success || ""}
      filesPublication={ []}
      isDisabled={!isDisabled}
    />
  )
}
export default FocalizedCreateContainer