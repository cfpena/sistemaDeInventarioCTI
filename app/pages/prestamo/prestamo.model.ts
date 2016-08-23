import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Persona} from '../persona/persona.model';
import {Acta} from '../prestamo/acta.model';

export class Prestamo {
    url: String;
    @IsInt() Cantidad: number;
    Acta: Acta;
    Fecha: String;
    Objeto: ITEM;
    Detalle: String;


constructor( ) {
  this.Detalle='';
  this.Fecha='';
  this.Cantidad=0;

}

}
