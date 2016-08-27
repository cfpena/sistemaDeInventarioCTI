import {Validator} from "validator.ts/Validator";
import {Contains, IsInt, IsLength, IsEmail, IsAlpha, Matches, NotEmpty,IsDate} from "validator.ts/decorator/Validation";
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Persona} from '../persona/persona.model';

export class Acta {
    url: String;
    Prestador: any;
     Fecha_vencimiento: String;
     Fecha: String;
    @NotEmpty() @Matches(new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s ]*$")) @IsLength(0, 30) Codigo: String;
}
