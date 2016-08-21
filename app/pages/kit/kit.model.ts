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
  Stock: number;
  Stock_Disponible: number;
  Is_kit: boolean;
  //Imagen: any;
  Items: any;

constructor() {
  this.Codigo='';
  this.CodigoEspol='';
  this.CodigoSenecyt='';
  this.Nombre='';
  this.Marca='';
  this.Modelo='';
  this.Descripcion='';
  //this.Stock;
  this.Is_kit=true;
  this.Items;
  this.Stock_Disponible;
}
}
