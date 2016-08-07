import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";


export class Persona {
  url: String;
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  @IsEmail() correo: string;
  funcion: string;
  telefono: string;
  celular: string;
  genero: string;


  constructor( ) {

    this.cedula='';
    this.nombre='';
    this.apellido='';
    this.correo='';
    this.telefono='';
    this.celular='';
    this.genero='';
  }
}
