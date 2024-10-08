import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/Common/Layout/Admin"
import SessionService from "../../../infrastructure/Services/SessionService";
import menu from "../../../utils/menu"
import UserEntity from "../../../domain/entities/UserEntity";
import { IntlProvider } from "react-intl";
import PublicService from "../../../infrastructure/Services/PublicService";
import api from "../../../infrastructure/Api";
import PublicApi from "../../../infrastructure/Api/Public/PublicApi";
import PublicUseCase from "../../../domain/useCases/Public/PublicUseCase";


const Admin = () => {

    const [user, setUser] = useState<UserEntity>({} as UserEntity)
    const publicApi = new PublicApi(api);
    const [is_superuser, setIsSuperuser] = useState<boolean | undefined>(false)

    const publicService = new PublicService(publicApi);
    const usecase = new PublicUseCase(publicService);

    useEffect(() => {
        setIsSuperuser(SessionService.getUserData().is_superuser)

        setUser(SessionService.getUserData())
    }, [])



    const logout = () => {
        SessionService.clearSession();
        window.location.reload()
    }

    return (
        <IntlProvider locale="es">
            <LayoutAdmin menu={menu} username={user.first_name + " " + user.last_name || user.email}
                onLogout={logout}
                email={user.email}
                usecase={usecase}
                permissions={user.user_permissions?.map((item) => item.codename) || []}
                isSuperadmin={is_superuser || false}
            />
        </IntlProvider>
    )
}

export default Admin;