
class PermissionEntity{

    public id: number;
    public name: string;
    public codename: string;
    public content_type: string;
    constructor(
         id: number,
         name: string,
         codename: string,
        content_type: string
    ){
        this.id = id;
        this.name = name;
        this.codename = codename;
        this.content_type = content_type;
    }
    
}

export default PermissionEntity;


export const AllPermissions: { type: string, list: PermissionEntity[] }[] = [
    {
        type: 'Instituciones',
        list: [
            {
                codename: 'add_establishment',
                content_type: 'Instituciones',
                name: 'Crear',
                id: 14
            },
            {
                codename: 'view_establishment',
                content_type: 'Instituciones',
                name: 'Ver',
                id: 15
            },
            {
                codename: 'change_establishment',
                content_type: 'Instituciones',
                name: 'Editar',
                id: 16
            },
            {
                codename: 'delete_establishment',
                content_type: 'Instituciones',
                name: 'Eliminar',
                id: 17
            }
        ]
    },
    {
        type: 'Mi Institución',
        list: [
            {
                codename: 'view_establishment_internal',
                content_type: 'Instituciones',
                name: 'Ver Información de Mi Institución',
                id: 18
            },
            {
                codename: 'update_establishment_internal',
                content_type: 'Instituciones',
                name: 'Actualizar Información de Mi Institución',
                id: 19
            }
        ]
    },
    {
        type: 'Usuarios General',
        list: [
            {
                codename: 'add_user',
                name: 'Crear usuario',
                content_type: 'Usuarios',
                id: 1
            },
            {
                codename: 'change_user',
                name: 'Editar usuario',
                content_type: 'Usuarios',
                id: 2
            },
            {
                codename: 'delete_user',
                name: 'Eliminar usuario',
                content_type: 'Usuarios',
                id: 3
            },
            {
                codename: 'view_user',
                name: 'Ver Todos Los usuarios',
                content_type: 'Usuarios',
                id: 4
            },

        ]
    },
    {
        type: 'Usuarios de Entidad  (De la Entidad a la que pertenece)',
        list: [
            {
                codename: 'view_user_establishment',
                name: 'Ver Usuarios de mi Institución',
                content_type: 'Usuarios',
                id: 5
            },
            {
                codename: 'add_user_establishment',
                name: 'Crear Usuario de mi Institución',
                content_type: 'Usuarios',
                id: 7
            },
            {
                codename: 'update_user_establishment',
                name: 'Editar Usuario de mi Institución',
                content_type: 'Usuarios',
                id: 8
            },
            {
                codename: 'delete_user_establishment',
                name: 'Eliminar Usuario de mi Institución',
                content_type: 'Usuarios',
                id: 9
            }
        ]
    },
    {
        type: 'Roles Generales',
        list: [
            {
                codename: 'add_role',
                name: 'Crear Nuevo Rol',
                content_type: 'Roles',
                id: 6
            },
            {
                codename: 'change_role',
                name: 'Editar Rol',
                content_type: 'Roles',
                id: 7
            },
            {
                codename: 'delete_role',
                name: 'Eliminar Rol',
                content_type: 'Roles',
                id: 8
            },
            {
                codename: 'view_role',
                name: 'Ver Todos Los Roles',
                content_type: 'Roles',
                id: 9
            }
        ]
    },
    {
        type: 'Crear Usuarios Con Roles Predefinidos',
        list: [
            {
                codename:'add_user_carga_pnt',
                content_type: 'Usuarios',
                name: 'Crear Usuario de Carga',
                id: 10
            },
            {
                codename: 'add_user_ciudadano',
                content_type: 'Usuarios',
                name: 'Crear Usuario Ciudadano',
                id: 11
            },
            {
                codename: 'add_user_admin',
                content_type: 'Usuarios',
                name: 'Crear Usuario Monitoreo DPE',
                id: 12
            },
            {
                codename: 'add_user_supervisora_pnt',
                content_type: 'Usuarios',
                name: 'Crear Usuario Establecimiento',
                id: 13
            }

        ]
    },
    
    {
        type: 'Solicitudes (Ciudadano)',
        list:[
            {
                codename:'add_solicity',
                content_type: 'Solicitudes',
                name: 'Crear SAIP',
                id: 14
            },
            {
                codename:'view_solicity',
                content_type: 'Solicitudes',
                name: 'Ver SAIP',
                id: 15
            }
        ]
    },
    {
        type: 'Solicitudes (Entidad)',
        list:[
            {
                codename:'add_solicityresponse',
                content_type: 'Solicitudes',
                name: 'Responder SAIP',
                id: 16
            },
            {
                codename:'view_solicityresponse',
                content_type: 'Solicitudes',
                name: 'Ver Lista de SAIP',
                id: 17
            },
            {
                codename:'add_manual_solicity',
                content_type: 'Solicitudes',
                name: 'Crear SAIP Manual',
                id: 18
            }
        ]
    },
    {
        type: 'Solicitudes General',
        list:[
            {
                codename:'view_all_solicities',
                content_type: 'Solicitudes',
                name: 'Ver Todas las SAIP de las Entidades',
                id: 19
            }
        ]
    },
    {
        type: 'Transparencia Activa',
        list:[
            {
                codename:'add_transparencyactive',
                content_type: 'Transparencia Activa',
                name: 'Crear Transparencia Activa',
                id: 20
            },
            {
                codename: 'view_transparencyactive',
                content_type: 'Transparencia Activa',
                name: 'Ver Transparencia Activa',
                id: 21
            },
            {
                codename:'change_transparencyactive',
                content_type: 'Transparencia Activa',
                name: 'Editar Transparencia Activa',
                id: 22
            },
            {
                codename:'view_all_transparencyactive',
                content_type: 'Transparencia Activa',
                name: 'Ver T.A de todas las entidades',
                id: 23
            },
            {
                codename: 'approve_numeral_ta',
                content_type: 'Transparencia Activa',
                name: 'Aprobar Numerales Transparencia Activa',
                id: 24
            }
        ]
    },
    {
        type: 'Transparencia Colaborativa',
        list:[
            {
                codename:'view_transparencycolab',
                content_type: 'Transparencia Colaborativa',
                name: 'Ver Transparencia Colaborativa',
                id: 23
            },
            {
                codename:'add_transparencycolab',
                content_type: 'Transparencia Colaborativa',
                name: 'Crear Transparencia Colaborativa',
                id: 24
            },
            {
                codename:'change_transparencycolab',
                content_type: 'Transparencia Colaborativa',
                id: 25,
                name: 'Actualizar Transparencia Colaborativa'
            },
            {
                codename:'view_all_transparencycollab',
                content_type: 'Transparencia Colaborativa',
                name: 'Ver T.C de todas las entidades',
                id: 26
            },
            {
                codename: 'approve_numeral_tc',
                content_type: 'Transparencia Colaborativa',
                name: 'Aprobar Numerales Transparencia Colaborativa',
                id: 24
            }
        ]
    },
    {
        type: 'Transparencia Focalizada',
        list:[
            {
                codename:'add_transparencyfocal',
                content_type: 'Transparencia Focalizada',
                name: 'Crear Transparencia Focalizada',
                id: 26
            },
            {
                codename:'view_transparencyfocal',
                content_type: 'Transparencia Focalizada',
                name: 'Ver Transparencia Focalizada',
                id: 27
            },
            {
                codename:'change_transparencyfocal',
                content_type: 'Transparencia Focalizada',
                id: 28,
                name: 'Actualizar Transparencia Focalizada'
            },
            {
                codename:'view_all_transparencyfocal',
                content_type: 'Transparencia Focalizada',
                id: 29,
                name: 'Ver T.F de todas las entidades'
            },
            {
                codename: 'approve_numeral_tf',
                content_type: 'Transparencia Colaborativa',
                name: 'Aprobar Numerales Transparencia Focalizada',
                id: 24
            }
        ]
    },
    {
        type: 'Informe Anual (De la Entidad a la que pertenece)',
        list:[
            {
                codename:'add_anualreport',
                content_type: 'Informe Anual',
                name: 'Crear Informe Anual',
                id: 71
            }
        ]
    },
    {
        type:'Reportes (De la Entidad a la que pertenece)',
        list:[
            {
                codename:'view_all_compliancestatus',
                content_type: 'Reportes',
                name: 'Ver Estado de Cumplimiento',
                id: 30
            }
        ]
    },
    {
        type:'Indicadores',
        
        list:[
            {
            codename:'view_general_indicators',
            content_type: 'Indicadores',
            name: 'Ver Indicadores Generales Ciudadano',
            id: 31
            },
            {
            codename:'view_entity_indicators',
            content_type: 'Indicadores',
            name: 'Ver Indicadores de Entidad',
            id: 32
            },
            {
            codename:'view_monitoring_indicators',
            content_type: 'Indicadores',
            name: 'Ver Indicadores de Monitoreo',
            id: 33
            }
        ]
    },
    {
        type:'Configuración SMTP',
        list:[
            {
                codename:'view_configuration',
                content_type: 'Configuración SMTP',
                name: 'Ver Configuración SMTP',
                id: 34
            },
            {
                codename:'change_configuration',
                content_type: 'Configuración SMTP',
                name: 'Configurar SMTP',
                id: 35
            }
        ]
    },
    {
        type:'Área Pedagógica',
        list:[
            {
                codename:'add_pedagogyarea',
                content_type: 'Área Pedagógica',
                name: 'Configurar Área Pedagógica',
                id: 36
            },
        ]
    }
    
]