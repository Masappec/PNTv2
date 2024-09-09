import { FaCheck, FaSave } from "react-icons/fa";

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
/*
Solicitud enviada



Se cumplió el plazo que la Institución tenía para responder y no se recibió.



Solicitud de insistencia enviada.



Se cumplió el plazo que la Institución tenía para responder insistencia y solicitud, y no respondió.


Solicitud de Gestión Oficiosa enviada a la Defensoría del Pueblo (DPE). Proceso concluido en el Portal. El seguimiento posterior a esta etapa debe realizarse directamente con la DPE.

Quitar el estado de Gestión oficiosa no respondida. El proceso terminaría en el paso anterior. Se va a mostrar el proceso que debe seguir el usuario posterior a esta etapa (Básicamente un enlace a otro sitio web).
*/
export const StatusSolicity = {

    DRAFT: {
        value: 'Borrador',
        key: 'DRAFT',
        bg: 'bg-gray-500',
        icon: <FaSave />,
        value_2: 'Borrador',
        text: 'Borrador'
    },
    SEND: {
        value: 'Enviado',
        key: 'SEND',
        bg: 'bg-primary-500',
        icon: <FaSave />,
        value_2: 'Recibido',
        text: 'Solicitud enviada'
    },
    RESPONSED: {
        value: 'Respondida',
        key: 'RESPONSED',
        bg: 'bg-custom-green',
        icon: <FaCheck className="text-primary-500 text-center" />,
        value_2: 'Respondido',
        text: 'Respondido'
    },
    NO_RESPONSED: {
        value: 'No respondida',
        key: 'NO_RESPONSED',
        bg: 'bg-red-500',
        icon: <FaCheck className="text-primary-500 text-center" />,
        value_2: 'No respondida',
        text: 'Se cumplió el plazo que la Institución tenía para responder y no se recibió.'
    },
    INSISTENCY_PERIOD: {
        value: 'Periodo de insistencia',
        key: 'INSISTENCY_PERIOD',
        bg: 'bg-yellow-500',
        icon: <FaCheck className="text-primary-500 text-center" />,
        value_2: 'Periodo de insistencia',
        text: 'Periodo de insistencia'
    },
    INSISTENCY_SEND: {
        value: 'Insistencia enviada',
        key: 'INSISTENCY_SEND',
        bg: 'bg-yellow-600',
        icon: <FaCheck className="text-primary-500 text-center" />,
        value_2: 'Insistencia Recibida',
        text: 'Insistencia enviada'
    },
    INSISTENCY_RESPONSED: {
        value: 'Insistencia respondida',
        key: 'INSISTENCY_RESPONSED',
        bg: 'bg-custom-green',
        icon: <FaCheck className="text-primary-500 text-center" />,
        value_2: 'Insistencia respondida',
        text: 'Insistencia respondida'
    },
    INSISTENCY_NO_RESPONSED: {
        value: 'Insistencia no respondida',
        key: 'INSISTENCY_NO_RESPONSED',
        bg: 'bg-red-700',
        icon: <FaCheck className="text-primary-500 text-center" />,
        value_2: 'Insistencia no respondida',
        text: 'Se cumplió el plazo que la Institución tenía para responder insistencia y solicitud, y no respondió.'
    },
    PERIOD_INFORMAL_MANAGEMENT: {
        value: 'Periodo de gestión oficiosa',
        key: 'PERIOD_INFORMAL_MANAGEMENT',
        bg: 'bg-yellow-500',
        icon: <FaCheck className="text-primary-500 text-center" />,
        value_2: 'Periodo de gestión oficiosa',
        text: 'Periodo de gestión oficiosa'
    },
    INFORMAL_MANAGMENT_SEND: {
        value: 'Gestión oficiosa enviada',
        key: 'INFORMAL_MANAGMENT_SEND',
        bg: 'bg-yellow-600',
        icon: <FaCheck className="text-primary-500 text-center" />,
        value_2: 'Gestión oficiosa Recibida',
        text: 'Gestión oficiosa enviada'
    },

    INFORMAL_MANAGMENT_RESPONSED: {
        value: 'Gestión oficiosa respondida',
        key: 'INFORMAL_MANAGMENT_RESPONSED',
        bg: 'bg-custom-green',
        icon: <FaCheck className="text-primary-500 text-center" />,
        value_2: 'Gestión oficiosa respondida',
        text: 'Solicitud de Gestión Oficiosa enviada a la Defensoría del Pueblo (DPE). Proceso concluido en el Portal. El seguimiento posterior a esta etapa debe realizarse directamente con la DPE.'


    },
    INFORMAL_MANAGMENT_NO_RESPONSED: {
        value: 'Gestión oficiosa no respondida',
        key: 'INFORMAL_MANAGMENT_NO_RESPONSED',
        bg: 'bg-red-700',
        icon: <FaCheck className="text-primary-500 text-center" />,
        value_2: 'Gestión oficiosa no respondida',
        text: 'El proceso que debe seguir el usuario posterior a esta etapa (Básicamente un enlace a otro sitio web).'
    },

    FINISHED_WITHOUT_RESPONSE: {
        value: 'Finalizado sin respuesta',
        key: 'FINISHED_WITHOUT_RESPONSE',
        bg: 'bg-red-700',
        icon: <FaCheck className="text-primary-500 text-center" />,
        value_2: 'Finalizado sin respuesta',
        text: 'Finalizado sin respuesta'
    },

    PRORROGA: {
        value: 'Prórroga',
        key: 'PRORROGA',
        bg: 'bg-yellow-700',
        icon: <FaCheck className="text-primary-500 text-center" />,
        value_2: 'Prórroga',
        text: 'Prórroga'
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
        icon: <FaCheck className="text-primary-500 text-center" />
    },
    RESPONSE: {
        value: 'Respuesta',
        key: 'RESPONSE',
        bg: 'success',
        icon: <FaCheck className="text-primary-500 text-center" />
    },
    INSISTENCY: {
        value: 'Insistencia',
        key: 'INSISTENCY',
        bg: 'info',
        icon: <FaCheck className="text-primary-500 text-center" />
    },
    PENDING_RESPONSE_INSISTENCY: {
        value: 'Pendiente respuesta insistencia',
        key: 'PENDING_RESPONSE_INSISTENCY',
        bg: 'info',
        icon: <FaCheck className="text-primary-500 text-center" />
    },
    RESPONSE_INSISTENCY: {
        value: 'Respuesta insistencia',
        key: 'RESPONSE_INSISTENCY',
        bg: 'info',
        icon: <FaCheck className="text-primary-500 text-center" />
    },
    INFORMAL_MANAGEMENT: {
        value: 'Gestión oficiosa',
        key: 'INFORMAL_MANAGEMENT',
        bg: 'info',
        icon: <FaCheck className="text-primary-500 text-center" />
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