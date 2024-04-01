

export interface SolicityResponseDto{
 

    id: number;
    text?: string;
    establishment: number;
    is_active: boolean;
    status:string
    expiry_date:string | null
    have_extension:boolean;
    is_manual:boolean;



}