import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha, Matches, NotEmpty} from "validator.ts/decorator/Validation";


export class ITEM {
  url: string;
  @IsInt() Stock: number;
  Stock_Disponible: number;
  @NotEmpty()  @IsLength(2, 30) Codigo: string;
  @NotEmpty() @IsLength(2, 30) Nombre: string;
  @IsLength(0, 30) Marca: string;
  @IsLength(0, 30) Modelo: string;
  @IsLength(0, 30) Serie: string;
  @NotEmpty() @IsLength(1, 150) Descripcion: string;
  Imagen: any;
  QR_Code: any;
  Es_Dispositivo: boolean;
  Es_Kit: boolean;
  proveedores: any[];
  identificaciones: any[]

  constructor( ) {
    this.Marca='';
    this.Modelo='';
    this.Serie='';
    this.Codigo='';
    this.Nombre='';
    this.Descripcion='';
    this.Stock=0;
    this.Stock_Disponible=0;
    this.Imagen='';
    this.QR_Code='';
    this.proveedores=[];
    this.identificaciones=[];
    this.Es_Dispositivo=false;
    this.Es_Kit=false


  }
}
export class identificaciones {
  url: string;
  @IsLength(0,25) Codigo_Nombre: string;
  Imagen_Codigo: any;
  @IsLength(0,15) Serie: string;
  Item: any;

  constructor( ) {
    this.Codigo_Nombre='';
    this.Imagen_Codigo='';
    this.Serie='';
  }
}
export class proveedores {
  url: string;
  @IsLength(10,13) RUC: string;
  @IsLength(0,50) Razon_Social: string;
  @IsLength(0,50) Nombre: string;
  Item: any;

  constructor( ) {
    this.RUC='';
    this.Razon_Social='';
    this.Nombre='';
  }
}
