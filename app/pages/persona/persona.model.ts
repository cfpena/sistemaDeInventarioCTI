import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";


export class Persona {
  url: String;
  CI: string;
  @IsAlpha() Nombre: string;
  @IsAlpha() Apellido: string;
  @IsEmail() Email: string;
  Telefono: string;
  Genero: string;
  Direccion: string;
  Matricula: string;
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
