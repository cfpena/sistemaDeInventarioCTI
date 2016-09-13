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

    getItems(nav: NavController) {
      return this.httprequest.get(this.url.base + this.url.item,nav).then(result => {
          let items = result.json() as ITEM[];
          return items;
        })
    }

    getBuscarItem(cadena: String,nav: NavController) {
    return this.httprequest.get(this.url.base + this.url.item + this.url.buscar + cadena,nav)
    .then(result => {
          let items = result.json() as ITEM[];
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
      url+= this.url.itemupload
      //console.log(JSON.stringify(item))
      return this.httprequest.post(url, JSON.stringify(item),nav)
    }

    //obtener el codigo del ultimo item creado
    getUltimoCodItem(nav: NavController) {
      return this.httprequest.get(this.url.base + this.url.item,nav).then(result => {
          let items = result.json() as ITEM[];
          if (items.length == 0){
            return 0;
          }else{
            for (var item of items){
              item.Codigo;
            }
          return parseInt(item.Codigo);
        }
        })
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

    uploadImagen(url: string,file: File,nav: NavController) {
            return this.httprequest.patch(String(url), JSON.stringify(
            {
              Imagen: file
            }),nav).then(result => {return result});
    }
}
