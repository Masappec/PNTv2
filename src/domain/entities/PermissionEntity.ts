
class PermissionEntity{

    public id: number;
    public name: string;
    public codename: string;
    public content_type: number;
    constructor(
         id: number,
         name: string,
         codename: string,
        content_type: number
    ){
        this.id = id;
        this.name = name;
        this.codename = codename;
        this.content_type = content_type;
    }
    
}

export default PermissionEntity;