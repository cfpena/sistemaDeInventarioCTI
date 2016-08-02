import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";

export class Usuario {
    Username: String;
    CI: String;
    Nombre:String;
    Apellido: String;
    @IsEmail() Email: string;
    Telefono: String;
    Genero: String;
    Usuario: any;

constructor( ) {
  this.Username='';
  this.CI='';
  this.Nombre='';
  this.Apellido='';
  this.Email='';
  this.Telefono='';
  this.Genero='';
}
}
