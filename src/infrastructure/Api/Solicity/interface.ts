import { BaseObject } from "..";
import { AttachmentResponse } from "../Attachment/interface";
import { FilePublicationResponse } from "../FilePublication/interface";

export interface TimeLine {
  status: string;
  created_at: string;
}

export interface Insistency {
  id: number;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string;
  ip: string;
  status: string;
  expiry_date: string;
  motive: string;
  user_created: number;
  user_updated: number;
  user_deleted: number;
  solicity: number;
  user: number;
}
/*{
    "id": 1,
    "created_at": "2024-04-25T04:02:41.964664Z",
    "updated_at": "2024-04-25T04:02:41.964713Z",
    "deleted": false,
    "deleted_at": null,
    "ip": null,
    "is_active": true,
    "status": "SEND",
    "expiry_date": null,
    "motive": "asdasdasdsad",
    "user_created": 3,
    "user_updated": 3,
    "user_deleted": null,
    "solicity": 231,
    "user": 3,
    "files": [],
    "attachments": []
}*/
export interface CommentsDto {
  id: number;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string;
  ip: string;
  motive: string;
  user: number;
  solicity: number;
  files: number[];
  attachments: number[];

}

export interface SolicityResultDto {

  id_solicitud: number;
  text: string;
  files: FilePublicationResponse[];
  attachments: AttachmentResponse[];
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  },
  user_created: number;
  user_updated: number;
  user_deleted: number;
  solicity: number;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string;
  ip: string;
  is_active: boolean;
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
  insistency: Insistency[]
  comments: CommentsDto[]
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
  is_send: boolean;

}


export interface SolicityResult {
  id_solicitud: number;
  text: string;
  files: number[];
  attachment: number[];
  category_id: number;
}



export interface CommentDto {
  solicity_id: number;
  motive: string;
  files: number[]
}