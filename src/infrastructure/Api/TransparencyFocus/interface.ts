import { BaseObject } from "..";
import EstablishmentEntity from "../../../domain/entities/Establishment";
import { FilePublicationResponse } from "../FilePublication/interface";

export interface TransparencyFocusListDto extends BaseObject {

    id: number,
    numeral: {
        id: number,
        name: string,
        description: string
    },
    files: FilePublicationResponse[],
    slug: string,
    month: number,
    year: number,
    status: string,
    published: boolean,
    published_at: string,
    max_date_to_publish: string,
    establishment: EstablishmentEntity,


}


export interface TransparencyFocusCreateDto {
    establishment_id: number,
    files: number[],
}

