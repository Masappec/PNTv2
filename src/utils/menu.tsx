import { LuUsers } from "react-icons/lu";
import { FaIdCard } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import UserList from "../interfaces/web/Admin/User/List";
import UserCreate from "../interfaces/web/Admin/User/Create";
import RoleList from "../interfaces/web/Admin/Role/List";
import RoleCreate from "../interfaces/web/Admin/Role/Create";
import RoleEdit from "../interfaces/web/Admin/Role/Edit";
import EstablishmentList from "../interfaces/web/Admin/Establishment/List";
import UserEdit from "../interfaces/web/Admin/User/Edit";
import EstablishmentCreate from "../interfaces/web/Admin/Establishment/Create";
import EstablishmentEdit from "../interfaces/web/Admin/Establishment/Edit";
import SmtpCreate from "../interfaces/web/Admin/Smtp/Create";
import { DiAptana } from "react-icons/di";



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
        permission_required: 'auth.view_user',
        visible: true,
        icon: <LuUsers size={25} />,
        element: <UserList />
    },
    {
        name: 'Crear Usuario',
        path: '/admin/users/create',
        permission_required: 'auth.add_user',
        visible: false,
        icon: <LuUsers size={25} />,
        element: <UserCreate />
    },
    {
        name: 'Editar Usuario',
        path: '/admin/users/:id',
        visible: false,
        permission_required: 'auth.change_user',
        icon: <LuUsers size={25} />,
        element: <UserEdit />
    },
    {
        name: 'Roles',
        path: '/admin/roles',
        visible: true,
        permission_required: 'auth.view_role',
        icon: <FaIdCard size={25} />,
        element: <RoleList />
    },
    {
        name: 'Crear Rol',
        path: '/admin/roles/create',
        visible: false,
        permission_required: 'auth.add_role',
        icon: <FaIdCard size={25} />,
        element: <RoleCreate />
    },
    {
        name: 'Editar Rol',
        path: '/admin/roles/:id',
        visible: false,
        permission_required: 'auth.change_role',
        icon: <FaIdCard size={25} />,
        element: <RoleEdit />
    },
    {
        name: 'Instituciones',
        path: '/admin/entities',
        visible: true,
        icon: <GoOrganization size={25} />,
        permission_required: '',
        element: <EstablishmentList />
    },
    {
        name: 'Crear Institución',
        path: '/admin/entities/create',
        visible: false,
        icon: <GoOrganization size={25} />,
        permission_required: '',
        element: <EstablishmentCreate />
    },
    {
        name: 'Editar Institución',
        path: '/admin/entities/:id',
        visible: false,
        icon: <GoOrganization size={25} />,
        permission_required: '',
        element: <EstablishmentEdit />
    },
    {
        name: 'Configuración SMTP',
        path: '/admin/smtp',
        visible: true,
        icon: <DiAptana size={25} />,
        permission_required: '',
        element: <SmtpCreate />
    }

]

export default menu;