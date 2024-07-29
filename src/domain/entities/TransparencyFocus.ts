import EstablishmentEntity from "./Establishment";
import { FilePublicationEntity } from "./PublicationEntity";

class TransparencyFocusEntity {
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

    }


}
export default TransparencyFocusEntity
