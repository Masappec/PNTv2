


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
  have_responded_solicities_no_portal: boolean;
  total_no_registered: number;
  comment_aclaration_no_registered: string;
  reserve_information: boolean;
  number_of_reserves: number;
  number_of_confidential: number;
  number_of_secret: number;
  number_of_secretism: number;
  information_classified: IndexInformationClassified[];
  solicity_infor_anual_report: SolicityStatsAnualReportDto[];
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
/*    month = models.IntegerField()
    total = models.IntegerField()
    total_response_to_10_days = models.IntegerField()
    total_reponse_to_11_days = models.IntegerField()
    total_response_plus_15_days = models.IntegerField()
    total_no_response = models.IntegerField()
    percent_response_to_10_days = models.DecimalField(max_digits=5, decimal_places=2)
    percent_reponse_to_11_days = models.DecimalField(max_digits=5, decimal_places=2)
    percent_response_plus_15_days = models.DecimalField(max_digits=5, decimal_places=2)
    percent_no_response = models.DecimalField(max_digits=5, decimal_places=2)*/
export interface SolicityStatsAnualReportDto {
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


export interface AnualReportResponseDto extends AnualReportCreateDto {
    id: number;
    created_at: string;
    updated_at: string;
}



export interface SolicityStatsAnualReportDto {
  month: number;
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


export interface TaskAnualReportDto {

  task_id: string;
  task_status: string;
  
}

export interface TaskEndAnualReportDto {
  data: {
    task_status: string;
    task_id: string;
    results: {
      path: string;
      url: string;
    };
    meta?: {
      progress?: number;
      message?: number;
    };
  };
}



export interface Pnt1PasiveDto {
  identification: string;
  function: string;
  type: string;
  establishment_name: string;
  saip: string;
  name_solicitant: string;
  date: string;
  date_response: string;
  state: string;
}


export interface Pnt1ActiveDto {
  identification: string;
  function: string;
  type: string;
  establishment_name: string;
  art: string;
  numeral: string;
  enero: boolean;
  febrero: boolean;
  marzo: boolean;
  abril: boolean;
  mayo: boolean;
  junio: boolean;
  julio: boolean;
  agosto: boolean;
}

export interface Pnt1ColabDto {
  identification: string;
  function: string;
  type: string;
  establishment_name: string;
  art: string;
  numeral: string;
  enero: boolean;
  febrero: boolean;
  marzo: boolean;
  abril: boolean;
  mayo: boolean;
  junio: boolean;
  julio: boolean;
  agosto: boolean;
}

export interface Pnt1FocalDto {
  identification: string;
  function: string;
  type: string;
  establishment_name: string;
  art: string;
  numeral: string;
  enero: boolean;
  febrero: boolean;
  marzo: boolean;
  abril: boolean;
  mayo: boolean;
  junio: boolean;
  julio: boolean;
  agosto: boolean;
}

export interface Pnt1ReservadaDto {
  identification: string;
  establishment_name: string;
  classification: string;
  theme: string;
  base_legal: string;
  date_classification: string;
  period: string;
  extension: string;
  description: string;
  date_extension: string;
  period_extension: string;
}

export interface ReservasPnt2{
  establishment_name: string;
  theme: string;
  resolution_number: string;
  classification_date: string;
  period_of_validity: string;
  link: string;
}
