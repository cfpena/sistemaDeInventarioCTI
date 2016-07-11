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
  descripcion: string;
  @IsInt() cantidad: number;
  estado: string;
  //esDispositivo: boolean;

  constructor( ) {
    this.id=0;
    this.fecha='';
    this.codigo='';
    this.tipo='';
    this.nombre='';
    this.marca='';
    this.modelo='';
    this.descripcion='';
    this.cantidad=0;
    this.estado='';
    //this.esDispositivo=true;
  }
}
