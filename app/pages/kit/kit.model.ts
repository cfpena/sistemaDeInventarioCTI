import {ITEM} from '../item/item.model';
import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";

export class Kit {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  codigo: string;
  esDispositivo: boolean;
  esKit: boolean;
  @IsInt() cantidad: number;
  itemsEnKit : KitDetalle[];

constructor() {
  this.id=0;
  this.codigo='';
  this.nombre='';
  this.marca='';
  this.modelo='';
  this.cantidad=0;
  this.esDispositivo=false;
  this.esKit=true;
}
}

export class KitDetalle {
  ItemId: number;
  KitId: number;
  @IsInt() cantidad: number;
}
