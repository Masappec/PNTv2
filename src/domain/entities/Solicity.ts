import { StatusSolicity } from "../../utils/enums";
import BaseEntity from "./BaseEntity";
import { AttachmentEntity, FilePublicationEntity } from "./PublicationEntity";
import { SolicityResultEntity } from "./SolicityResultEntity";

export class PartialTimelineSolicty {

    constructor(
        public status: string,
        public created_at: string
    ) { }

}

export class TimeLinePresenter {

    constructor(
        public user_id: number,
        public created_at: string,
        public text: string,
        public files: FilePublicationEntity[],
        public attachments: AttachmentEntity[],
        public type: 'RESPONSE' | 'INSISTENCY' | 'COMMENT',
        public title: string,
        public other_title: string
    ) { }
}

export class Insistency {

    constructor(
        public id: number,
        public created_at: string,
        public updated_at: string,
        public deleted: boolean,
        public deleted_at: string,
        public ip: string,
        public status: string,
        public expiry_date: string,
        public motive: string,
        public user_created: number,
        public user_updated: number,
        public user_deleted: number,
        public solicity: number,
        public user: number
    ) { }

}


export class Comments {

    constructor(
        public id: number,
        public created_at: string,
        public updated_at: string,
        public deleted: boolean,
        public deleted_at: string,
        public ip: string,
        public motive: string,
        public user: number,
        public solicity: number,
        public files: FilePublicationEntity[],
        public attachments: number[]
    ) { }

}
export class Solicity extends BaseEntity {


    constructor(
        public id: number,
        public created_at: string,
        public updated_at: string,
        public deleted: boolean,
        public deleted_at: string,
        public ip: string,
        public number_saip: string,
        public date: string,
        public city: string,
        public text: string,
        public is_active: boolean,
        public status: string,
        public expiry_date: string,
        public have_extension: boolean,
        public is_manual: boolean,
        public first_name: string,
        public last_name: string,
        public email: string,
        public race_identification: string,
        public gender: string,
        public address: string,
        public phone: string,
        public format_send: string,
        public format_receipt: string,
        public user_created: string,
        public user_updated: string,
        public user_deleted: string,
        public establishment: number,
        public timeline: PartialTimelineSolicty[],
        public estblishment_name?: string,
        public responses?: SolicityResultEntity[],
        public insistency?: Insistency[],
        public comments?: Comments[]

    ) {
        super(
            new Date(created_at),
            new Date(updated_at),
            deleted,
            new Date(deleted_at),
            ip,
            user_created + "",
            user_updated + "",
            user_deleted + ""
        );
    }



    static ordernReponse(solicity: Solicity) {

        const list: TimeLinePresenter[] = []


        solicity.responses?.forEach(r => {
            list.push(new TimeLinePresenter(
                r.user.id, r.created_at, r.text, r.files, r.attachments, "RESPONSE",
                "Respuesta de la entidad", 'Respuesta de la entidad'))
        })

        solicity.insistency?.forEach(i => {
            if (i.status == StatusSolicity.INFORMAL_MANAGMENT_SEND.key) {

                list.push(new TimeLinePresenter(i.user_created, i.created_at, i.motive, [], [],
                    "INSISTENCY", "Solicitud de Gestión Oficiosa Enviada", 'Gestión Oficiosa'))
            } else {

                list.push(new TimeLinePresenter(i.user_created, i.created_at, i.motive, [], [],
                    "INSISTENCY", "Solicitud de Insistencia Enviada", 'Insistencia del ciudadano'))
            }
        })

        solicity.comments?.forEach(c => {
            //const fileEntities: FilePublicationEntity[] = c.files.map(id => new FilePublicationEntity(
            //    id,                     // ID del archivo
            //    `File Name ${id}`,      // Nombre ficticio
            //    `Description ${id}`,    // Descripción ficticia
            //    `https://example.com/files/${id}`, // URL ficticia
            //    undefined               // Fecha opcional
            //));
            list.push(new TimeLinePresenter(c.user, c.created_at, c.motive, c.files, [],
                "COMMENT", "Motivo de Insistencia", 'Motivo de Prórroga'))
        })



        return list.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    }

}