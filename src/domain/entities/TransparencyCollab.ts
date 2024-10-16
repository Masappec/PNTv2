

import EstablishmentEntity from "./Establishment";
import { FilePublicationEntity } from "./PublicationEntity";

class TransparencyCollab {
    id: number;
    numeral: {
        id: number,
        name: string,
        description: string
    };
    files: FilePublicationEntity[];
    slug: string;
    month: number;
    year: number;
    status: string;
    published: boolean;
    published_at: string;
    max_date_to_publish: string;
    establishment: EstablishmentEntity;
    public created_at: Date;
    public updated_at: Date;
    public deleted: boolean;
    public deleted_at: Date;
    public user_created: string;
    public user_updated: string;
    public user_deleted: string;
    constructor(id: number,
        numeral: {
            id: number,
            name: string,
            description: string
        },
        files: FilePublicationEntity[],
        slug: string,
        month: number,
        year: number,
        status: string,
        published: boolean,
        published_at: string,
        max_date_to_publish: string,
        establishment: EstablishmentEntity,
        created_at: Date,
        updated_at: Date,
        deleted: boolean,
        deleted_at: Date,
        user_created: string,
        user_updated: string,
        user_deleted: string

    ) {
        this.id = id;
        this.numeral = numeral;
        this.files = files || [];
        this.slug = slug;
        this.month = month;
        this.year = year;
        this.status = status;
        this.published = published;
        this.published_at = published_at;
        this.max_date_to_publish = max_date_to_publish;
        this.establishment = establishment;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted = deleted;
        this.deleted_at = deleted_at;
        this.user_created = user_created;
        this.user_updated = user_updated;
        this.user_deleted = user_deleted;

    }


}
export default TransparencyCollab
