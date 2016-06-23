import {Component} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/item/item.html'
})
export class ItemPage {

  constructor(private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }


}
