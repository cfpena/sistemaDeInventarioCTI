import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";
import {ITEM} from '../item/item.model';
import {Movimiento} from '../inventario/movimiento.model';


export class Movimiento_Detalle {
  @IsInt() id: number;
  @IsInt() cantidad: number;
  Is_DetalleKit: boolean;
  item: ITEM;
  serie: string;

  constructor( ) {
    this.id=0;
    this.cantidad=0;
    this.Is_DetalleKit= false;
    this.serie='';
  }
}
