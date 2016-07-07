import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha} from "validator.ts/decorator/Validation";

export class Usuario {
    @IsInt() id: number;
    @IsEmail() email: string;
    provider: string; //no va
    @IsEmail() uid: string;
    @IsAlpha() name: string;
    nickname: string; //no va
    image: string;    //no va
    type: string;


constructor( ) {
  this.id=0;
  this.email='';
  this.uid='';
  this.type='';
  this.name='';
}
}
