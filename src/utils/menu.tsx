import { LuUsers } from "react-icons/lu";
import { FaIdCard } from "react-icons/fa";
import UserList from "../interfaces/web/Admin/User/List";


export interface MenuItem {
    name: string;
    path: string;
    permission_required: string;
    icon: JSX.Element;
}

const menu = [
    {
        name: 'Usuarios',
        path: '/admin/users',
        permission_required: 'app.view_user',
        icon: <LuUsers size={25}/>,
        element: <UserList/>
    },
    {
        name: 'Roles',
        path: '/admin/roles',
        permission_required: 'app.view_role',
        icon: <FaIdCard  size={25}/>,
        element: <UserList/>
    }

]

export default menu;