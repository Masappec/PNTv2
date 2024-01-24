
export interface TagResponse {
    id: number;
    name: string;
    description: string;
    is_active: boolean;

}

export interface TagRequest {
    name: string;
}