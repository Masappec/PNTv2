export interface User {

    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    identification?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    province?: string;
    type_person?: string;
    group?: {
        id: number;
        name: string;
    }[];

    is_active?: boolean;

}

export interface UserListResponse {
    total: number;
    limit: number;
    next: number | null;
    previous: number | null;
    current: number;
    results: User[];
}

export interface UserCreateInterface {


    groups: number[];
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    identification?: string;
    phone?: string;
    city?: string;
    province?: string;
    job?: string;
    establishment_id?: number;
    race?: string;
    age_range?: string;
    accept_terms?: boolean;



}
