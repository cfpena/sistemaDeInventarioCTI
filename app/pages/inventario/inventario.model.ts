import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";

export class Inventario {
   @IsInt() id: number;
 fecha: string;
  codigo: string;
  tipo: string;
  nombre: string;
  marca: string;
  modelo: string;
  detalle: string;
  @IsInt() cantidad: number;
  estado: string;
  constructor( ) {
    this.id=0;
    this.fecha='';
    this.codigo='';
    this.tipo='';
    this.nombre='';
    this.marca='';
    this.modelo='';
    this.detalle='';
    this.cantidad=0;
    this.estado='';}
}

export class IngresoEgreso {
  url: string;
  Fecha: string;
  @IsInt() Cantidad: number;
  Detalle: string;
  Tipo: string;
  Objeto: any;
  //FacturaIngreso: any;


  constructor( ) {
    this.url='';
    this.Fecha='';
    this.Detalle='';
    this.Tipo='';
    this.Cantidad=0;

  }
}

export class FacturaIngreso{
  Acta: string;
  Proveedor: any;
  Fecha: string;
  IngresoEgreso: any[];
  Descripcion: string;
  url: string;

  constructor( ){
    this.url='';
    this.Acta ='';
    this.Fecha='';
    this.Descripcion='';
  }
}
