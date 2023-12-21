import LayoutAdmin from "../../../components/Common/Layout/Admin"
import SessionService from "../../../infrastructure/Services/SessionService";
import menu from "../../../utils/menu"


const userData = SessionService.getUserData();
const Admin = ()=>{
    return (
        <LayoutAdmin menu={menu} username={userData.firstName + userData.lastName|| userData.email} />
    )
}

export default Admin;