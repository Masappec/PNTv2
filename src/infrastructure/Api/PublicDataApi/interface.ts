

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

/*{
            "total": Solicity.objects.count(),
            "responsed": None,
            "not_responsed": None,
            "total_not_responsed": None,
            "total_responsed": None,
            "users":None
        }*/

export interface PublicDataApiResponse {
    total: number;
    responsed: number[];
    not_responsed: number[];
    total_not_responsed: number;
    total_responsed: number;
    users: {
        active: number;
        inactive: number;
    }
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