

import { AttachmentEntity, FilePublicationEntity } from "./PublicationEntity";

export class SolicityResultEntity {
    constructor(
        public id_solicitud: number,
        public text: string,
        public files: FilePublicationEntity[],
        public attachments: AttachmentEntity[],
        public user: {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
        },
        public created_at: string,
        public updated_at: string,
        public deleted: boolean,
        public deleted_at: string | null,
        public ip: string,
        public is_active: boolean,
        public solicity: number,
    ) { }
}