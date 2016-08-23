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
<<<<<<< HEAD
    Objeto: ITEM;
=======
    Objeto: any;
>>>>>>> 6a5d00185f7f6337e2f413fd194ce6caa2ee9203
    Detalle: String;


constructor( ) {
  this.Detalle='';
  this.Fecha='';
  this.Cantidad=0;

}

}
