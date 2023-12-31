import { LuUsers } from "react-icons/lu";
import { FaIdCard } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import UserList from "../interfaces/web/Admin/User/List";
import UserCreate from "../interfaces/web/Admin/User/Create";
import RoleList from "../interfaces/web/Admin/Role/List";
import RoleCreate from "../interfaces/web/Admin/Role/Create";
import RoleEdit from "../interfaces/web/Admin/Role/Edit";
import EstablishmentList from "../interfaces/web/Admin/Establishment/List";


export interface MenuItem {
    name: string;
    path: string;
    permission_required: string;
    icon: JSX.Element;
    visible: boolean;
}

const menu = [
    {
        name: 'Usuarios',
        path: '/admin/users',
        permission_required: 'app.view_user',
        visible: true,
        icon: <LuUsers size={25}/>,
        element: <UserList/>
    },
    {
        name: 'Crear Usuario',
        path: '/admin/users/create',
        permission_required: 'app.add_user',
        visible: false,
        icon: <LuUsers size={25}/>,
        element: <UserCreate/>
    },
    {
        name: 'Roles',
        path: '/admin/roles',
        visible: true,
        permission_required: 'app.view_role',
        icon: <FaIdCard  size={25}/>,
        element: <RoleList/>
    },
    {
        name: 'Crear Rol',
        path: '/admin/roles/create',
        visible: false,
        permission_required: 'app.add_role',
        icon: <FaIdCard  size={25}/>,
        element: <RoleCreate/>
    },
    {
        name: 'Editar Rol',
        path: '/admin/roles/:id',
        visible: false,
        permission_required: 'app.change_role',
        icon: <FaIdCard  size={25}/>,
        element: <RoleEdit/>
    },
    {
        name: 'entidades',
        path: '/admin/entities',
        visible: true,
        icon: <GoOrganization />,
        permission_required: '',
        element:<EstablishmentList/>


    }

]

export default menu;