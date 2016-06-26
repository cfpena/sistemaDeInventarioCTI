import {ITEM} from '../item/item.model';

export class Kit {
  id: number;
  codigo: string;
  nombre: string;
  marca: string;
  modelo: string;
  descripcion: string;
  cantidad: number;
  items : ITEM[];
  observaciones: string;
}
