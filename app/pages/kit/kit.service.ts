import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Url} from '../../url';
import {Kit} from './kit.model';
import {KitDetalle} from './kit.model';
import {ITEM} from '../item/item.model';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';
import {HttpRequest} from '../../httprequest';
import {NavController} from 'ionic-angular';

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

    llenarKitDetalle(kitdet: any,nav: NavController){
      return this.httprequest.get(String(kitdet),nav).then(result=>{
        return kitdet =  result.json() as KitDetalle;
      });
    }

    llenarItem(item: any,nav: NavController){
      return this.httprequest.get(String(item),nav).then(movdet=>{
        return item =  movdet.json() as ITEM;
      });
    }

    eliminarKit(kit: Kit, nav: NavController) {
      //return this.httprequest.delete(String(kit.url),nav)
      return this.httprequest.delete(kit.url.toString(),nav)
    }


/*  createKit(kit: Kit,nav: NavController) {
    return this.httprequest.post(this.url.base + this.url.kit, JSON.stringify(kit),nav)
  }*/

  createKit(kit: Kit,nav: NavController) {
    return this.httprequest.post(this.url.base + this.url.kit, JSON.stringify(kit),nav).then(result=>{
      let kit = result.json() as Kit
      return kit
    })

  }

  //obtener el codigo del ultimo item creado
  getUltimoCodKit(nav: NavController) {
    return this.httprequest.get(this.url.base + this.url.kit, nav).then(result => {
        let kits = result.json() as Kit[];
        if (kits.length == 0){
          return 8000;
        }else{
          for (var kit of kits){
            kit.Codigo;
          }
        return parseInt(kit.Codigo);
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
        KitDetalle: kit.KitDetalle

      })
      return this.httprequest.patch(String(kit.url),json ,nav)
      .then(result => {return result});
    }




  }
