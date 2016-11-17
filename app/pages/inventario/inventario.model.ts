import {Validator} from "validator.ts/Validator";
import {Contains,IsDate, IsInt, IsLength, IsEmail, IsAlpha, Matches, NotEmpty} from "validator.ts/decorator/Validation";


export class IngresoEgreso {
  url: string;
  @IsDate() Fecha: string;
  @IsInt() Cantidad: number;
  @IsLength(0, 200) Detalle: string;
  Tipo: string;
  Item: any;

  constructor( ) {
    this.url='';
    this.Fecha='';
    this.Detalle='';
    this.Tipo='';
    this.Cantidad=0;
  }
}

export class FacturaIngreso{
  @NotEmpty() Acta: string;
  //@Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) Proveedor: any;
  Proveedor: any;

  Fecha: string;
  IngresoEgreso: any[];

  @NotEmpty()  @IsLength(2, 50) Descripcion: string;
  url: string;

  constructor( ){
    this.url='';
    this.Acta ='';
    this.Fecha='';
    this.Descripcion='';
  }
}
