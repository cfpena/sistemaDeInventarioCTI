import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Url} from '../../url';
import {Kit} from './kit.model';
import {ITEM} from '../item/item.model';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';
import {HttpRequest} from '../../httprequest';
import {NavController} from 'ionic-angular';
import {KITELEMENTO} from './kitelemento.model';

@Injectable()
export class KitService {
    url = new Url();
    httprequest:HttpRequest;

    constructor(private http: Http,
        private usuarioAuthService: UsuarioAuthService) {
          this.httprequest = new HttpRequest(http);
        }

        getKits(nav: NavController) {
          return this.httprequest.get(this.url.base + this.url.kit,nav).then(result => {
              let kits = result.json() as Kit[];
              return kits;
            })
        }

    getBuscar(cadena: String, nav: NavController) {
    return this.httprequest.get(this.url.base + this.url.kit + this.url.buscar + cadena,nav)
    .then(result => {
      let kits = result.json() as Kit[];
      return kits;

        }).catch(error=>{
          console.log(error)
        });
    }

    eliminarKit(kit: Kit, nav: NavController) {
            return this.httprequest.delete(String(kit.url),nav)
    }

    /*
    createKit(kit: Kit,nav: NavController) {
          return this.httprequest.post(this.url.base + this.url.kit, JSON.stringify(kit),nav)
    }*/

    createKit(kit: Kit,lista: KITELEMENTO[],nav: NavController) {
    //  this.httprequest.post(this.url.base + this.url.kit, JSON.stringify(kit),nav):
      //this.httprequest.post(this.url.base + this.url.kitelemento, JSON.stringify(kit),nav)

      return this.httprequest.post(this.url.base + this.url.kit, JSON.stringify(kit),nav).then(result=>{
          let kit = result.json() as Kit
          for(let kitelemento of lista){
            kitelemento.Kit=kit.url
            console.log(JSON.stringify(kitelemento))
            this.httprequest.post(this.url.base + this.url.kitelemento,JSON.stringify(kitelemento),nav)
          }
      })

    }


    updateKit(kit: Kit, nav: NavController) {
      let json=JSON.stringify(
      {
        Nombre: kit.Nombre,
        Marca: kit.Marca,
        Modelo: kit.Modelo,
        Descripcion: kit.Descripcion,
        Dispositivos: kit.Dispositivos

      })
            return this.httprequest.patch(String(kit.url),json ,nav)
            .then(result => {return result});
    }




}
