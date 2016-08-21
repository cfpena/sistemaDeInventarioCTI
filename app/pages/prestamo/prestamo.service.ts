import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Prestamo } from './prestamo.model';
import {Url} from '../../url';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';
import {NavController} from 'ionic-angular';
import {HttpRequest} from '../../httprequest';

@Injectable()
export class PrestamoService {
    url = new Url();
    httprequest:HttpRequest;

    constructor(private http: Http,
        private usuarioAuthService: UsuarioAuthService) {
          this.httprequest = new HttpRequest(http);
        }


    getPrestamos(nav: NavController) {
      return this.httprequest.get(this.url.base + this.url.prestamo, nav).then(result => {
          let prestamos = result.json() as Prestamo[];
          return prestamos;
        })
    }

    getBuscar(cadena: String, nav: NavController) {
    return this.httprequest.get(this.url.base + this.url.prestamo + this.url.buscar + cadena,nav)
    .then(result => {
      let prestamos = result.json() as Prestamo[];
      return prestamos;

        }).catch(error=>{
          console.log(error)
        });
    }

      createPrestamo(prestamo: Prestamo, nav: NavController) {
          return this.httprequest.post(this.url.base + this.url.prestamo, JSON.stringify(prestamo),nav)
        }

    updatePrestamo(prestamo: Prestamo,nav: NavController) {
        return this.httprequest.patch(String(prestamo.url), JSON.stringify(
        {
          Cantidad: prestamo.Cantidad,
          Fecha: prestamo.Fecha,
          Fecha_vencimiento: prestamo.Fecha_vencimiento,
          Fecha_devolucion: prestamo.Fecha_devolucion,
          Detalle: prestamo.Detalle

        }),nav)
        .then(result => {return result});
      }

      eliminarPrestamo(prestamo: Prestamo, nav: NavController) {
              return this.httprequest.delete(String(prestamo.url),nav)
      }

}
