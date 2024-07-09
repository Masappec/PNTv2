import { RiUser3Line, RiShieldUserLine, RiBuilding4Line, RiFileVideoLine, RiMailSettingsLine, RiMailCheckLine, RiCheckFill, RiCheckboxMultipleLine, RiFileExcel2Line } from "react-icons/ri";
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
import SolicityList from "../interfaces/web/Transparency/Solicity/List";
import SolicityCreate from "../interfaces/web/Transparency/Solicity/Create";
import SolicityEdit from "../interfaces/web/Transparency/Solicity/Edit";
import SolicityResponse from "../interfaces/web/Transparency/Solicity/Response";
import SolicityOnHold from "../interfaces/web/Transparency/Solicity/OnHold";
import SolicityDetail from "../interfaces/web/Transparency/Solicity/Detail";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import ActiveNumerals from "../interfaces/web/Transparency/Active/Numerals";
import ActiveCreate from "../interfaces/web/Transparency/Active/Create";
import ActivePreviewData from "../interfaces/web/Transparency/Active/PreviewData";
import FocalizedList from "../interfaces/web/Transparency/Focalized/List";
import FocalizedCreate from "../interfaces/web/Transparency/Focalized/Create";
import CollaborativeList from "../interfaces/web/Transparency/Collaborative/List";
import CollaborativeCreate from "../interfaces/web/Transparency/Collaborative/Create";
import SolicityListEstablishment from "../interfaces/web/Transparency/Solicity/ListEstablishment";
import IndicatorsAdmin from "../interfaces/web/Dashboard/IndicatorsAdmin";
import { BiPieChart } from "react-icons/bi";
import FocalizedEdit from "../interfaces/web/Transparency/Focalized/Edit";
import CollaborativeEdit from "../interfaces/web/Transparency/Collaborative/Edit";
import ActiveEdit from "../interfaces/web/Transparency/Active/Edit";
import EstablihsmentInSession from "../interfaces/web/Admin/Establishment/InSession/InSession";
import SolicityManual from "../interfaces/web/Transparency/Solicity/Manual";
import UserInSessionList from "../interfaces/web/Admin/User/InSession";
import Reports from "../interfaces/web/Transparency/Reports";


export interface MenuItem {
  name: string;
  path: string;
  permission_required: string;
  icon: JSX.Element;
  visible: boolean;
  visible_for_superadmin?: boolean;
}

const menu = [
  {
    name: "Indicadores",
    path: "/admin",
    visible: true,
    icon: <BiPieChart size={25} className="text-slate-500" />,
    permission_required: "",
    element: <IndicatorsAdmin />,
  },
  {
    name: 'Usuarios',
    path: '/admin/users',
    permission_required: 'view_user',
    visible: true,
    icon: <RiUser3Line size={25} className="text-slate-500" />,
    element: <UserList />
  },
  {
    name: 'Usuarios',
    path: '/admin/est/users/',
    permission_required: 'view_users_internal',
    visible: true,
    icon: <RiUser3Line size={25} className="text-slate-500" />,
    element: <UserInSessionList />,
    visible_for_superadmin: false

  },
  {
    name: 'Crear Usuario',
    path: '/admin/est/users/create',
    permission_required: 'view_users_internal',
    visible: false,
    icon: <RiUser3Line size={25} className="text-slate-500" />,
    element: <UserCreate />
  },

  {
    name: 'Editar Usuario',
    path: '/admin/est/users/:id',
    visible: false,
    permission_required: 'view_users_internal',
    icon: <RiUser3Line size={25} className="text-slate-500" />,
    element: <UserEdit />
  },
  {
    name: 'Crear Usuario',
    path: '/admin/users/create',
    permission_required: 'add_user',
    visible: false,
    icon: <RiUser3Line size={25} className="text-slate-500" />,
    element: <UserCreate />
  },

  {
    name: 'Editar Usuario',
    path: '/admin/users/:id',
    visible: false,
    permission_required: 'change_user',
    icon: <RiUser3Line size={25} className="text-slate-500" />,
    element: <UserEdit />
  },

  {
    name: 'Importar archivos scv',
    path: '/admin/users/import',
    permission_required: 'add_user',
    visible: false,
    icon: <RiUser3Line size={25} className="text-slate-500" />,
    element: <UserImport />
  },
  {
    name: 'Roles',
    path: '/admin/roles',
    visible: true,
    permission_required: 'view_group',
    icon: <RiShieldUserLine size={25} className="text-slate-500" />,
    element: <RoleList />
  },
  {
    name: 'Crear Rol',
    path: '/admin/roles/create',
    visible: false,
    permission_required: 'add_group',
    icon: <RiShieldUserLine size={25} className="text-slate-500" />,
    element: <RoleCreate />
  },
  {
    name: 'Editar Rol',
    path: '/admin/roles/:id',
    visible: false,
    permission_required: 'change_group',
    icon: <RiShieldUserLine size={25} className="text-slate-500" />,
    element: <RoleEdit />
  },
  {
    name: 'Instituciones',
    path: '/admin/entities',
    visible: true,
    icon: <RiBuilding4Line size={25} className="text-slate-500" />,
    permission_required: "view_establishment",
    element: <EstablishmentList />
  },
  {
    name: 'Crear Institución',
    path: '/admin/entities/create',
    visible: false,
    icon: <RiBuilding4Line size={25} className="text-slate-500" />,
    permission_required: "add_establishment",
    element: <EstablishmentCreate />
  },
  {
    name: 'Editar Institución',
    path: '/admin/entities/:id',
    visible: false,
    icon: <RiBuilding4Line size={25} className="text-slate-500" />,
    permission_required: 'change_establishment',
    element: <EstablishmentEdit />
  },
  {
    name: 'Institución',
    path: '/admin/entity/',
    element: <EstablihsmentInSession />,
    permission_required: 'view_establishment_internal',
    icon: <RiBuilding4Line size={25} className="text-slate-500" />,
    visible: true,
    visible_for_superadmin: false

  },
  {
    name: 'Área pedagógica',
    path: '/admin/pedagogy-area',
    visible: true,
    icon: <RiFileVideoLine size={25} className="text-slate-500" />,
    permission_required: "view_pedagogyarea",
    element: <PedagodyAreaCreate />
  },
  {
    name: 'Configuración SMTP',
    path: '/admin/smtp',
    visible: true,
    icon: <RiMailSettingsLine size={25} className="text-slate-500" />,
    permission_required: "view_configuration",
    element: <SmtpCreate />
  },
  {
    name: ' T.Activa ',
    path: '/admin/transparency/active',
    visible: true,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: "view_transparencyactive",
    element: <ActiveNumerals />,
    visible_for_superadmin: false

  },
  {
    name: 'Crear T.Activa',
    path: '/admin/active/create',
    visible: false,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: "add_transparencyactive",
    element: <ActiveCreate />,
    visible_for_superadmin: false

  },
  {
    name: 'Editar T.Activa',
    path: '/admin/active/edit',
    visible: false,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: "change_transparencyactive",
    element: <ActiveEdit />,
  },

  {
    name: 'Vista T.Activa',
    path: '/admin/active/previewdata',
    visible: false,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: "view_transparencyactive",
    element: <ActivePreviewData />,
    visible_for_superadmin: false

  },

  {
    name: 'T.Focalizada',
    path: '/admin/transparency/focalized',
    visible: true,
    icon: <RiCheckboxMultipleLine size={25} className="text-slate-500" />,
    permission_required: "view_transparencyactive",
    element: <FocalizedList />,
    visible_for_superadmin: false

  },
  {
    name: 'T.Focalizada',
    path: '/admin/focalized/create',
    visible: false,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: "view_transparencyactive",
    element: <FocalizedCreate />,
    visible_for_superadmin: false

  },
  {
    name: 'T.Focalizada',
    path: '/admin/focalized/Edit',
    visible: false,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: "view_transparencyactive",
    element: <FocalizedEdit />
  },
  {
    name: 'T.Colaborativa',
    path: '/admin/transparency/collaborative',
    visible: true,
    icon: <RiCheckFill size={25} className="text-slate-500" />,
    permission_required: "view_transparencyactive",
    element: <CollaborativeList />,
    visible_for_superadmin: false

  },
  {
    name: 'T.Colaborativa',
    path: '/admin/collaborative/create',
    visible: false,
    icon: <RiCheckFill size={25} className="text-slate-500" />,
    permission_required: "view_transparencyactive",
    element: <CollaborativeCreate />
  },
  {
    name: 'T.Colaborativa',
    path: '/admin/collaborative/Edit',
    visible: false,
    icon: <RiCheckFill size={25} className="text-slate-500" />,
    permission_required: "view_transparencyactive",
    element: <CollaborativeEdit />
  },



  {
    name: "Solicitudes",
    path: "/admin/solicity",
    visible: true,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: "view_solicity",
    element: <SolicityList />,
    visible_for_superadmin: false

  },

  {
    name: "Solicitudes",
    path: "/admin/establishment/solicity",
    visible: true,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: "view_solicityresponse",
    element: <SolicityListEstablishment />,
    visible_for_superadmin: false
  },
  {
    name: " Crear Solicitudes",
    path: "/admin/solicity/create",
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: "add_solicity",
    element: <SolicityCreate />,
  },
  {
    name: " Crear Solicitudes",
    path: "/admin/solicity/create/manual",
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: "add_manual_solicity",
    element: <SolicityManual />,
  },
  {
    name: " Editar Solicitudes",
    path: "/admin/solicity/edit/:id",
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: "change_solicity",
    element: <SolicityEdit />,
  },

  {
    name: " Responder Solicitudes",
    path: "/admin/solicity/response/citizen",
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: "view_solicity",
    element: <SolicityResponse />,
  },
  {
    name: " Responder Solicitudes",
    path: "/admin/solicity/response",
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: "add_solicityresponse",
    element: <SolicityResponse />,
  },
  {
    name: " Prórroga",
    path: "/admin/solicity/onhold",
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: "add_solicityresponse",
    element: <SolicityOnHold />,
  },
  {
    name: " Detalles de Solicitud",
    path: "/admin/solicity/detail",
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: "view_configuration",
    element: <SolicityDetail />,
  },
  {
    name: "Reportes",
    path: "/admin/reports",
    visible: true,
    icon: <RiFileExcel2Line size={25} className="text-slate-500" />,
    permission_required: "view_solicityresponse",
    element: <Reports />,
    visible_for_superadmin: false
  }

];

export default menu;
