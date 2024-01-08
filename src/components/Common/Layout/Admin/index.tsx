import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar";
import Sidebar from "../../SideBar";
import  { MenuItem } from "../../../../utils/menu";
import { useEffect, useState } from "react";

interface LayoutAdminProps {
    
    username: string;
    menu: MenuItem[],
    onLogout: () => void;
    permissions: string[]
}


const LayoutAdmin = ({...props}:LayoutAdminProps) => {

    const [user, setUser] = useState("")
    const [permissions, setPermissions] = useState<string[]>([])
    useEffect(() => {
        setUser(props.username)
        setPermissions(props.permissions)
    }, [props.username])

    return (<div className="layout-admin h-screen flex flex-col">
        <div className="flex w-full ">

            <div className="flex-col">
                <Sidebar menu={props.menu} permissions={permissions} />

            </div>
            <div className="flex-col w-full">
                <Navbar username={user} onLogout={props.onLogout} />
                <div className="flex-col overflow-y-auto p-5 h-auto">
                    <div className="flex-row h-auto w-full">
                    <Outlet />

                    </div>
                  
                   
                </div>
            </div>

        </div>

    </div>)
}

export default LayoutAdmin;
