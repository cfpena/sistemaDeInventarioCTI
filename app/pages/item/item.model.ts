import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";


export class ITEM {
  url: string;
  Stock: number;
  Stock_Disponible: number;
  Codigo: string;
  CodigoEspol: string;
  CodigoSenecyt: string;
  Nombre: string;
  Marca: string;
  Modelo: string;
  Descripcion: string;
  Imagen: any;
  Es_Dispositivo: boolean

  constructor( ) {
    this.Codigo='';
    this.CodigoEspol='';
    this.CodigoSenecyt='';
    this.Nombre='';
    this.Marca='';
    this.Modelo='';
    this.Descripcion='';
    this.Stock
    this.Es_Dispositivo=false


  }
}
