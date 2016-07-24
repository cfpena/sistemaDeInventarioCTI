import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";


export class ITEM {
  @IsInt() id: number;
  codigo: string;
  nombre: string;
  marca: string;
  modelo: string;
  descripcion: string;
  @IsInt() cantidad: number;
  esDispositivo: boolean;
  image: string;

  constructor( ) {
    this.id=0;
    this.codigo='';
    this.nombre='';
    this.marca='';
    this.modelo='';
    this.descripcion='';
    this.cantidad=0;
    this.esDispositivo=false;
    this.image='';
  }
}
