import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha, Matches, NotEmpty,IsDate} from "validator.ts/decorator/Validation";
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Persona} from '../persona/persona.model';

export class Acta {
  url: String;
  Prestador: any;
  Fecha_vencimiento: String;
  Fecha: String;
  Devuelto: boolean;
  Codigo: string;

  constructor( ) {
    this.url='';
    this.Fecha_vencimiento='';
    this.Fecha='';
    this.Devuelto=false;
  }
}
