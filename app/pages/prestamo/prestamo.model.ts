import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Persona} from '../persona/persona.model';

export class Prestamo {
    url: String;
    Persona: Persona;
    Item : ITEM;
    @IsInt() Cantidad: number;
    Fecha: string;
    Fecha_vencimiento: string;
    Fecha_devolucion: string;
    Detalle: string;


constructor( ) {
  this.Detalle='';
  this.Fecha='';
  this.Fecha_devolucion='';
  this.Fecha_vencimiento='';
  this.Cantidad=0;

}

}
