import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha, IsAlphanumeric, Matches, NotEmpty} from "validator.ts/decorator/Validation";
export class Group{
  name: String;
  url: String;
}

export class Usuario {
    url: String;
    @Matches(new RegExp("[0-9]*")) CI: String;
    @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]*$")) @IsLength(2, 30) Nombre: string;
    @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]*$")) @IsLength(2, 30) Apellido: string;
    @NotEmpty() @IsEmail()                                                        Email: string;
    @Matches(new RegExp("^[0-9]*$"))                                                Telefono: string;
    Genero: string;
    groups: any;


constructor( ) {

  this.CI='';
  this.Nombre='';
  this.Apellido='';
  this.Email='';
  this.Telefono='';
  this.Genero='';
//  this.groups= [];
}
}
