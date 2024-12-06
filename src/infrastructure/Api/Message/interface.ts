import { BaseObject } from "..";

export interface MesssageDTO extends BaseObject {
    id: number;
    title: string;
    content: string;
    is_read: boolean;
    created_at: string;
}