import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";


export class Movimiento {
  @IsInt() id: number;
  fecha: string;
  tipo_movimiento: Tipo_Movimiento;

  constructor( ) {
    this.id=0;
    this.fecha='';
  }
}

export class Tipo_Movimiento{
  @IsInt() id:number;
  @IsAlpha() nombre: string;

  constructor (){
    this.id=0;
    this.nombre='';
  }
}
