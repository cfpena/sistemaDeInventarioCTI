import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha, IsAlphanumeric, Matches, NotEmpty} from "validator.ts/decorator/Validation";


export class Persona {
  url: String;
  @NotEmpty() @Matches(new RegExp("^[0-9]*$")) @IsLength(10, 10) CI: string;
  @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]*$")) @IsLength(2, 30) Nombre: string;
  @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s ]*$")) @IsLength(2, 30) Apellido: string;
  @NotEmpty() @IsEmail() Email: string;
  @NotEmpty() @Matches(new RegExp("^[0-9]*$")) @IsLength(7, 10) Telefono: string;
  @NotEmpty() Genero: string;
  @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(2, 50) Direccion: string;
  @Matches(new RegExp("^[0-9]*$")) @IsLength(0, 9) Matricula: string;
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
