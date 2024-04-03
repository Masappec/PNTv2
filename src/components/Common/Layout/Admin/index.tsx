import { Outlet } from "react-router-dom";
import Sidebar from "../../SideBar";
import { MenuItem } from "../../../../utils/menu";
import { useEffect, useState } from "react";
import HeaderPages from "../../HeaderPages";

interface LayoutAdminProps {

    username: string;
    email: string;
    menu: MenuItem[],
    onLogout: () => void;
    permissions: string[]
}


const LayoutAdmin = ({ ...props }: LayoutAdminProps) => {

    const [user, setUser] = useState("")
    const [permissions, setPermissions] = useState<string[]>([])
    const [email, setEmail] = useState("")
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setUser(props.username)
        setPermissions(props.permissions)
        setEmail(props.email)
    }, [props.username, props.permissions, props.email])

    return (
        <div className="layout-admin  overflow-y-hidden">
            <div className="flex-col  overflow-y-hidden">
                <HeaderPages open={open} setOpen={setOpen} haveImage={true} />
                <div className="flex h-[48rem]  overflow-y-hidden">
                    <div
                        className={` lg:block xl:block ${open ? "block" : "hidden"} z-30  bg-slate-200`}
                    >
                        <Sidebar
                            email={email}
                            user={user}
                            onLogout={props.onLogout}
                            menu={props.menu}
                            permissions={permissions}
                        />
                    </div>
                    <div className="w-full overflow-y-hidden">
                        <div
                            className={` ${open ? " bg-black bg-opacity-40 lg:bg-none h-screen w-screen fixed z-20" : ""
                                }`}
                            onClick={() => setOpen(false)}
                        ></div>
                        <div className="overflow-y-auto h-[48rem] m-8 ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default LayoutAdmin;
