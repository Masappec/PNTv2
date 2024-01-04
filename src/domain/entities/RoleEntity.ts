
class RoleEntity{
    id?: number;
    name: string;
    permission?: {
        id: number;
        name: string;
        codename: string;
        content_type: number;
    }[];

    permission_required?: string;

    constructor(id: number, name: string, permission?: {
        id: number;
        name: string;
        codename: string;
        content_type: number;
    }[],
    permission_required?: string

    ){
        this.id = id;
        this.name = name;
        this.permission = permission;
        this.permission_required = permission_required;
    }
}

export default RoleEntity;