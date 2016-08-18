import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";
import {Persona} from '../persona/persona.model';
import {Movimiento} from '../inventario/movimiento.model';


export class Salida {
  @IsInt() id: number;
  Motivo_salida: string;
  No_Acta_Salida: string;
  movimiento: Movimiento;

  constructor( ) {
    this.id=0;
    this.Motivo_salida='';
    this.No_Acta_Salida='';
  }
}
