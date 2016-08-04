import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";

export class Group{
  name: String;
  url: String;
}
export class User{
  username: String;
  groups: Group[];

}

export class Usuario {
    url: String;
    CI: String;
    Nombre:String;
    Apellido: String;
    @IsEmail() Email: string;
    Telefono: String;
    Genero: String;
    Usuario: User;

constructor( ) {

  this.CI='';
  this.Nombre='';
  this.Apellido='';
  this.Email='';
  this.Telefono='';
  this.Genero='';
}
}
