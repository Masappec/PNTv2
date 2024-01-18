

class EstablishmentEntity{
    id?:number;
    name:string;
    code:string;
    abbreviation:string;
    logo:string | File | null;
    highest_authority:string;
    first_name_authority:string;
    last_name_authority:string;
    job_authority:string;
    email_authority:string;

    highest_committe?:string;
    first_name_committe?:string;
    last_name_committe?:string;
    job_committe?:string;
    email_committe?:string;
    email_accesstoinformation?:string;
    is_active?:boolean;

    
    constructor(name:string, code:string, abbreviation:string, 
        logo:string, highest_authority:string, first_name_authority:string,
         last_name_authority:string, job_authority:string, email_authority:string,
         is_active?:boolean, highest_committe?:string, first_name_committe?:string,
         ){
        this.name = name;
        this.code = code;
        this.abbreviation = abbreviation;
        this.logo = logo;
        this.highest_authority = highest_authority;
        this.first_name_authority = first_name_authority;
        this.last_name_authority = last_name_authority;
        this.job_authority = job_authority;
        this.email_authority = email_authority;
        this.is_active = is_active;
        this.highest_committe = highest_committe;
        this.first_name_committe = first_name_committe;
    }
    
}

export default EstablishmentEntity;