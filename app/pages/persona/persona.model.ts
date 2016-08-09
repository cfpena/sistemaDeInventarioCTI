import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";


export class Persona {
  url: String;
  CI: string;
  Nombre: string;
  Apellido: string;
  @IsEmail() Email: string;
  Telefono: string;
  Genero: string;


  constructor( ) {

    this.CI='';
    this.Nombre='';
    this.Apellido='';
    this.Email='';
    this.Telefono='';
    this.Genero='';
  }
}
