import { Outlet } from "react-router-dom";
import Sidebar from "../../SideBar";
import { MenuItem } from "../../../../utils/menu";
import { useEffect, useState } from "react";
import HeaderPages from "../../HeaderPages";

interface LayoutAdminProps {

    username: string;
    menu: MenuItem[],
    onLogout: () => void;
    permissions: string[]
}


const LayoutAdmin = ({ ...props }: LayoutAdminProps) => {

    const [user, setUser] = useState("")
    const [permissions, setPermissions] = useState<string[]>([])
    useEffect(() => {
        setUser(props.username)
        setPermissions(props.permissions)
    }, [props.username])

    return (
    <div className="layout-admin h-screen">
        <div className="flex-col">
            <HeaderPages />
            <div className="flex">
                <div className="w-1/6 md:w-1/6">
                    <Sidebar menu={props.menu} permissions={permissions} />
                </div>
                <div className="w-auto h-screen m-5">
                    <Outlet />
                </div>
            </div>

        </div>

    </div>)
}

export default LayoutAdmin;
