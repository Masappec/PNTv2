import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar";
import Sidebar from "../../SideBar";



const LayoutAdmin = () => {

    return (<div className="layout-admin h-screen flex flex-col">
        <div className="flex w-full ">

            <div className="flex-col">
                <Sidebar />

            </div>
            <div className="flex-col w-full">
                <Navbar />
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
