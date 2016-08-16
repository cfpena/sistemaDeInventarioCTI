import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";


export class ITEM {
  id: number;
  Codigo: string;
  CodigoEspol: string;
  CodigoSenecyt: string;
  Nombre: string;
  Marca: string;
  Modelo: string;
  Descripcion: string;
  @IsInt() Stock: number;
  Is_dispositivo: boolean;
  Is_kit: boolean;
  Images: ImageData;
  //Images: any;
  Items: any;

  constructor( ) {
    this.Codigo='';
    this.CodigoEspol='';
    this.CodigoSenecyt='';
    this.Nombre='';
    this.Marca='';
    this.Modelo='';
    this.Descripcion='';
    this.Stock;
    this.Is_dispositivo=false;
    this.Is_kit=false;
    this.Images;
    this.Items='';

  }
}
