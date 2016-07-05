import {Component,  OnInit, Input, ViewChild } from '@angular/core';
import {NavController, MenuController, Toast} from 'ionic-angular';
import {MaterializeDirective} from "../../materialize-directive";

/*
  Generated class for the ReportesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/reportes/reportes.html',
})
export class ReportesPage {
  title: string ='Reportes';
  constructor( private navController:NavController,private menu: MenuController){
  }
  openMenu(){
    this.menu.open();
  }
}
