

export interface Metadata {
    filename: string;
    delimiter: string;
    quotechar: string;
    escapechar: string;
    has_header: boolean;
    columns: string[];
    numeral: string;
    article: string;
    month: string;
    year: string;
    establishment_identification: string;
    user_upload: string;
    date_upload: string;
    path: string;
    establishment_name:string;
    numeral_description:string;
}

export interface ResponsePublicApi {
    data: string[][];
    metadata: Metadata;
}


export interface RequestPublicApi {
    numerals: string[];
    article: string;
    year: string;
    month: string;
    search: string;
    fields: string[];
    establishment: string; 
}

export interface PublicDataApiResponse {
    entites_total: EntitesTotal
    solicities: Solicities
    top_20_most_visited: Top20MostVisited[]
}

export interface EntitesTotal {
    total: number
    updated: number
    not_updated: number
    nearly_updated: number
}

export interface Solicities {
    recibidas: number[]
    atendidas: number[]
}

export interface Top20 {
    establishment: Establishment
    score: number
    recibidas: number
    atendidas: number
    prorrogas: number
    insistencias: number
    no_respuestas: number
}

export interface Establishment {
    id: number
    name: string
    code: string
    abbreviation: string
    logo: string
    highest_authority: string
    first_name_authority: string
    last_name_authority: string
    job_authority: string
    email_authority: string
    is_active: boolean
    slug: string
    identification: string
    visits: number
}

export interface Top20MostVisited {
    id: number
    name: string
    code: string
    abbreviation: string
    logo: string
    highest_authority: string
    first_name_authority: string
    last_name_authority: string
    job_authority: string
    email_authority: string
    is_active: boolean
    slug: string
    identification: string
    visits: number
}




export interface RequestPersonalApi {
    names: string,
    institution: string,
}

export interface PersonalRemunerations {

    puesto: string;
    unidad: string;
    remuneracion: string;
    grado: string;
    nombre: string;
    regimen:string;
}



export interface RequestPresupuestoApi{
    
    ruc:string;
    year:number;
    month:number;
}

export interface ResponsePresupuestos{

    id:number;
    files: {
      id:number;
      name:string;
      description:string;
      url_download:string;

    }[];
    establishment_name:string;
    slug:string;
    month:number;
    year:number;
    status:string;
    published:boolean;
    published_at:string;
    max_date_to_publish:string;
    establishment:number;
    numeral:number;
}

export interface AudienceRequest{
    names:string;
    month:number;
    year:number;
}
export interface AudienceResponse{
   institucion:string;
    nombre:string;
    puesto:string;
    asunto:string;
    fecha:string;
    modalidad:string;
    lugar:string;
    descripcion:string;
    duracion:string;
    externa:string;
    institucion_ext:string;
    enlace:string;
}


export interface FormulariosRequest{
    ruc:string;
}

export interface FormulariosResponse{
    institucion:string;
    denominacion:string;
    enlace:string;
    numero_personas:string;
    enlace_descarga_formulario:string;
    enlace_servicio:string;
    anio:string;
    mes:string;
}

export interface IndicatorRequest{
    year:number;
    establishment_id:number;
}
    
export interface IndicatorResponse {
    recibidas:number[];
    atendidas:number[];
    total_recibidas:number;
    total_atendidas:number;
    score_activa:number;
    score_saip:number;
    total_score:number;
}