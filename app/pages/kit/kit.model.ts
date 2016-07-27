import {ITEM} from '../item/item.model';
import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";

export class Kit {
  id: number;
  @IsAlpha() nombre: string;
  @IsAlpha() marca: string;
  @IsAlpha() modelo: string;
  codigo: string;
  descripcion: string;
  @IsInt() cantidad: number;
  items : ITEM[];

constructor() {
  this.id=0;
  this.codigo='';
  this.nombre='';
  this.marca='';
  this.modelo='';
  this.descripcion='';
  this.cantidad=0;
}
}
