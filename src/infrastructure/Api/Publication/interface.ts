
export interface PublicationRequest{
    name: string;
    description: string;
    group_dataset: number[];
    file_publication: number[];
    type_publication: string;
    notes: string;
    attachment: number[];
}