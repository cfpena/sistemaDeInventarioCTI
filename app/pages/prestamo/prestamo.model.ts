import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";

export class Prestamo {
    @IsInt() id: number;
    typeIdentificacion: string; //tipo de identificacion de una persona : por nombre o por cedula
    inputIdentificacion: string;
    busqueda: string; //busqueda por código o nombre
    inputbusqueda: string;

/*
constructor( ) {
  this.id=0;
  this.typeIdentificacion='';
  this.inputIdentificacion='';
  this.busqueda='';
  this.inputbusqueda='';
}*/
}
