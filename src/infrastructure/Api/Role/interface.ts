
export interface RoleListResponse {
    id: number;
    name: string;
}

export interface RoleCreateRequest {
    name: string;
    permissions: string[]
}