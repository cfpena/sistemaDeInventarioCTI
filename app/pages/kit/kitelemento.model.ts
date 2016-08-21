import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Movimiento} from '../inventario/movimiento.model';


export class KITELEMENTO {
  @IsInt() id: number;
  @IsInt() cantidad: number;
  Is_Dispositivo: boolean;
  item: ITEM;
  kit: Kit;

  constructor( ) {
    this.id=0;
    this.cantidad=0;
    this.Is_Dispositivo= false;
  }
}
