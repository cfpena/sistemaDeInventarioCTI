import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, MenuController , Toast } from 'ionic-angular';
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Prestamo} from '../prestamo/prestamo.model';
import {MaterializeDirective} from "../../materialize-directive";
import {DatePicker} from 'ionic-native';
import {Reporte} from './reportes.model'
import {ReporteService} from './reportes.service'
/*
  Generated class for the ReportesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/reportes/reportes.html',
    directives: [MaterializeDirective],
    providers: [ReporteService],
})
export class ReportesPage {
  title: string ='Reportes';
  tiposBusquedas = ['Resporte Movimientos', 'Reporte Préstamos'];
  busqueda='';
  reporte=new Reporte();

  constructor( private navController:NavController,
    private menu: MenuController,
  private service: ReporteService
){
    this.busqueda=this.tiposBusquedas[0]
  }
  openMenu(){
    this.menu.open();
  }
  crear(){

    if(this.reporte.Fecha_Inicial!='' && this.reporte.Fecha_Final!=''){
      this.service.getReporteInventario(this.reporte,this.navController).then(result=>{
        console.log(result)
      })

    }
  }



}
