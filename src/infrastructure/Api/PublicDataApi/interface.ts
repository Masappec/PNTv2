

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