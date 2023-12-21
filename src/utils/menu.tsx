import { LuUsers } from "react-icons/lu";
import { FaIdCard } from "react-icons/fa";


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
        icon: <LuUsers size={25}/>
    },
    {
        name: 'Roles',
        path: '/admin/roles',
        permission_required: 'app.view_role',
        icon: <FaIdCard  size={25}/>
    }

]

export default menu;