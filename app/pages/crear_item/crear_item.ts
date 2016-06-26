import {Component} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/crear_item/crear_item.html'
})
export class CrearItemPage {

  constructor(private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }

}
