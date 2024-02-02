import BaseEntity from "./BaseEntity";
import { TagEntity } from "./TagEntity";




export class TypeFormatEntity{
    id: number;
    name: string;

    constructor(id: number, name: string){
        this.id = id;
        this.name = name;
    }
}

export class FilePublicationEntity{
    id: number;
    name: string;
    description: string;
    url_download: string | File;

    constructor(id: number, name: string, description: string, url_download: string|File){
        this.id = id;
        this.name = name;
        this.description = description;
        this.url_download = url_download;
    }
}

export class AttachmentEntity{
    id: number;
    name: string;
    description: string;
    url_download: string;

    constructor(id: number, name: string, description: string, url_download: string){
        this.id = id;
        this.name = name;
        this.description = description;
        this.url_download = url_download;
    }
}

class PublicationEntity extends BaseEntity{

    id?: number;
    name?: string;
    description?: string;
    is_active?: boolean;
    establishment?: number;
    type_publication?: string;
    tag?: TagEntity[];
    type_format?: TypeFormatEntity[];
    file_publication?: FilePublicationEntity[];
    email_created?: string;
    slug?: string;
    establishment_name?: string;
    notes?: string;
    attachment?: AttachmentEntity[];

}

export default PublicationEntity;