import { RiUser3Line ,RiShieldUserLine, RiBuilding4Line, RiFileVideoLine, RiMailSettingsLine, RiFileList3Line, RiMailCheckLine  } from "react-icons/ri";
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
import PedagodyAreaCreate from "../interfaces/web/Admin/PedagogyArea/Create";
import UserImport from "../interfaces/web/Admin/User/Import";
import PublicationList from "../interfaces/web/Transparency/Publication/List";
import PublicationCreate from "../interfaces/web/Transparency/Publication/Create";
import PublicationEdit from "../interfaces/web/Transparency/Publication/Edit";
import SolicityList from "../interfaces/web/Transparency/Solicity/List";
import SolicityCreate from "../interfaces/web/Transparency/Solicity/Create";
import SolicityEdit from "../interfaces/web/Transparency/Solicity/Edit";
import SolicityResponse from "../interfaces/web/Transparency/Solicity/Response";
import SolicityOnHold from "../interfaces/web/Transparency/Solicity/OnHold";
import SolicityDetail from "../interfaces/web/Transparency/Solicity/Detail";
import { HiOutlineChartSquareBar } from "react-icons/hi";


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
        icon: <RiUser3Line  size={25} className="text-slate-500" />,
        element: <UserList />
    },
    {
        name: 'Crear Usuario',
        path: '/admin/users/create',
        permission_required: 'add_user',
        visible: false,
        icon: <RiUser3Line  size={25}  className="text-slate-500"/>,
        element: <UserCreate />
    },
   
    {
        name: 'Editar Usuario',
        path: '/admin/users/:id',
        visible: false,
        permission_required: 'change_user',
        icon: <RiUser3Line  size={25}  className="text-slate-500"/>,
        element: <UserEdit />
    },
    
    {
        name: 'Importar archivos scv',
        path: '/admin/users/import',
        permission_required: 'add_user',
        visible: false,
        icon: <RiUser3Line  size={25}  className="text-slate-500"/>,
        element:  <UserImport/>
     },
    {
        name: 'Roles',
        path: '/admin/roles',
        visible: true,
        permission_required: 'view_role',
        icon: <RiShieldUserLine  size={25}  className="text-slate-500"/>,
        element: <RoleList />
    },
    {
        name: 'Crear Rol',
        path: '/admin/roles/create',
        visible: false,
        permission_required: 'add_role',
        icon: <RiShieldUserLine  size={25}  className="text-slate-500"/>,
        element: <RoleCreate />
    },
    {
        name: 'Editar Rol',
        path: '/admin/roles/:id',
        visible: false,
        permission_required: 'change_role',
        icon: <RiShieldUserLine  size={25}  className="text-slate-500"/>,
        element: <RoleEdit />
    },
    {
        name: 'Instituciones',
        path: '/admin/entities',
        visible: true,
        icon: <RiBuilding4Line  size={25} className="text-slate-500"/>,
        permission_required: "view_establishment",
        element: <EstablishmentList />
    },
    {
        name: 'Crear Institución',
        path: '/admin/entities/create',
        visible: false,
        icon: <RiBuilding4Line  size={25} className="text-slate-500"/>,
        permission_required: "add_establishment",
        element: <EstablishmentCreate />
    },
    {
        name: 'Editar Institución',
        path: '/admin/entities/:id',
        visible: false,
        icon: <RiBuilding4Line  size={25} className="text-slate-500"/>,
        permission_required: 'change_establishment',
        element: <EstablishmentEdit />
    },
    {
        name: 'Área pedagógica',
        path: '/admin/pedagogy-area',
        visible: true,
        icon: <RiFileVideoLine   size={25} className="text-slate-500"/>,
        permission_required: "view_pedagogyarea" ,
        element: <PedagodyAreaCreate />
    },
    {
        name: 'Configuración SMTP',
        path: '/admin/smtp',
        visible: true,
        icon: <RiMailSettingsLine  size={25} className="text-slate-500"/>,
        permission_required: "view_configuration",
        element: <SmtpCreate />
    },
    {
        name: 'T. Activa',
        path: '/admin/transparency',
        visible: true,
        icon: <HiOutlineChartSquareBar    size={25} className="text-slate-500"/>,
        permission_required: "view_publication",
        element: <PublicationList />
    },
    {
        name: 'Transparencia',
        path: '/admin/transparency/create',
        visible: false,
        icon: <RiFileList3Line   size={25} className="text-slate-500"/>,
        permission_required: "add_publication",
        element: <PublicationCreate/>
    },
    {
        name: 'Transparencia',
        path: '/admin/transparency/:id',
        visible: false,
        icon: <RiFileList3Line   size={25} className="text-slate-500"/>,
        permission_required: "change_publication",
        element: <PublicationEdit/>
    },
  {
    name: "Solicitudes",
    path: "/admin/solicity",
    visible: true,
    icon: <RiMailCheckLine  size={25} className="text-slate-500"/>,
    permission_required: "view_configuration",
    element: <SolicityList />,
  },
  {
    name: " Crear Solicitudes",
    path: "/admin/solicity/create",
    visible: false,
    icon: <RiMailCheckLine  size={25} className="text-slate-500"/>,
    permission_required: "view_configuration",
    element: <SolicityCreate/>,
  },
  {
    name: " Editar Solicitudes",
    path: "/admin/solicity/edit",
    visible: false,
    icon: <RiMailCheckLine  size={25} className="text-slate-500"/>,
    permission_required: "view_configuration",
    element: <SolicityEdit/>,
  },
  {
    name: " Responder Solicitudes",
    path: "/admin/solicity/response",
    visible: false,
    icon: <RiMailCheckLine  size={25} className="text-slate-500"/>,
    permission_required: "view_configuration",
    element: <SolicityResponse/>,
  },
  {
    name: " Prórroga",
    path: "/admin/solicity/onhold",
    visible: false,
    icon: <RiMailCheckLine  size={25} className="text-slate-500"/>,
    permission_required: "view_configuration",
    element: <SolicityOnHold/>,
  },
  {
    name: " Detalles de Solicitud",
    path: "/admin/solicity/detail",
    visible: false,
    icon: <RiMailCheckLine  size={25} className="text-slate-500"/>,
    permission_required: "view_configuration",
    element: <SolicityDetail/>,
  }
];

export default menu;
