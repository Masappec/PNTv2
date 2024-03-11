import { BaseObject } from "..";

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

