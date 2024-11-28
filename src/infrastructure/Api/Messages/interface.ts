import { BaseObject } from "..";

export interface MessageDTO extends BaseObject {
    id: number;
    title: string;
    content: string;
    is_read: boolean;
    receiver_id: number;
    created_at: string;
}