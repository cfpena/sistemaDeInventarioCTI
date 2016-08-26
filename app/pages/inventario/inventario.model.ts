import {Validator} from "validator.ts/Validator";
import {Contains,IsDate, IsInt, IsLength, IsEmail, IsAlpha, Matches, NotEmpty} from "validator.ts/decorator/Validation";


export class IngresoEgreso {
  url: string;
  @IsDate() Fecha: string;
  @IsInt() Cantidad: number;
  @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(1, 50) Detalle: string;
  Tipo: string;
  Objeto: any;

  constructor( ) {
    this.url='';
    this.Fecha='';
    this.Detalle='';
    this.Tipo='';
    this.Cantidad=0;
  }
}

export class FacturaIngreso{
  @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) Acta: string;
  //@Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) Proveedor: any;
  Proveedor: any;
  @IsDate() Fecha: string;
  IngresoEgresoElementos: any[];
  IngresoEgresoDispositivos: any[];
  @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(2, 50) Descripcion: string;
  url: string;

  constructor( ){
    this.url='';
    this.Acta ='';
    this.Fecha='';
    this.Descripcion='';
  }
}
