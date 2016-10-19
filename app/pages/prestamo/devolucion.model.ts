import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha, Matches, NotEmpty} from "validator.ts/decorator/Validation";
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Persona} from '../persona/persona.model';


export class Devolucion {
  url: string;
  @IsInt() Cantidad: number;
  Prestamo: any;
  @IsLength(0, 50) Detalle: string;

  constructor( ) {
    this.Detalle='';
    this.Cantidad=0;
  }

}
