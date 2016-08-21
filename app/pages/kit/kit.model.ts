import {ITEM} from '../item/item.model';
import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";

export class Kit {
  url: number;
  Codigo: string;
  CodigoEspol: string;
  CodigoSenecyt: string;
  Nombre: string;
  Marca: string;
  Modelo: string;
  Descripcion: string;
  //Imagen: any;
  Items: any;
  Elementos: ITEM;
  Dispositivos: ITEM;



constructor() {
  this.Codigo='';
  this.CodigoEspol='';
  this.CodigoSenecyt='';
  this.Nombre='';
  this.Marca='';
  this.Modelo='';
  this.Descripcion='';

  this.Items;
  this.Dispositivos;
}
}
