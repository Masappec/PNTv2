import { EstablishmentDetailDTO } from "../Establishment/interface";
import { FilePublicationResponse } from "../FilePublication/interface";



export interface TransparencyActivePublish {
    establishment_id: number;
    numeral_id: number;
    files: number[];
}


export interface TransparencyActivePublishResponse {


    id: number;
    files: FilePublicationResponse[];
    created_at: string;
    updated_at: string;
    deleted: boolean;
    deleted_at: string;
    ip: string;
    slug: string;
    month: number;
    year: number;
    status: string;
    published: boolean;
    published_at: string;
    max_date_to_publish: string;
    user_created: string;
    user_updated: string;
    user_deleted: string;
    establishment: EstablishmentDetailDTO;
    numeral: number;
}

export interface TransparencyActivePublicResponse {


    id: number;
    files: FilePublicationResponse[];
    created_at: string;
    updated_at: string;
    deleted: boolean;
    deleted_at: string;
    ip: string;
    slug: string;
    month: number;
    year: number;
    status: string;
    published: boolean;
    published_at: string;
    max_date_to_publish: string;
    user_created: string;
    user_updated: string;
    user_deleted: string;
    establishment: EstablishmentDetailDTO;
    numeral: {
        id: number;
        name: string;
        description: string;
    };
}