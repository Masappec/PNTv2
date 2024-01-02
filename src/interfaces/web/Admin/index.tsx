import LayoutAdmin from "../../../components/Common/Layout/Admin"
import SessionService from "../../../infrastructure/Services/SessionService";
import menu from "../../../utils/menu"


const userData = SessionService.getUserData();
const Admin = ()=>{
    
    const logout = ()=>{
        SessionService.clearSession();
    } 

    return (
        <LayoutAdmin menu={menu} username={userData.first_name + userData.last_name|| userData.email} 
        onLogout={logout}
            />
    )
}

export default Admin;