import {ITEM} from '../item/item.model';
import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha, Matches, NotEmpty} from "validator.ts/decorator/Validation";

export class Kit {
  url: string;
  @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(2, 30) Codigo: string;
  @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(0, 30) CodigoEspol: string;
  @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(0, 30) CodigoSenecyt: string;
  @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(2, 30) Nombre: string;
  Marca: string;
  Modelo: string;
  @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(0, 30) Serie: string;
  @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(2, 50) Descripcion: string;
  Imagen: any;
  Es_Dispositivo: boolean;
  Proveedor: any;
  KitDetalle: any[];

  constructor() {
    this.url='';
    this.Codigo='';
    this.CodigoEspol='';
    this.CodigoSenecyt='';
    this.Nombre='';
    this.Marca='';
    this.Modelo='';
    this.Serie='';
    this.Descripcion='';
    this.Es_Dispositivo=false;
  }
}

export class KitDetalle {
  @IsInt() Cantidad: number;
  Item: any;

  constructor( ) {
    this.Cantidad=0;
  }
}

//nik: Porfavorcito crear el modelo para DetalleKit y agregar a Kit una lista de DetalleKit
