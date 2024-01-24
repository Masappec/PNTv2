export class TagEntity{
    id: number;
    name: string;
    description?: string;
    is_active: boolean;

    constructor(id: number, name: string, is_active: boolean, description?: string){
        this.id = id;
        this.name = name;
        this.is_active = is_active;
        this.description = description;
    }
}
