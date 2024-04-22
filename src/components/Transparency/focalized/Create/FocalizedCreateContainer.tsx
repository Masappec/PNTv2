import { useNavigate } from "react-router-dom";
import FocalizedCreatePresenter from "./FocalizedCreatePresenter";
import { useState } from "react";

const FocalizedCreateContainer = () => {



  const navigate = useNavigate()


  const [error, setError] = useState<string>();
  const [loading,] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>();

  const [isDisabled,] = useState<boolean>(true);





  const handleEdit = () => {
    navigate('/admin/focalized/edit');
  }
  return (
    <FocalizedCreatePresenter
      title={""}
      handleSubmit={() => { }}
      error={error || ""}
      loading={loading}
      onChageFile={() => { }}
      onEdit={handleEdit}
      setData={() => { }}
      setError={setError}
      setSuccess={setSuccess}
      templates={[]}
      onChageLink={() => { }}
      success={success || ""}
      filesPublication={[]}
      isDisabled={!isDisabled}
    />
  )
}
export default FocalizedCreateContainer