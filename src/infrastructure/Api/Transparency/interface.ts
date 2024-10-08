import { BaseObject } from "..";


export interface TagResponse {
    id: number;
    name: string;
    description: string;

}


export interface TypeFormatResponse {
    id: number;
    name: string;
    description: string;
}

export interface FilePublicationResponse {
    id: number;
    name: string;
    description: string;
    url_download: string;
}

export interface AttachmentResponse extends FilePublicationResponse {
}


export interface PublicationResponse extends BaseObject{

    id: number;
    name: string;
    description: string;
    is_active: boolean;
    establishment: number;
    type_publication: string;
    tag: TagResponse[];
    type_format: TypeFormatResponse[];
    file_publication: FilePublicationResponse[];
    email_created: string;
    slug: string;
    establishment_name: string;
    notes: string;
    attachment: AttachmentResponse[];
}