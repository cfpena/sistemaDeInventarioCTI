import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";
import {Persona} from '../persona/persona.model';
import {Movimiento} from '../inventario/movimiento.model';


export class Ingreso {
  @IsInt() id: number;
  Acta_entrega: string;
  movimiento: Movimiento;
  proveedor: Persona;

  constructor( ) {
    this.id=0;
    this.Acta_entrega='';
  }
}
