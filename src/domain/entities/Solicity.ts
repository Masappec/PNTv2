import BaseEntity from "./BaseEntity";


export class PartialTimelineSolicty {

    constructor(
        public status: string,
        public created_at: string
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

}