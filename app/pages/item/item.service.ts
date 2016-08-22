import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Url} from '../../url';
import {ITEM} from './item.model';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';
import {HttpRequest} from '../../httprequest';
import {NavController} from 'ionic-angular';



@Injectable()
export class ItemService {
    url = new Url();
    httprequest:HttpRequest;

    constructor(private http: Http,
        private usuarioAuthService: UsuarioAuthService) {
          this.httprequest = new HttpRequest(http);
        }

    getElementos(nav: NavController) {
      return this.httprequest.get(this.url.base + this.url.elemento,nav).then(result => {
          let items = result.json() as ITEM[];
          return items;
        })
    }

    getDispositivos(nav: NavController) {
      return this.httprequest.get(this.url.base + this.url.dispositivo,nav).then(result => {
          let items = result.json() as ITEM[];
          for(var item of items){
            item.Es_Dispositivo=true;
          }
          return items;
        })
    }

    getBuscarElemento(cadena: String,nav: NavController) {

    return this.httprequest.get(this.url.base + this.url.elemento + this.url.buscar + cadena,nav)
    .then(result => {
          let items = result.json() as ITEM[];
          return items;

        }).catch(error=>{
          console.log(error)
        });
    }
    getBuscarDispositivo(cadena: String,nav: NavController) {

            return this.httprequest.get(this.url.base + this.url.dispositivo + this.url.buscar + cadena,nav)
            .then(result => {
          let items = result.json() as ITEM[];
          for(let item of items){
            item.Es_Dispositivo=true
          }
          return items;

        }).catch(error=>{
          console.log(error)
        });
    }
    eliminarItem(item: ITEM,nav: NavController) {

            return this.httprequest.delete(String(item.url),nav)
    }

    createItem(item: ITEM,nav: NavController) {
      let url = this.url.base
      url+= item.Es_Dispositivo ? this.url.dispositivo:this.url.elemento
          return this.httprequest.post(url, JSON.stringify(item),nav)
    }


    updateItem(item: ITEM,nav: NavController) {

            return this.httprequest.patch(String(item.url), JSON.stringify(
            {
              Nombre: item.Nombre,
              Marca: item.Marca,
              Modelo: item.Modelo,
              CodigoEspol: item.CodigoEspol,
              CodigoSenecyt: item.CodigoSenecyt,
              Descripcion: item.Descripcion
            }),nav)
            .then(result => {return result});
    }
}
