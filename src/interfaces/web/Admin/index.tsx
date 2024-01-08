import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/Common/Layout/Admin"
import SessionService from "../../../infrastructure/Services/SessionService";
import menu from "../../../utils/menu"
import UserEntity from "../../../domain/entities/UserEntity";


const Admin = () => {

    const [user, setUser] = useState<UserEntity>({} as UserEntity)
    useEffect(() => {
        setUser(SessionService.getUserData())
    }, [])

    const logout = () => {
        SessionService.clearSession();
    }

    return (
        <LayoutAdmin menu={menu} username={user.first_name + " " + user.last_name || user.email}
            onLogout={logout}
            permissions={user.user_permissions?.map((item) => item.codename) || []}
        />
    )
}

export default Admin;