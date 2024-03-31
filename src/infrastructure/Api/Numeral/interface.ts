import { BaseObject } from "..";
import { TemplateDetail } from "../TemplateFile/inteface";

interface PartialTemplateDto {
  id: number;
  name: string;
}

export interface NumeralDTO extends BaseObject {

  id: number;
  name: string;
  description: string;
  is_default: boolean;
  parent: number | null;
  templates: PartialTemplateDto[];
  published: boolean;
}




export interface NumeralDetailDTO extends BaseObject {

  id: number;
  templates: TemplateDetail[];
  name: string;
  description: string;
  is_default: boolean;
  parent: number | null;


}
