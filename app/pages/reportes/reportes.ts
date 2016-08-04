import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, MenuController , Toast } from 'ionic-angular';
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Prestamo} from '../prestamo/prestamo.model';
import {MaterializeDirective} from "../../materialize-directive";
import {DatePicker} from 'ionic-native';

/*
  Generated class for the ReportesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/reportes/reportes.html',
    directives: [MaterializeDirective],
})
export class ReportesPage {
  title: string ='Reportes';
  constructor( private navController:NavController,private menu: MenuController){
  }
  openMenu(){
    this.menu.open();
  }

tiposReportes = ['Tipo de Reporte...', 'Prestamos', 'Existencias','Estado'];
fechaInicial={tipo: 'código', valor: ''};
  selected: number[]=[];

select(id: any){
let index: number;
index = this.selected.findIndex(num => num == parseInt(id));
if(index==-1){
this.selected.push(parseInt(id));}
else{this.selected.splice(index,1)};
  console.log(this.selected);
}

}
