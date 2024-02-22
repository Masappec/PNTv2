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
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setUser(props.username)
        setPermissions(props.permissions)
    }, [props.username])

    return (
    <div className="layout-admin">
        <div className="flex-col">
            <HeaderPages open={open} setOpen={setOpen}
            haveImage={true}
            
            />
            <div className="flex">
                <div className={`w-1/6 md:w-1/6 lg:block xl:block  ${open ? "block" : "hidden"}
                    z-30 h-screen bg-slate-200
                `}>
                    <Sidebar 
                    email={user}
                    user={user}
                    onLogout={props.onLogout}
                    menu={props.menu} permissions={permissions} />
                </div>
                <div className={` overflow-y-auto w-full   `}>
                    <div className={` ${open ? " bg-black bg-opacity-40 lg:bg-none h-screen w-screen fixed z-10" : ""}`} onClick={() => setOpen(false)}></div>
                    <Outlet />
                </div>
            </div>

        </div>

    </div>)
}

export default LayoutAdmin;
