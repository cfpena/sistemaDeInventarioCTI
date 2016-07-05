import {Component,  OnInit, Input, ViewChild } from '@angular/core';
import {NavController, MenuController, Toast} from 'ionic-angular';
import {MaterializeDirective} from "../../materialize-directive";
/*
  Generated class for the InventarioPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/inventario/inventario.html',
})
export class InventarioPage {
    title: string ='Inventario';
    constructor( private navController:NavController,private menu: MenuController){
    }

    openMenu(){
      this.menu.open();
    }
}
