import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha, Matches, NotEmpty} from "validator.ts/decorator/Validation";


export class ITEM {
  url: string;
  @IsInt() Stock: number;
  Stock_Disponible: number;
  @NotEmpty()  @IsLength(2, 30) Codigo: string;
  @IsLength(0, 30) CodigoEspol: string;
  @IsLength(0, 30) CodigoSenecyt: string;
  @NotEmpty() @IsLength(2, 30) Nombre: string;
  @IsLength(0, 30) Marca: string;
  @IsLength(0, 30) Modelo: string;
  @NotEmpty() @IsLength(1, 150) Descripcion: string;
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
    this.Imagen=''
    this.Stock
    this.Es_Dispositivo=false


  }
}
