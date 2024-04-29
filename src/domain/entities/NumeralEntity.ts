

import BaseEntity, { BaseDTO } from "./BaseEntity";
import TemplateFileEntity from "./TemplateFileEntity";
import TransparencyActive from "./TransparencyActive";



interface Dto extends BaseDTO {
    id: number,
    name: string,
    description: string,
    isDefault: boolean,
    parent: number | null;
    templates: TemplateFileEntity[]
    published: boolean;
}

class NumeralEntity extends BaseEntity {

    id: number = 0;
    name: string = "";
    description: string = "";
    isDefault = false;
    parent: number | null = 0
    templates: TemplateFileEntity[] = []
    published: boolean = false;
    publication: TransparencyActive | null = null;
    constructor(
        {
            id,
            createdAt,
            updatedAt,
            deleted,
            deletedAt,
            ip,
            name,
            description,
            isDefault,
            userCreated,
            userUpdated,
            userDeleted,
            parent,
            templates,
            published
        }: Dto

    ) {
        super(createdAt || new Date(), updatedAt || new Date(), deleted || false, deletedAt || new Date(), ip || "", userCreated || '0',
            userUpdated || '0', userDeleted || '0')
        this.id = id;
        this.name = name;
        this.description = description;
        this.isDefault = isDefault;
        this.parent = parent;
        this.templates = templates;
        this.published = published;

    }
}

export default NumeralEntity;