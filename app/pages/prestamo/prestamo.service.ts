import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Prestamo } from './prestamo.model';
import { Acta } from './acta.model';
import { Devolucion } from './devolucion.model';
import {Url} from '../../url';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';
import {NavController} from 'ionic-angular';
import {HttpRequest} from '../../httprequest';
import {Persona} from '../persona/persona.model';

@Injectable()
export class PrestamoService {
  url = new Url();
  httprequest:HttpRequest;

  constructor(private http: Http,
    private usuarioAuthService: UsuarioAuthService) {
      this.httprequest = new HttpRequest(http);
    }

    getActas(nav: NavController) {
      return this.httprequest.get(this.url.base + this.url.acta, nav).then(result => {
        let actas = result.json() as Acta[];
        return actas;
      })
    }

    createActa1(acta: Acta, nav:NavController){
      console.log (acta)
      return this.httprequest.post(this.url.base + this.url.acta, JSON.stringify(acta),nav).then(result => {return result});
    }

    createActa(acta: Acta, listaPrestamo: Prestamo[], nav:NavController){
      return this.httprequest.post(this.url.base + this.url.acta, JSON.stringify(acta),nav).then(result=>{
          let acta = result.json() as Acta
          for(let prestamo of listaPrestamo){
            prestamo.Cantidad = Number(prestamo.Cantidad)
            prestamo.Acta = acta.url
            prestamo.Objeto=prestamo.Objeto.url
            console.log(JSON.stringify(prestamo))
            this.httprequest.post(this.url.base + this.url.prestamo,JSON.stringify(prestamo),nav)
          }
      })
    }

    llenarPrestador(acta: Acta,nav: NavController){
      console.log('llenar prestador')
      return this.httprequest.get(String(acta.Prestador),nav).then(prestador=>{
        acta.Prestador =  prestador.json() as Persona;
      });

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
          Detalle: prestamo.Detalle

        }),nav)
        .then(result => {return result});
      }

      eliminarPrestamo(prestamo: Prestamo, nav: NavController) {
        return this.httprequest.delete(String(prestamo.url),nav)
      }

    }
