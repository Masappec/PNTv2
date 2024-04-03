import CollaboartiveCreatePresenter from "./CollaborativeCreatePresenter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CollaborativeCreateContainer = () => {

  const navigate = useNavigate()


  const [error, setError] = useState<string>();
  const [loading,] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>();

  const [isDisabled,] = useState<boolean>(true);
  const handleEdit = () => {
    navigate("")
  }
  return (
    <CollaboartiveCreatePresenter
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
      isDisabled={!isDisabled} />

  )

}
export default CollaborativeCreateContainer;