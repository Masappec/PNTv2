

class IndexInformationClassifiedEntity{
    constructor(
       public  topic: string,
        public legal_basis: string,
        public classification_date: string,
        public period_of_validity: string,
        public amplation_effectuation: boolean,
        public ampliation_description: string,
        public ampliation_date: string,
        public ampliation_period_of_validity: string,
    ){}
}

export class AnualReportEntity{
    constructor(
        public establishment_id: number,
        public year: number,
        public month: number,
        public have_public_records: boolean,
        public norme_archive_utility: string,
        public comment_aclaration: string,
        public have_annual_report: boolean,
        public total: number,
        public did_you_entity_receive: boolean,
        public desription: string,
        public total_no_registered: number,
        public comment_aclaration_no_registered: string,
        public reserve_information: boolean,
        public number_of_reserves: number,
        public  number_of_confidential: number,
        public number_of_secret: number,
        public number_of_secretism: number,
        public information_classified: IndexInformationClassifiedEntity[],
        public have_quality_problems: boolean,
        public total_quality_problems: number,
        public description_quality_problems: string,
        public have_sanctions: boolean,
        public total_organic_law_public_service: number,
        public description_organic_law_public_service: string,
        public total_organic_law_contraloria: number,
        public description_organic_law_contraloria: string,
        public total_organic_law_national_system: number,
        public description_organic_law_national_system: string,
        public total_organic_law_citizen_participation: number,
        public description_organic_law_citizen_participation: string,
        public  implemented_programs: boolean,
        public  total_programs: number,
        public description_programs: string,
        public  have_activities: boolean,
        public total_activities: number,
        public description_activities: string,
    ){}
}
