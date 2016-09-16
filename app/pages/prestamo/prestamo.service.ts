import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Prestamo } from './prestamo.model';
import {ITEM} from '../item/item.model';
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

  llenarDevuelto(acta: Acta,nav: NavController){
      this.httprequest.post(this.url.base + this.url.devuelto,JSON.stringify({Acta: acta.url}),nav).then(result=>{
        console.log(result.json())
        acta.Devuelto=result.json();
      })



  }

  createActa1(acta: Acta, nav:NavController){
    //console.log (acta)
    return this.httprequest.post(this.url.base + this.url.acta, JSON.stringify(acta),nav).then(result => {return result});
  }

  createActa(acta: Acta, listaPrestamo: Prestamo[], nav:NavController){
    //console.log('voy a crear acta')
    //console.log(acta)
    return this.httprequest.post(this.url.base + this.url.acta, JSON.stringify(acta),nav).then(result=>{
        let acta = result.json() as Acta
        for(let prestamo of listaPrestamo){
          prestamo.Cantidad = Number(prestamo.Cantidad)
          prestamo.Acta = acta.url
          prestamo.Item=prestamo.Item.url
          //console.log(JSON.stringify(prestamo))
          this.httprequest.post(this.url.base + this.url.prestamo,JSON.stringify(prestamo),nav)
        }
    })
  }
  //obtener el último codigo de actas
    getUltimaActa(nav: NavController) {
      return this.httprequest.get(this.url.base + this.url.acta, nav).then(result => {
        let actas = result.json() as Acta[];
        if (actas.length == 0){
          return 0;
        }else{
          for (var acta of actas){
            acta.Codigo;
          }
          var separador = "-"; // un espacio en blanco
          var arregloDeSubCadenas = acta.Codigo.split(separador,2);
          //console.log("arregloDeSubCadenas ", arregloDeSubCadenas[1]);
        return parseInt(arregloDeSubCadenas[1]);
      }
      })
    }

  createDevolucion (listaPrestamos: Prestamo[], nav:NavController){
    let devolucion;
    for(let prestamo of listaPrestamos){
      devolucion = new Devolucion();
      devolucion.Cantidad=Number(prestamo.Cantidad)
      devolucion.Prestamo=prestamo.url
      this.httprequest.post(this.url.base+this.url.devolucion,JSON.stringify(devolucion),nav)
    }
  }


  llenarPrestador(acta: Acta,nav: NavController){
    //console.log('llenar prestador')
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

  llenarItem(prestamo: any,nav: NavController){
    //console.log('llenar item')
    return this.httprequest.get(String(prestamo.Item),nav).then(result=>{
      prestamo.Item =  result.json() as ITEM;
      return prestamo;
    });
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
