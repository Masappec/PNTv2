
export interface TemplateValidate {
    template_id: number;
    file: File;
}


export interface ColumnTemplateDto {

    id: number;
    name: string;
    code: string;
    type: string;
    format: string;
    regex: string;
    value:string
}

export interface TemplateDetail {
    id: number;
    columns: ColumnTemplateDto[];


    created_at: string;
    updated_at: string;
    deleted: boolean;
    deleted_at: string;
    ip: string;
    name: string;
    code: string;
    description: string;
    is_active: boolean;
    vertical_template: boolean;
    max_inserts: number;
    user_created: number;
    user_updated: number;
    user_deleted: number;
}