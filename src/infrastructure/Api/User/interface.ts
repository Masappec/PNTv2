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
    groups?: {
        id: number;
        name: string;
    }[];


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

    id?: number ;

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
    groups: number[];
}
