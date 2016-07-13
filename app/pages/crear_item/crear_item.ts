import {Component} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';
import {ItemPage} from '../item/item';

@Component({
  templateUrl: 'build/pages/crear_item/crear_item.html'
})
export class CrearItemPage {

  constructor(private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }

  cancelar(){
    this._navController.push(Item,{});
    this._navController.setRoot(ItemPage);
  }

}
