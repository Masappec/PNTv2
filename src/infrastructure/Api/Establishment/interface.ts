import { BaseObject } from "..";


export interface EstablishmentListDto extends BaseObject {

    id: number;
    name: string;
    code: string;
    abbreviation: string;
    identification: string;
    logo: string;
    highest_authority: string;
    first_name_authority: string;
    last_name_authority: string;
    job_authority: string;
    email_authority: string;
    is_active: boolean;
    slug: string;
    type_institution: string;
    type_organization: string;
    function_organization: string;
}




export interface EstablishmentCreateDTO {
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
    extra_numerals: string
    address?: string;
    type_organization?: string;
    function_organization?: string;
    type_institution?: string;
    identification: string;

}

export interface EstablishmentDetailDTO {
    id: number,
    name: string,
    code: string,
    logo?: File | string,
    slug: string,
    identification: string,
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
    email_accesstoinformation: string,
    address?: string;
    type_organization?: string;
    function_organization?: string;
    type_institution?: string;
}

export interface OptionsSelectCreate {
    functions: {
        id: number;
        name: string;
    }[],
    institutions: {
        id: number;
        name: string;
    }[],
    organizations: {
        id: number;
        name: string;
    }[];

}