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
/*{
    "id": 230,
    "estblishment_name": "Vicepresidencia De La República Del Ecuador",
    "time_line": [
        {
            "status": "SEND",
            "created_at": "2024-04-24T13:53:17.475949Z"
        },
        {
            "status": "RESPONSED",
            "created_at": "2024-04-24T13:53:50.007838Z"
        },
        {
            "status": "INSISTENCY_SEND",
            "created_at": "2024-04-24T15:23:43.923541Z"
        }
    ],
    "responses": [
        {
            "id": 802,
            "files": [
                {
                    "id": 114,
                    "name": "asdsad",
                    "description": "sadasd",
                    "url_download": "/media/publications/Copia-de-LOGO-FCD-_2__v83wC5F.png"
                }
            ],
            "attachments": [],
            "user": {
                "id": 210,
                "first_name": "ANDERSON JAVIER",
                "last_name": "SINALUISA TOBAR",
                "email": "anderson5@gmail.com"
            },
            "created_at": "2024-04-24T13:53:50.013885Z",
            "updated_at": "2024-04-24T13:53:50.013922Z",
            "deleted": false,
            "deleted_at": null,
            "ip": null,
            "text": "asdasdasdasdsad",
            "is_active": true,
            "user_created": 210,
            "user_updated": 210,
            "user_deleted": null,
            "solicity": 230
        }
    ],
    "comments": [],
    "insistency": [
        {
            "id": 1,
            "created_at": "2024-04-24T15:23:43.822968Z",
            "updated_at": "2024-04-24T15:23:43.823071Z",
            "deleted": false,
            "deleted_at": null,
            "ip": null,
            "is_active": true,
            "status": "SEND",
            "expiry_date": null,
            "motive": "asdasdasdsad",
            "user_created": 3,
            "user_updated": 3,
            "user_deleted": null,
            "solicity": 230,
            "user": 3
        }
    ],
    "created_at": "2024-04-24T13:53:17.455627Z",
    "updated_at": "2024-04-24T15:23:43.856385Z",
    "deleted": false,
    "deleted_at": null,
    "ip": null,
    "number_saip": "544075",
    "date": "2024-04-24T13:53:17.454877Z",
    "city": "guayaquil",
    "text": "asdasdasd",
    "is_active": true,
    "status": "INSISTENCY_SEND",
    "expiry_date": "2024-05-04T15:23:43.856033Z",
    "have_extension": false,
    "is_manual": false,
    "first_name": "ASDASD",
    "last_name": "ASDASD",
    "email": "afullink@gmail.com",
    "race_identification": "Meztizo",
    "gender": "Masculino",
    "address": "",
    "phone": "+593959998855",
    "format_send": "formato fisico: copia en papel",
    "format_receipt": "formulario web",
    "user_created": 3,
    "user_updated": 3,
    "user_deleted": null,
    "establishment": 2
}*/


export class TimeLinePresenter {

    constructor(
        public user_id: number,
        public created_at: string,
        public text: string,
        public files: FilePublicationEntity[],
        public attachments: AttachmentEntity[],
        public type: 'RESPONSE' | 'INSISTENCY' | 'COMMENT',
        public title: string,
        public other_title:string
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
        public files: number[],
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
                 "Respuesta de la entidad",'Respuesta'))
        })

        solicity.insistency?.forEach(i => {
            if(i.status==StatusSolicity.INFORMAL_MANAGMENT_SEND.key){

                list.push(new TimeLinePresenter(i.user_created, i.created_at, i.motive, [], [],
                    "INSISTENCY", "Gestión Oficiosa", 'Gestión Oficiosa'))
            }else{

                list.push(new TimeLinePresenter(i.user_created, i.created_at, i.motive, [], [],
                    "INSISTENCY", "Insistencia del ciudadano", 'Tu Insistencia'))
            }
        })

        solicity.comments?.forEach(c => {
            list.push(new TimeLinePresenter(c.user, c.created_at, c.motive, [], [], 
                "COMMENT", "Comentario del ciudadano",'Tu Comentario'))
        })



        return list.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    }

}