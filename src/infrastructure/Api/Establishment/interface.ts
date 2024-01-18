

export interface EstablishmentListDto {
    
    id: number;
    name: string;
    code: string;
    abbreviation: string;

    logo: string;
    highest_authority: string;
    first_name_authority: string;
    last_name_authority: string;
    job_authority: string;
    email_authority: string;
    is_active: boolean;
}




export interface EstablishmentCreateDTO{
    name: string,
    code: string,
    logo: File,
    abbreviation: string,
    highest_authority: string,
    first_name_authority: string,
    last_name_authority: string,
    job_authority: string,
    email_authority: string,
    highest_committe: string,
    first_name_committe: string,
    last_name_committe: string,
    job_committe: string,
    email_committe: string,
    email_accesstoinformation: string
}

export interface EstablishmentDetailDTO{
    id : number,
    name: string,
    code: string,
    logo: File,
    abbreviation: string,
    highest_authority: string,
    first_name_authority: string,
    last_name_authority: string,
    job_authority: string,
    email_authority: string,
    highest_committe: string,
    first_name_committe: string,
    last_name_committe: string,
    job_committe: string,
    email_committe: string,
    email_accesstoinformation: string
}
 