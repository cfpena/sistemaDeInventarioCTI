import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {NavController} from 'ionic-angular';
import {Url} from '../../url';
import {HttpRequest} from '../../httprequest';
import {Reporte} from './reportes.model';

@Injectable()
export class ReporteService {
    url = new Url();
    httprequest:HttpRequest;

    constructor(private http: Http) {
          this.httprequest = new HttpRequest(http);
        }

    getReporteInventario(reporte: Reporte,nav: NavController){
      return this.httprequest.post(this.url.base + this.url.reporteInventario,JSON.stringify(reporte),nav)

    }
    getReportePrestamo(reporte: Reporte,nav: NavController){
      return this.httprequest.post(this.url.base + this.url.reportePrestamo,JSON.stringify(reporte),nav)

    }
}
