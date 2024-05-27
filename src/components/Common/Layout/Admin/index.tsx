import { Outlet } from "react-router-dom";
import Sidebar from "../../SideBar";
import { MenuItem } from "../../../../utils/menu";
import { useEffect, useState } from "react";
import HeaderPages from "../../HeaderPages";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { useDispatch } from "react-redux";
import { setEstablishments } from "../../../../infrastructure/Slice/EstablishmentSlice";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";
import { ToastContainer } from "react-toastify";

interface LayoutAdminProps {

    username: string;
    email: string;
    menu: MenuItem[],
    onLogout: () => void;
    permissions: string[]
    usecase: PublicUseCase;
    isSuperadmin: boolean;

}


const LayoutAdmin = ({ ...props }: LayoutAdminProps) => {

    const [user, setUser] = useState("")
    const [permissions, setPermissions] = useState<string[]>([])
    const [email, setEmail] = useState("")
    const [open, setOpen] = useState(false)
    const [isSuperadmin, setIsSuperadmin] = useState(false)
    useEffect(() => {
        setUser(props.username)
        setPermissions(props.permissions)
        setEmail(props.email)
        console.log(props.isSuperadmin)
        setIsSuperadmin(props.isSuperadmin)
    }, [props.username, props.permissions, props.email, props.isSuperadmin])


    const dispatch = useDispatch()



    useEffect(() => {
        props.usecase.getEstablishments().then(res => {
            const result = res.results.map((item) => item.data)
            const final: EstablishmentEntity[] = []
            result.map((item) => {
                item.map((_item) => {
                    final.push(_item)
                })
            })
            dispatch(setEstablishments(final))

        }).catch(() => {
            console.log("Error")
        })

    }, [])

    return (
        <div className="layout-admin  overflow-y-hidden overflow-x-hidden h-fit ">
            <div className=" flex-col  overflow-y-hidden">
                <HeaderPages open={open} setOpen={setOpen} haveImage={true} />
                <div className=" flex flex-row h-full">
                    <div
                        className={`lg:block xl:block w-auto ${open ? "block" : "hidden"} z-30 mb-52`}
                    >
                        <Sidebar
                            email={email}
                            user={user}
                            onLogout={props.onLogout}
                            menu={isSuperadmin == false ? props.menu :
                                props.menu.filter((item) => item.visible_for_superadmin != false)}
                            permissions={permissions}
                        />
                    </div>
                    <div
                        className={` ${open ? " bg-black bg-opacity-40 lg:bg-none  fixed z-20" : "hidden"
                            }`}
                        onClick={() => setOpen(false)}
                    >


                    </div>
                    <div className=" m-5 w-full overflow-x-hidden">
                        <ToastContainer />

                        <Outlet />
                    </div>
                </div>
            </div>
        </div>)
}

export default LayoutAdmin;
