import {Component} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/principal/principal.html'
})
export class PrincipalPage {

  constructor(private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }

}
