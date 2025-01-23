import { AnualReportCreateDto } from "../../infrastructure/Api/AnualReport/interface";


export class IndexInformationClassifiedEntity{
    constructor(
       public  topic: string,
        public legal_basis: string,
        public classification_date: string,
        public period_of_validity: string,
        public amplation_effectuation: string,
        public ampliation_description: string,
        public ampliation_date: string,
        public ampliation_period_of_validity: string,
    ){}
}

export interface SolicityStatsAnualReportEntity {
    month: number;
    total: number;
    total_response_to_10_days: number;
    total_reponse_to_11_days: number;
    total_response_plus_15_days: number;
    total_no_response: number;
    percent_response_to_10_days: number;
    percent_reponse_to_11_days: number;
    percent_response_plus_15_days: number;
    percent_no_response: number;
}

export class AnualReportEntity{
    constructor(
        public establishment_id: number,
        public year: number,
        public month: number,
        public have_public_records: boolean,
        public norme_archive_utility: string,
        public comment_aclaration: string,
        public total_saip: number,
        public did_you_entity_receive: boolean,
        public total_saip_in_portal: number,
        public total_saip_no_portal: number,
        public description_rason_no_portal: string,
        public have_responded_solicities_no_portal: boolean,
        public total_no_registered: number,
        public comment_aclaration_no_registered: string,
        public reserve_information: boolean,
        public number_of_reserves: number,
        public number_of_confidential: number,
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
        public solicity_infor_anual_report: SolicityStatsAnualReportEntity[] = []
    ){}


    static build(data:AnualReportCreateDto){
        return new AnualReportEntity(
          data.establishment_id,
          data.year,
          data.month,
          data.have_records,
          data.norme_archive_utility,
          data.comment_aclaration,
          data.total_saip,
          data.did_you_entity_receive,
          data.total_saip_in_portal,
          data.total_saip_no_portal,
          data.description_rason_no_portal,
          data.have_responded_solicities_no_portal,
          data.total_no_registered,
          data.comment_aclaration_no_registered,
          data.reserve_information,
          data.number_of_reserves,
          data.number_of_confidential,
          data.number_of_secret,
          data.number_of_secretism,
          data.information_classified,
          data.have_quality_problems,
          data.total_quality_problems,
          data.description_quality_problems,
          data.have_sanctions,
          data.total_organic_law_service,
          data.description_organic_law_service,
            data.total_organic_law_contraloria,
            data.description_organic_law_contraloria,
            data.total_organic_law_national_system,
            data.description_organic_law_national_system,
            data.total_organic_law_citizen_participation,
            data.description_organic_law_citizen_participation,
            data.implemented_programs,
            data.total_programs,
            data.description_programs,
            data.have_activities,
            data.total_activities,
            data.description_activities,
            data.solicity_infor_anual_report


        );
    }

    static buildVoid(){
        return new AnualReportEntity(
          0,
          0,
          0,
          true,
          "",
          "",
          0,
          true,
          0,
          0,
          "",
          true,
          0,
          "",
          true,
          0,
          0,
          0,
          0,
          [],
          true,
          0,
          "",
          true,
          0,
          "",
          0,
          "",
          0,
          "",
          0,
          "",
          true,
          0,
          "",
          true,
          0,
          "",
          []
        );
    }
}
