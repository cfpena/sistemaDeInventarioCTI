import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Movimiento} from '../inventario/movimiento.model';


export class KITELEMENTO {
  @IsInt() cantidad: number;
  Elemento: string;
  Kit: string;

  constructor( ) {
    this.cantidad=0;
  }
}
