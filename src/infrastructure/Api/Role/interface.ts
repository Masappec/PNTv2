
export interface RoleListResponse {
    id: number;
    name: string;
}

export interface RoleCreateRequest {
    name: string;
    permissions: string[]
}

export interface RoleDetailResponse {
    id: number;
    name: string;
    permissions: {
        id: number;
        name: string;
        codename: string;
        content_type: number;
    }[]
}