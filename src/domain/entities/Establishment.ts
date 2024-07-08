

class EstablishmentEntity {
    id?: number;
    name: string;
    code: string;
    identification: string;
    abbreviation: string;
    logo: string | File | null;
    highest_authority: string;
    first_name_authority: string;
    last_name_authority: string;
    job_authority: string;
    email_authority: string;
    address?: string;
    type_organization?: string;
    function_organization?: string;
    type_institution?: string;
    highest_committe?: string;
    first_name_committe?: string;
    last_name_committe?: string;
    job_committe?: string;
    email_committe?: string;
    email_accesstoinformation?: string;
    is_active?: boolean;
    slug?: string;
    extra_numerals?: string


    constructor(name: string, code: string, abbreviation: string,
        logo: string, highest_authority: string, first_name_authority: string,
        last_name_authority: string, job_authority: string, email_authority: string, identification: string,
        is_active?: boolean, highest_committe?: string, first_name_committe?: string,
        slug?: string, extra_numerals?: string,
    ) {
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
        this.slug = slug;
        this.extra_numerals = extra_numerals
        this.identification = identification
    }



    static generateAllEstablishment(name:string): EstablishmentEntity{
        return new EstablishmentEntity(name, 'code', 'abbreviation', 'logo', 'highest_authority', 'first_name_authority', 'last_name_authority', 'job_authority', 'email_authority', '')
    }
}

export default EstablishmentEntity;