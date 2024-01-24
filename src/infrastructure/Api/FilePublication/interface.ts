

export interface FilePublicationRequest {
    name: string;
    description: string;
    url_download: File;

}

export interface FilePublicationResponse {
    id: number;
    name: string;
    description: string;
    url_download: string;
}