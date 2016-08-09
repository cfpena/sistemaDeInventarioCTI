import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";


export class Persona {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  @IsEmail() correo: string;
  funcion: string;
  telefono: string;
  genero: string;
  esPrestario: boolean;
  esProveedor: boolean;
}
