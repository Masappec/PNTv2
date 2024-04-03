import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/Common/Layout/Admin"
import SessionService from "../../../infrastructure/Services/SessionService";
import menu from "../../../utils/menu"
import UserEntity from "../../../domain/entities/UserEntity";
import { IntlProvider } from "react-intl";


const Admin = () => {

    const [user, setUser] = useState<UserEntity>({} as UserEntity)
    useEffect(() => {
        setUser(SessionService.getUserData())
    }, [])

    const logout = () => {
        SessionService.clearSession();
    }

    return (
        <IntlProvider locale="es">
            <LayoutAdmin menu={menu} username={user.first_name + " " + user.last_name || user.email}
                onLogout={logout}
                email={user.email}
                permissions={user.user_permissions?.map((item) => item.codename) || []}
            />
        </IntlProvider>
    )
}

export default Admin;