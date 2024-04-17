import { FaCheck, FaClock, FaEye, FaSave, FaStopCircle } from "react-icons/fa";


export const StatusSolicity = {
    CREATED: {
        value: 'Creada',
        key: 'CREATED',
        bg: 'info',
        icon: <FaSave />
    },
    DRAFT: {
        value: 'Borrador',
        key: 'SEND',
        bg: 'info',
        icon: <FaSave />
    },

    SEND: {
        value: 'Enviada',
        key: 'SEND',
        bg: 'success',
        icon: <FaCheck />
    },

    PENDING: {
        value: 'Pendiente',
        key: 'PENDING',
        bg: 'info',
        icon: <FaClock />
    },

    READING: {
        value: 'Leída',
        key: 'READING',
        bg: 'info',
        icon: <FaEye />
    },

    PROCESSING: {
        value: 'En proceso',
        key: 'PROCESSING',
        bg: 'info',
        icon: <FaClock />
    },

    FINISHED: {
        value: 'Finalizada',
        key: 'FINISHED',
        bg: 'info',
        icon: <FaStopCircle />
    }

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
        icon: <FaClock />
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