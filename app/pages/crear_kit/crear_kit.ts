import {Component} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';
import {KitPage} from '../kit/kit';



@Component({
  templateUrl: 'build/pages/crear_kit/crear_kit.html'
})
export class CrearKitPage {

  constructor(private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }
  cancelar(){
    this._navController.push(KitPage,{});
    this._navController.setRoot(KitPage);
  }

}
