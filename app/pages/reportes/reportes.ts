import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, MenuController, Toast } from 'ionic-angular';
import { Kit } from '../kit/kit.model';
import { MaterializeDirective } from "../../materialize-directive";
import { DatePicker } from 'ionic-native';
import { Reporte } from './reportes.model'
import { ReporteService } from './reportes.service'
import { IngresoEgreso } from './ingresoegreso.model';
import { ITEM } from '../item/item.model';
import {Prestamo} from '../prestamo/prestamo.model';
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
    title: string = 'Reportes';
    tiposBusquedas = ['Resporte Movimientos', 'Reporte Préstamos'];
    busqueda = '';
    reporte = new Reporte();
    IngresosEgresos: IngresoEgreso[];
    Prestamos: Prestamo[];
    today= new Date().toLocaleDateString();


    constructor(private navController: NavController,
        private menu: MenuController,
        private service: ReporteService
    ) {
        this.busqueda = this.tiposBusquedas[0]
        console.log(this.today)
    }
    openMenu() {
        this.menu.open();
    }
    crear() {

        if (this.reporte.Fecha_Inicial != '' && this.reporte.Fecha_Final != '') {
          console.log(this.reporte.Fecha_Final)
            if (this.busqueda == 'Resporte Movimientos') {
                this.service.getReporteInventario(this.reporte, this.navController).then(result => {
                    this.IngresosEgresos = result.json() as IngresoEgreso[]
                    for (let ingresoEgreso of this.IngresosEgresos) {
                        this.service.httprequest.get(String(ingresoEgreso.Objeto), this.navController).then(result => {
                            ingresoEgreso.Objeto = result.json() as ITEM
                        })
                    }

                })
            }else if(this.busqueda == 'Reporte Préstamos'){
              this.service.getReportePrestamo(this.reporte, this.navController).then(result => {
                  this.Prestamos = result.json() as Prestamo[]
                  for (let prestamo of this.Prestamos) {
                      this.service.httprequest.get(String(prestamo.Objeto), this.navController).then(result => {
                          prestamo.Objeto = result.json() as ITEM
                      })
                      this.service.httprequest.get(String(prestamo.Acta), this.navController).then(result => {
                          prestamo.Acta = result.json()['Codigo']
                      })
                  }

              }).then(()=>{
                console.log(this.Prestamos)
              })

            }
        }
    }



}
