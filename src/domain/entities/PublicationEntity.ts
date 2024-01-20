import BaseEntity from "./BaseEntity";



export class TagEntity{
    id: number;
    name: string;
    is_active: boolean;

    constructor(id: number, name: string, is_active: boolean){
        this.id = id;
        this.name = name;
        this.is_active = is_active;
    }
}

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

}

export default PublicationEntity;