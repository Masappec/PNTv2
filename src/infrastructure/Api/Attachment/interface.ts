
export interface AttachmentResponse {
    id: number;
    name: string;
    description: string;
    url_download: string;
}

export interface AttachmentRequest {

    name: string;
    description: string;
    url_download: string;
}