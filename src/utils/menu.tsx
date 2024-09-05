import { BiPieChart } from 'react-icons/bi'
import { FaRegUser, FaTable } from 'react-icons/fa'
import { HiOutlineChartSquareBar } from 'react-icons/hi'
import {
  RiBuilding4Line,
  RiCheckFill,
  RiCheckboxMultipleLine,
  RiFileExcel2Line,
  RiFileVideoLine,
  RiMailCheckLine,
  RiMailSettingsLine,
  RiShieldUserLine,
  RiUser3Line
} from 'react-icons/ri'
import EstablishmentCreate from '../interfaces/web/Admin/Establishment/Create'
import EstablishmentEdit from '../interfaces/web/Admin/Establishment/Edit'
import EstablihsmentInSession from '../interfaces/web/Admin/Establishment/InSession/InSession'
import EstablishmentList from '../interfaces/web/Admin/Establishment/List'
import PedagodyAreaCreate from '../interfaces/web/Admin/PedagogyArea/Create'
import RoleCreate from '../interfaces/web/Admin/Role/Create'
import RoleEdit from '../interfaces/web/Admin/Role/Edit'
import RoleList from '../interfaces/web/Admin/Role/List'
import SmtpCreate from '../interfaces/web/Admin/Smtp/Create'
import UserCreate from '../interfaces/web/Admin/User/Create'
import UserEdit from '../interfaces/web/Admin/User/Edit'
import UserImport from '../interfaces/web/Admin/User/Import'
import UserInSessionList from '../interfaces/web/Admin/User/InSession'
import UserList from '../interfaces/web/Admin/User/List'
import { IndicatorsMonitoring } from '../interfaces/web/Dashboard/IndicatorMonitoring'
import IndicatorsEst from '../interfaces/web/Dashboard/IndicatorsEst'
import AllTA from '../interfaces/web/Transparency/Active/All'
import ActiveCreate from '../interfaces/web/Transparency/Active/Create'
import ActiveEdit from '../interfaces/web/Transparency/Active/Edit'
import ActiveNumerals from '../interfaces/web/Transparency/Active/Numerals'
import ActivePreviewData from '../interfaces/web/Transparency/Active/PreviewData'
import AllPublications from '../interfaces/web/Transparency/AllPublications'
import AllTC from '../interfaces/web/Transparency/Collaborative/All'
import CollaborativeCreate from '../interfaces/web/Transparency/Collaborative/Create'
import CollaborativeEdit from '../interfaces/web/Transparency/Collaborative/Edit'
import CollaborativeList from '../interfaces/web/Transparency/Collaborative/List'
import AllTF from '../interfaces/web/Transparency/Focalized/All'
import FocalizedCreate from '../interfaces/web/Transparency/Focalized/Create'
import FocalizedEdit from '../interfaces/web/Transparency/Focalized/Edit'
import FocalizedList from '../interfaces/web/Transparency/Focalized/List'
import VerPerfil from '../interfaces/web/Transparency/Perfil'
import Reports from '../interfaces/web/Transparency/Reports'
import AllMonitorSolicities from '../interfaces/web/Transparency/Solicity/All'
import SolicityCreate from '../interfaces/web/Transparency/Solicity/Create'
import SolicityDetail from '../interfaces/web/Transparency/Solicity/Detail'
import SolicityEdit from '../interfaces/web/Transparency/Solicity/Edit'
import SolicityList from '../interfaces/web/Transparency/Solicity/List'
import SolicityListEstablishment from '../interfaces/web/Transparency/Solicity/ListEstablishment'
import SolicityManual from '../interfaces/web/Transparency/Solicity/Manual'
import SolicityOnHold from '../interfaces/web/Transparency/Solicity/OnHold'
import SolicityResponse from '../interfaces/web/Transparency/Solicity/Response'

export interface MenuItem {
  name: string
  path: string
  permission_required: string
  icon: JSX.Element
  visible: boolean
  visible_for_superadmin?: boolean
}

const menu = [
  {
    name: 'Indicadores',
    path: '/admin',
    visible: true,
    icon: <BiPieChart size={25} className="text-slate-500" />,
    permission_required: '',
    element: <IndicatorsEst />
  },
  {
    name: 'Indicadores Por Entidad',
    path: '/admin/indicators',
    visible: true,
    icon: <BiPieChart size={25} className="text-slate-500" />,
    permission_required: 'view_monitoring_indicators',
    element: <IndicatorsMonitoring />
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
    permission_required: 'view_user_establishment',
    visible: true,
    icon: <RiUser3Line size={25} className="text-slate-500" />,
    element: <UserInSessionList />,
    visible_for_superadmin: false
  },
  {
    name: 'Crear Usuario',
    path: '/admin/est/users/create',
    permission_required: 'add_user_establishment',
    visible: false,
    icon: <RiUser3Line size={25} className="text-slate-500" />,
    element: <UserCreate />
  },

  {
    name: 'Editar Usuario',
    path: '/admin/est/users/:id',
    visible: false,
    permission_required: 'update_user_establishment',
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
    permission_required: 'view_establishment',
    element: <EstablishmentList />
  },
  {
    name: 'Crear Institución',
    path: '/admin/entities/create',
    visible: false,
    icon: <RiBuilding4Line size={25} className="text-slate-500" />,
    permission_required: 'add_establishment',
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
    permission_required: 'view_pedagogyarea',
    element: <PedagodyAreaCreate />
  },
  {
    name: 'Configuración SMTP',
    path: '/admin/smtp',
    visible: true,
    icon: <RiMailSettingsLine size={25} className="text-slate-500" />,
    permission_required: 'view_configuration',
    element: <SmtpCreate />
  },
  {
    name: ' T.Activa ',
    path: '/admin/transparency/active',
    visible: true,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: 'view_transparencyactive',
    element: <ActiveNumerals />,
    visible_for_superadmin: false
  },
  {
    name: 'T.Activa',
    path: '/admin/active/all',
    visible: true,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: 'view_all_transparencyactive',
    element: <AllTA />,
    visible_for_superadmin: false
  },
  {
    name: 'Crear T.Activa',
    path: '/admin/active/create',
    visible: false,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: 'add_transparencyactive',
    element: <ActiveCreate />,
    visible_for_superadmin: false
  },
  {
    name: 'Editar T.Activa',
    path: '/admin/active/edit',
    visible: false,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: 'change_transparencyactive',
    element: <ActiveEdit />
  },

  {
    name: 'Vista T.Activa',
    path: '/admin/active/previewdata',
    visible: false,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: 'view_transparencyactive',
    element: <ActivePreviewData />,
    visible_for_superadmin: false
  },

  {
    name: 'T.Focalizada',
    path: '/admin/transparency/focalized',
    visible: true,
    icon: <RiCheckboxMultipleLine size={25} className="text-slate-500" />,
    permission_required: 'view_transparencyfocal',
    element: <FocalizedList />,
    visible_for_superadmin: false
  },
  {
    name: 'T.Focalizada',
    path: '/admin/focalized/all',
    visible: true,
    icon: <RiCheckboxMultipleLine size={25} className="text-slate-500" />,
    permission_required: 'view_all_transparencyfocal',
    element: <AllTF />,
    visible_for_superadmin: false
  },
  {
    name: 'T.Focalizada',
    path: '/admin/focalized/create',
    visible: false,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: 'add_transparencyfocal',
    element: <FocalizedCreate />,
    visible_for_superadmin: false
  },
  {
    name: 'T.Focalizada',
    path: '/admin/focalized/Edit',
    visible: false,
    icon: <HiOutlineChartSquareBar size={25} className="text-slate-500" />,
    permission_required: 'change_transparencyfocal',
    element: <FocalizedEdit />
  },
  {
    name: 'T.Colaborativa',
    path: '/admin/transparency/collaborative',
    visible: true,
    icon: <RiCheckFill size={25} className="text-slate-500" />,
    permission_required: 'view_transparencycolab',
    element: <CollaborativeList />,
    visible_for_superadmin: false
  },
  {
    name: 'T.Colaborativa',
    path: '/admin/collaborative/create',
    visible: false,
    icon: <RiCheckFill size={25} className="text-slate-500" />,
    permission_required: 'add_transparencycollab',
    element: <CollaborativeCreate />,
    visible_for_superadmin: false
  },
  {
    name: 'T.Colaborativa',
    path: '/admin/collaborative/all',
    visible: true,
    icon: <RiCheckFill size={25} className="text-slate-500" />,
    permission_required: 'view_all_transparencycollab',
    element: <AllTC />,
    visible_for_superadmin: false
  },
  {
    name: 'T.Colaborativa',
    path: '/admin/collaborative/Edit',
    visible: false,
    icon: <RiCheckFill size={25} className="text-slate-500" />,
    permission_required: 'view_transparencyactive',
    element: <CollaborativeEdit />
  },

  {
    name: 'Solicitudes',
    path: '/admin/solicity',
    visible: true,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: 'view_solicity',
    element: <SolicityList />,
    visible_for_superadmin: false
  },

  {
    name: 'Solicitudes',
    path: '/admin/solicity/all',
    visible: true,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: 'view_all_solicities',
    element: <AllMonitorSolicities />,
    visible_for_superadmin: false
  },

  {
    name: 'Solicitudes',
    path: '/admin/establishment/solicity',
    visible: true,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: 'view_solicityresponse',
    element: <SolicityListEstablishment />,
    visible_for_superadmin: false
  },
  {
    name: ' Crear Solicitudes',
    path: '/admin/solicity/create',
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: 'add_solicity',
    element: <SolicityCreate />
  },
  {
    name: ' Crear Solicitudes',
    path: '/admin/solicity/create/manual',
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: 'add_manual_solicity',
    element: <SolicityManual />
  },
  {
    name: ' Editar Solicitudes',
    path: '/admin/solicity/edit/:id',
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: 'change_solicity',
    element: <SolicityEdit />
  },

  {
    name: ' Responder Solicitudes',
    path: '/admin/solicity/response/citizen',
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: 'view_solicity',
    element: <SolicityResponse />
  },
  {
    name: ' Responder Solicitudes',
    path: '/admin/solicity/response',
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: 'view_solicityresponse,view_solicity,view_all_solicities',

    element: <SolicityResponse />
  },
  {
    name: ' Prórroga',
    path: '/admin/solicity/onhold',
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: 'add_solicityresponse',
    element: <SolicityOnHold />
  },
  {
    name: ' Detalles de Solicitud',
    path: '/admin/solicity/detail',
    visible: false,
    icon: <RiMailCheckLine size={25} className="text-slate-500" />,
    permission_required: 'view_solicityresponse,view_solicity,view_all_solicities',
    element: <SolicityDetail />
  },
  {
    name: 'Reportes',
    path: '/admin/reports',
    visible: true,
    icon: <RiFileExcel2Line size={25} className="text-slate-500" />,
    permission_required: 'view_solicityresponse',
    element: <Reports />,
    visible_for_superadmin: false
  },
  {
    name: 'Publicaciones T. Activa',
    path: '/admin/publicaciones',
    visible: true,
    icon: <FaTable size={25} className="text-slate-500" />,
    permission_required: 'view_transparencyactive',
    element: <AllPublications />,
    visible_for_superadmin: false
  },
  {
    name: 'Perfil',
    path: '/admin/perfil',
    visible: true,
    icon: <FaRegUser size={25} className="text-slate-500" />,
    permission_required: '',
    element: <VerPerfil />,
    visible_for_superadmin: false
  }
]

export default menu
