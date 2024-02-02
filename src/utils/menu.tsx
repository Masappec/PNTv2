import { LuUsers } from "react-icons/lu";
import { FaIdCard } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { AiOutlineFileSync } from "react-icons/ai";
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
import PedagodyAreaCreate from "../interfaces/web/Admin/PedagogyArea/Create";
import { IoFootsteps } from "react-icons/io5";
import UserImport from "../interfaces/web/Admin/User/Import";
import PublicationList from "../interfaces/web/Transparency/Publication/List";
import PublicationCreate from "../interfaces/web/Transparency/Publication/Create";
import PublicationEdit from "../interfaces/web/Transparency/Publication/Edit";
import { AiOutlineFileDone } from "react-icons/ai";
import SolicityList from "../interfaces/web/Transparency/Solicity/List";
import SolicityCreate from "../interfaces/web/Transparency/Solicity/Create";
import SolicityEdit from "../interfaces/web/Transparency/Solicity/Edit";
import SolicityResponse from "../interfaces/web/Transparency/Solicity/Response";
import SolicityOnHold from "../interfaces/web/Transparency/Solicity/OnHold";
import SolicityDetail from "../interfaces/web/Transparency/Solicity/Detail";


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
        permission_required: 'view_user',
        visible: true,
        icon: <LuUsers size={25} />,
        element: <UserList />
    },
    {
        name: 'Crear Usuario',
        path: '/admin/users/create',
        permission_required: 'add_user',
        visible: false,
        icon: <LuUsers size={25} />,
        element: <UserCreate />
    },
   
    {
        name: 'Editar Usuario',
        path: '/admin/users/:id',
        visible: false,
        permission_required: 'change_user',
        icon: <LuUsers size={25} />,
        element: <UserEdit />
    },
    
    {
        name: 'Importar archivos scv',
        path: '/admin/users/import',
        permission_required: 'add_user',
        visible: false,
        icon: <LuUsers size={25}/>,
        element:  <UserImport/>
     },
    {
        name: 'Roles',
        path: '/admin/roles',
        visible: true,
        permission_required: 'view_role',
        icon: <FaIdCard size={25} />,
        element: <RoleList />
    },
    {
        name: 'Crear Rol',
        path: '/admin/roles/create',
        visible: false,
        permission_required: 'add_role',
        icon: <FaIdCard size={25} />,
        element: <RoleCreate />
    },
    {
        name: 'Editar Rol',
        path: '/admin/roles/:id',
        visible: false,
        permission_required: 'change_role',
        icon: <FaIdCard size={25} />,
        element: <RoleEdit />
    },
    {
        name: 'Instituciones',
        path: '/admin/entities',
        visible: true,
        icon: <GoOrganization size={25} />,
        permission_required: "view_establishment",
        element: <EstablishmentList />
    },
    {
        name: 'Crear Institución',
        path: '/admin/entities/create',
        visible: false,
        icon: <GoOrganization size={25} />,
        permission_required: "add_establishment",
        element: <EstablishmentCreate />
    },
    {
        name: 'Editar Institución',
        path: '/admin/entities/:id',
        visible: false,
        icon: <GoOrganization size={25} />,
        permission_required: 'change_establishment',
        element: <EstablishmentEdit />
    },
    {
        name: 'Área pedagógica',
        path: '/admin/pedagogy-area',
        visible: true,
        icon: <IoFootsteps  size={25} />,
        permission_required: "view_pedagogyarea" ,
        element: <PedagodyAreaCreate />
    },
    {
        name: 'Configuración SMTP',
        path: '/admin/smtp',
        visible: true,
        icon: <DiAptana size={25} />,
        permission_required: "view_configuration",
        element: <SmtpCreate />
    },
    {
        name: 'Transparencia',
        path: '/admin/transparency',
        visible: true,
        icon: <AiOutlineFileSync  size={25} />,
        permission_required: "view_publication",
        element: <PublicationList />
    },
    {
        name: 'Transparencia',
        path: '/admin/transparency/create',
        visible: false,
        icon: <AiOutlineFileSync  size={25} />,
        permission_required: "add_publication",
        element: <PublicationCreate/>
    },
    {
        name: 'Transparencia',
        path: '/admin/transparency/:id',
        visible: false,
        icon: <AiOutlineFileSync  size={25} />,
        permission_required: "change_publication",
        element: <PublicationEdit/>
    },
  {
    name: "Solicitudes",
    path: "/admin/solicity",
    visible: true,
    icon: <AiOutlineFileDone size={25} />,
    permission_required: "view_configuration",
    element: <SolicityList />,
  },
  {
    name: " Crear Solicitudes",
    path: "/admin/solicity/create",
    visible: false,
    icon: <AiOutlineFileDone size={25} />,
    permission_required: "view_configuration",
    element: <SolicityCreate/>,
  },
  {
    name: " Editar Solicitudes",
    path: "/admin/solicity/edit",
    visible: false,
    icon: <AiOutlineFileDone size={25} />,
    permission_required: "view_configuration",
    element: <SolicityEdit/>,
  },
  {
    name: " Responder Solicitudes",
    path: "/admin/solicity/response",
    visible: false,
    icon: <AiOutlineFileDone size={25} />,
    permission_required: "view_configuration",
    element: <SolicityResponse/>,
  },
  {
    name: " Prórroga",
    path: "/admin/solicity/onhold",
    visible: false,
    icon: <AiOutlineFileDone size={25} />,
    permission_required: "view_configuration",
    element: <SolicityOnHold/>,
  },
  {
    name: " Detalles de Solicitud",
    path: "/admin/solicity/detail",
    visible: false,
    icon: <AiOutlineFileDone size={25} />,
    permission_required: "view_configuration",
    element: <SolicityDetail/>,
  }
];

export default menu;
