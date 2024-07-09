import { BaseObject } from "..";
import { FAQResponse, NormativeResponse, TutorialResponse } from "../PedagogyArea/interface";

export interface EstablishmentPublicListDto extends BaseObject{
    
    id: number;
    name: string;
    code: string;
    abbreviation: string;

    logo: string;
    highest_authority: string;
    first_name_authority: string;
    last_name_authority: string;
    job_authority: string;
    email_authority: string;
    is_active: boolean;
}


export interface PedagogyAreaPublicResponse {
    messages: string[];
    status: number;
    json: {
        faq: FAQResponse[];
        tutorial: TutorialResponse[];
        normative: NormativeResponse[];
    };
}


export interface Month{
    month: number;
}