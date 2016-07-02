import {Component} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';
import {ITEM} from '../item/item.model';
import {CrearItemPage} from '../crear_item/crear_item';


@Component({
  templateUrl: 'build/pages/item/item.html'
})
export class ItemPage {
  items = ITEMS;
  selectedItem : ITEM;
  title: string ='Ítems';

  onSelect (item : ITEM) {this.selectedItem = item;}
  constructor(private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }

  goCrearItem(){
      this._navController.push(CrearItemPage,{});
      this._navController.setRoot(CrearItemPage);
    }

}

const ITEMS: ITEM[]=[
  {id: 1,  codigo: 'Item001',  nombre: 'Item 1',  marca: 'Marca 1',  modelo: 'Modelo 1',  descripcion: ' ', cantidad:20, esDispositivo: true},
  {id: 2,  codigo: 'Item002',  nombre: 'Item 2',  marca: 'Marca 1',  modelo: 'Modelo 2',  descripcion: ' ', cantidad:10, esDispositivo: true},
  {id: 3,  codigo: 'Item003',  nombre: 'Item 3',  marca: 'Marca 2',  modelo: 'Modelo 3',  descripcion: ' ', cantidad:15,esDispositivo: false}
]
