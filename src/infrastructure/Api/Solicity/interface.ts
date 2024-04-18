import { BaseObject } from "..";
import { AttachmentResponse } from "../Attachment/interface";
import { FilePublicationResponse } from "../FilePublication/interface";

export interface TimeLine {
  status: string;
  created_at: string;
}

export interface SolicityResultDto extends BaseObject {

  id_solicitud: number;
  text: string;
  files: FilePublicationResponse[];
  attachments: AttachmentResponse[];
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }
}

export interface SolicityResponseDto extends BaseObject {

  id: number;
  number_saip: string;
  date: string;
  city: string;
  text: string;
  is_active: boolean;
  status: string;
  expiry_date: string;
  have_extension: boolean;
  is_manual: boolean;
  first_name: string;
  last_name: string;
  email: string;
  race_identification: string;
  gender: string;
  address: string;
  phone: string;
  format_send: string;
  format_receipt: string;
  establishment: number;
  estblishment_name: string;
  time_line: TimeLine[];

  responses: SolicityResultDto[]
}




export interface SolicityDraftRequestDto {
  number_saip: string;
  date: string;
  city: string;
  text: string;
  first_name: string;
  last_name: string;
  email: string
  race_identification: string;
  gender: string;
  address: string;
  phone: string;
  format_send: string;
  format_receipt: string;
  establishment: number;


}


export interface SendDraftSolicity {

  id: number;
  number_saip: string;
  date: string;
  city: string;
  text: string;
  first_name: string;
  last_name: string;
  email: string
  race_identification: string;
  gender: string;
  address: string;
  phone: string;
  format_send: string;
  format_receipt: string;
  establishment: number;

}


export interface SolicityResult {
  id_solicitud: number;
  text: string;
  files: number[];
  attachment: number[];
  category_id: number;
}
