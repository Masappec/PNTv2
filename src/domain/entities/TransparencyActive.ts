import BaseEntity from "./BaseEntity";
import EstablishmentEntity from "./Establishment";
import { FilePublicationEntity } from "./PublicationEntity";





class TransparencyActive extends BaseEntity {
    constructor(
        public id: number,
        public files: FilePublicationEntity[],
        public created_at: Date,
        public updated_at: Date,
        public deleted: boolean,
        public deleted_at: Date,
        public ip: string,
        public slug: string,
        public month: number,
        public year: number,
        public status: string,
        public published: boolean,
        public published_at: string,
        public max_date_to_publish: string,
        public user_created: string,
        public user_updated: string,
        public user_deleted: string,
        public establishment: EstablishmentEntity,
        public numeral: number,
    ) {
        super(
            created_at,
            updated_at,
            deleted,
            deleted_at,
            ip,
            user_created,
            user_updated,
            user_deleted
        );

    }


    static buildForPubish(
        filesPublication: FilePublicationEntity[],
        establishment: EstablishmentEntity,
        numeral: number,
    ) {
        return new TransparencyActive(
            0,
            filesPublication,
            new Date(),
            new Date(),
            false,
            new Date(),
            "",
            "",
            0,
            0,
            "pending",
            false,
            "",
            "",
            "",
            "",
            "",
            establishment,
            numeral

        )
    }



}
export default TransparencyActive;