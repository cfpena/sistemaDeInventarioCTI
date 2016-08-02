import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Persona} from '../persona/persona.model';

export class Prestamo {
    @IsInt() id: number;
    personas: Persona[];
    items : ITEM[];
    kits : Kit[];
    @IsInt() cantidad: number;
    disponible: boolean; //si esta disponible para prestar
    devuelto: boolean;
    fecha_prestamo: string;
    fecha_fin: string;


constructor( ) {
  this.disponible=true;
  this.devuelto=true;
  this.personas= [];
  this.items=[];
  this.kits=[];
  this.id=0;
  this.cantidad=0;
  this.fecha_prestamo='';
  this.fecha_fin='';
}

}
