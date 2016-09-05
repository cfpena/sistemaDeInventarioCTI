import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';


export class KitItem {
  @IsInt() cantidad: number;
  Item: any;

  constructor( ) {
    this.cantidad=0;
  }
}
