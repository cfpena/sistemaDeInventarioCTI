import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha, IsAlphanumeric} from "validator.ts/decorator/Validation";


export class Persona {
  url: String;
  @IsInt() @IsLength(10, 10) CI: string;
  @IsAlpha() @IsLength(2, 30) Nombre: string;
  @IsAlpha() @IsLength(2, 30) Apellido: string;
  @IsEmail() Email: string;
  @IsInt() @IsLength(7, 10) Telefono: string;
  Genero: string;
  @IsAlphanumeric() @IsLength(2, 50) Direccion: string;
  @IsInt() Matricula: string;
  Tipo: string;


  constructor( ) {

    this.CI='';
    this.Nombre='';
    this.Apellido='';
    this.Email='';
    this.Telefono='';
    this.Genero='';
    this.Direccion='';
    this.Tipo='';
    this.Matricula='';

  }
}
