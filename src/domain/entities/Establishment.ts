

class EstablishmentEntity{
    id?:number;
    name:string;
    code:string;
    abbreviation:string;
    logo:string;
    highest_authority:string;
    first_name_authority:string;
    last_name_authority:string;
    job_authority:string;
    email_authority:string;

    
    constructor(name:string, code:string, abbreviation:string, logo:string, highest_authority:string, first_name_authority:string, last_name_authority:string, job_authority:string, email_authority:string){
        this.name = name;
        this.code = code;
        this.abbreviation = abbreviation;
        this.logo = logo;
        this.highest_authority = highest_authority;
        this.first_name_authority = first_name_authority;
        this.last_name_authority = last_name_authority;
        this.job_authority = job_authority;
        this.email_authority = email_authority;
    }
    
}

export default EstablishmentEntity;