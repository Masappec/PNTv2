


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
  have_records: boolean;
  norme_archive_utility: string;
  comment_aclaration: string;
  total_saip: number;
  did_you_entity_receive: boolean;
  total_saip_in_portal: number;
  total_saip_no_portal: number;
  description_rason_no_portal: string;
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
  total_organic_law_service: number;
  description_organic_law_service: string;
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

export interface AnualReportResponseDto extends AnualReportCreateDto {
    id: number;
    created_at: string;
    updated_at: string;
}



export interface SolicityStatsAnualReportDto {
  percent_no_response: number;
  percent_reponse_to_11_days: number;
  percent_response_plus_15_days: number;
  percent_response_to_10_days: number;
  total: number;
  total_no_response: number;
  total_reponse_to_11_days: number;
  total_response_plus_15_days: number;
  total_response_to_10_days:number
}