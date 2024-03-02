import { BaseObject } from "..";



export interface NumeralDTO extends BaseObject{

  id :number;
  name:string;
  description:string;
  is_default:boolean;
  parent:number|null;
  templates:number[]
}

