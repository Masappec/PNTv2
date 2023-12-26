
class RoleEntity{
    id?: number;
    name: string;
    permission?: {
        id: number;
        name: string;
        codename: string;
        content_type: number;
    }[];

    constructor(id: number, name: string, permission?: {
        id: number;
        name: string;
        codename: string;
        content_type: number;
    }[]){
        this.id = id;
        this.name = name;
        this.permission = permission;
    }
}

export default RoleEntity;