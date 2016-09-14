import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha, Matches, NotEmpty} from "validator.ts/decorator/Validation";


export class ITEM {
  url: string;
  @IsInt() Stock: number;
  Stock_Disponible: number;
  @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(2, 30) Codigo: string;
   @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(0, 30) CodigoEspol: string;
   @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(0, 30) CodigoSenecyt: string;
  @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(2, 30) Nombre: string;
  @IsLength(0, 30) Marca: string;
  @IsLength(0, 30) Modelo: string;
  @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(2, 50) Descripcion: string;
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
