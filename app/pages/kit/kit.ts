import {Component} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/kit/kit.html'
})
export class KitPage {

  constructor(private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }


}
