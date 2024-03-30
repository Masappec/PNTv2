import CollaborativeListPresenter from "./CollaborativeListPresenter";
import { useNavigate } from "react-router-dom";

const CollaborativeListContainer = () => {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/admin/collaborative/create");
  };
  return (
    <CollaborativeListPresenter
      onFilter={() => {}}
      data={[]}
      showPagination={true}
      onAdd={handleAdd}
    />
  );
};
export default CollaborativeListContainer;
