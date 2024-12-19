


export interface IndexInformationClassified {
    topic: string;
    legal_basis: string;
    classification_date: string;
    period_of_validity: string;
    amplation_effectuation: boolean;
    ampliation_description: string;
    ampliation_date: string;
    ampliation_period_of_validity: string;
}

export interface AnualReportCreateDto {
    establishment_id: number;
    year: number;
    month: number;
    have_public_records: boolean;
    norme_archive_utility: string;
    comment_aclaration: string;
    have_annual_report: boolean;
    total: number;
    did_you_entity_receive: boolean;
    desription: string;
    total_no_registered: number;
    comment_aclaration_no_registered: string;
    reserve_information: boolean;
    number_of_reserves: number;
    number_of_confidential: number;
    number_of_secret: number;
    number_of_secretism: number;
    information_classified: IndexInformationClassified[];
    have_quality_problems: boolean;
    total_quality_problems: number;
    description_quality_problems: string;
    have_sanctions: boolean;
    total_organic_law_public_service: number;
    description_organic_law_public_service: string;
    total_organic_law_contraloria: number;
    description_organic_law_contraloria: string;
    total_organic_law_national_system: number;
    description_organic_law_national_system: string;
    total_organic_law_citizen_participation: number;
    description_organic_law_citizen_participation: string;
    implemented_programs: boolean;
    total_programs: number;
    description_programs: string;
    have_activities: boolean;
    total_activities: number;
    description_activities: string;
}