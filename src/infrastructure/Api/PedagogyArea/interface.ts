import { BaseObject } from "../index";


export interface FAQResponse extends BaseObject{
    id: number;
    question: string;
    answer: string;
    is_active: boolean;

}

export interface TutorialResponse extends BaseObject{
    id: number;
    title: string;
    description: string;
    url: string;
    is_active: boolean;
        
    
}

export interface NormativeResponse extends BaseObject{

    id: number;
    title: string;
    description: string;
    url: string;
    is_active: boolean;
        
}

export interface PedagogyAreaResponse {
    messages: string[];
    status: number;
    json: {
        faq: FAQResponse[];
        tutorial: TutorialResponse[];
        normative: NormativeResponse[];
    };
}

export type FAQRequest = Omit<FAQResponse, "id" | "created_at" | "updated_at" | "deleted" | "deleted_at" | "ip" | "user_created" | "user_updated" | "user_deleted">;
export type TutorialRequest = Omit<TutorialResponse, "id" | "created_at" | "updated_at" | "deleted" | "deleted_at" | "ip" | "user_created" | "user_updated" | "user_deleted">;
export type NormativeRequest = Omit<NormativeResponse, "id" | "created_at" | "updated_at" | "deleted" | "deleted_at" | "ip" | "user_created" | "user_updated" | "user_deleted">;

export interface PedagogyAreaRequest {
    faq: FAQRequest[];
    tutorial: TutorialRequest[];
    normative: NormativeRequest[];
}