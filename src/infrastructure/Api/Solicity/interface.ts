

export interface SolicityResponseDto {


    id: number;
    text?: string;
    establishment: number;
    is_active: boolean;
    status: string
    expiry_date: string | null
    have_extension: boolean;
    is_manual: boolean;



}
export interface SolicityRequestDto {
    establishment_id: number;
    description: string;
    first_name: string;
    last_name: string;
    email: string;
    identification: string;
    address: string;
    phone: string;
    type_reception: string;
    formatSolicity: string;
}
