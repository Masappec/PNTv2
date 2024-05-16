import { FaCheck, FaClock, FaSave } from "react-icons/fa";

/*class Status(models.TextChoices):
    DRAFT = 'DRAFT', 'BORRADOR'
    SEND = 'SEND', 'ENVIADO'
    RESPONSED = 'RESPONSED', 'RESPONDIDA'
    NO_RESPONSED = 'NO_RESPONSED', 'NO RESPONDIDA'
    INSISTENCY_PERIOD = 'INSISTENCY_PERIOD', 'PERIODO DE INSISTENCIA'
    INSISTENCY_SEND = 'INSISTENCY_SEND', 'INSISTENCIA ENVIADA'
    INSISTENCY_RESPONSED = 'INSISTENCY_RESPONSED', 'INSISTENCIA RESPONDIDA'
    INSISTENCY_NO_RESPONSED = 'INSISTENCY_NO_RESPONSED', 'INSISTENCIA NO RESPONDIDA'
    PERIOD_INFORMAL_MANAGEMENT = 'PERIOD_INFORMAL_MANAGEMENT', 'PERIODO DE GESTIÓN OFICIOSA'
    INFORMAL_MANAGMENT_SEND = 'INFORMAL_MANAGMENT_SEND', 'GESTIÓN OFICIOSA ENVIADA'
    INFORMAL_MANAGMENT_RESPONSED = 'INFORMAL_MANAGMENT_RESPONSED', 'GESTIÓN OFICIOSA RESPONDIDA'
    INFORMAL_MANAGMENT_NO_RESPONSED = 'INFORMAL_MANAGMENT_NO_RESPONSED', 'GESTIÓN OFICIOSA NO RESPONDIDA'
    FINISHED_WITHOUT_RESPONSE = 'FINISHED_WITHOUT_RESPONSE', 'FINALIZADO SIN RESPUESTA'
    FINISHED = 'FINISHED', 'FINALIZADO'
*/
export const StatusSolicity = {

    DRAFT: {
        value: 'Borrador',
        key: 'DRAFT',
        bg: 'info',
        icon: <FaSave />,
        value_2: 'Borrador',
    },
    SEND: {
        value: 'Enviado',
        key: 'SEND',
        bg: 'info',
        icon: <FaSave />,
        value_2: 'Recibido'
    },
    RESPONSED: {
        value: 'Respondida',
        key: 'RESPONSED',
        bg: 'success',
        icon: <FaCheck />,
        value_2: 'Respondido'
    },
    NO_RESPONSED: {
        value: 'No respondida',
        key: 'NO_RESPONSED',
        bg: 'info',
        icon: <FaClock />,
        value_2: 'No respondido'
    },
    INSISTENCY_PERIOD: {
        value: 'Periodo de insistencia',
        key: 'INSISTENCY_PERIOD',
        bg: 'info',
        icon: <FaClock />,
        value_2: 'Periodo de insistencia'
    },
    INSISTENCY_SEND: {
        value: 'Insistencia enviada',
        key: 'INSISTENCY_SEND',
        bg: 'info',
        icon: <FaCheck />,
        value_2: 'Insistencia Recibida'
    },
    INSISTENCY_RESPONSED: {
        value: 'Insistencia respondida',
        key: 'INSISTENCY_RESPONSED',
        bg: 'info',
        icon: <FaCheck />,
        value_2: 'Insistencia respondida'
    },
    INSISTENCY_NO_RESPONSED: {
        value: 'Insistencia no respondida',
        key: 'INSISTENCY_NO_RESPONSED',
        bg: 'info',
        icon: <FaClock />,
        value_2: 'Insistencia no respondida'
    },
    PERIOD_INFORMAL_MANAGEMENT: {
        value: 'Periodo de gestión oficiosa',
        key: 'PERIOD_INFORMAL_MANAGEMENT',
        bg: 'info',
        icon: <FaClock />,
        value_2: 'Periodo de gestión oficiosa'
    },
    INFORMAL_MANAGMENT_SEND: {
        value: 'Gestión oficiosa enviada',
        key: 'INFORMAL_MANAGMENT_SEND',
        bg: 'info',
        icon: <FaClock />,
        value_2: 'Gestión oficiosa Recibida'
    },

    INFORMAL_MANAGMENT_RESPONSED: {
        value: 'Gestión oficiosa respondida',
        key: 'INFORMAL_MANAGMENT_RESPONSED',
        bg: 'info',
        icon: <FaClock />,
        value_2: 'Gestión oficiosa respondida'


    },
    INFORMAL_MANAGMENT_NO_RESPONSED: {
        value: 'Gestión oficiosa no respondida',
        key: 'INFORMAL_MANAGMENT_NO_RESPONSED',
        bg: 'info',
        icon: <FaClock />,
        value_2: 'Gestión oficiosa no respondida'
    },

    FINISHED_WITHOUT_RESPONSE: {
        value: 'Finalizado sin respuesta',
        key: 'FINISHED_WITHOUT_RESPONSE',
        bg: 'info',
        icon: <FaClock />,
        value_2: 'Finalizado sin respuesta'
    },



}


export enum StatusSolicityEnum {
    CREATED = 'CREATED',
    DRAFT = 'DRAFT',
    SEND = 'SEND',
    PENDING = 'PENDING',
    READING = 'READING',
    PROCESSING = 'PROCESSING',
    FINISHED = 'FINISHED'
}


export const enum StageSolicity {
    SEND = 'SEND',
    PENDING = 'PENDING',
    RESPONSE = 'RESPONSE',
    INSISTENCY = 'INSISTENCY',
    PENDING_RESPONSE_INSISTENCY = 'PENDING_RESPONSE_INSISTENCY',
    RESPONSE_INSISTENCY = 'RESPONSE_INSISTENCY',
    INFORMAL_MANAGEMENT = 'INFORMAL_MANAGEMENT'
}

export const StatusStageSolicity = {
    SEND: {
        value: 'Enviado',
        key: 'SEND',
        bg: 'info',
        icon: <FaSave />
    },
    PENDING: {
        value: 'Pendiente',
        key: 'PENDING',
        bg: 'info',
        icon: <FaClock />
    },
    RESPONSE: {
        value: 'Respuesta',
        key: 'RESPONSE',
        bg: 'success',
        icon: <FaCheck />
    },
    INSISTENCY: {
        value: 'Insistencia',
        key: 'INSISTENCY',
        bg: 'info',
        icon: <FaCheck className="text-primary-500" />
    },
    PENDING_RESPONSE_INSISTENCY: {
        value: 'Pendiente respuesta insistencia',
        key: 'PENDING_RESPONSE_INSISTENCY',
        bg: 'info',
        icon: <FaClock />
    },
    RESPONSE_INSISTENCY: {
        value: 'Respuesta insistencia',
        key: 'RESPONSE_INSISTENCY',
        bg: 'info',
        icon: <FaClock />
    },
    INFORMAL_MANAGEMENT: {
        value: 'Gestión oficiosa',
        key: 'INFORMAL_MANAGEMENT',
        bg: 'info',
        icon: <FaClock />
    }
}



export const permissionsProcess = {
    'configuration': 'Configuración SMTP',
    'establishment': 'Instituciones',
    'pedagogyarea': 'Áreas de pedagogía',
    'group': 'Roles',
    'solicity': 'Solicitudes',
    'solicityresponse': 'Solicitudes Entidad',
    'transparencyactive': 'Transparencia activa',
    'transparencycolab': 'Transparencia colaborativa',
    'transparencyfocal': 'Transparencia focalizada',
}


export const getTranslatedPermissions = (type: string) => {
    return permissionsProcess[type as keyof typeof permissionsProcess] ?? type
}