import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";


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
