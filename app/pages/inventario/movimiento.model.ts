import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";
import {Movimiento_Detalle} from '../inventario/movimiento_detalle.model';


export class Movimiento {
  @IsInt() id: number;
  fecha: string;
  tipo_movimiento: Tipo_Movimiento;
  observaciones: string;//agregar en el modelo
  movimiento_detalle: Movimiento_Detalle[];

  constructor( ) {
    this.id=0;
    this.fecha='';
    this.observaciones='';
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
