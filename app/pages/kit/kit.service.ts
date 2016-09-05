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
      console.log('llenar kitdet')
      return this.httprequest.get(String(kitdet),nav).then(result=>{
        return kitdet =  result.json() as KitDetalle;
      });
    }

    llenarItem(item: any,nav: NavController){
      console.log('llenar item')
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

  createKit(kit: Kit,lista: KitDetalle[],nav: NavController) {
    kit.KitDetalle =[];
    return this.httprequest.post(this.url.base + this.url.kit, JSON.stringify(kit),nav).then(result=>{
      let kit = result.json() as Kit
      for(let kitdet of lista){
        kitdet.Cantidad = Number(kitdet.Cantidad)
        kitdet.Item = kitdet.Item.url
        console.log(JSON.stringify(kitdet))
        this.httprequest.post(this.url.base + this.url.kitDetalle,JSON.stringify(kitdet),nav).then(result =>{
          let kitdetalle = result.json() as KitDetalle
          kit.KitDetalle.push(kitdetalle)
          return this.httprequest.patch(String(kit.url),JSON.stringify(kit), nav).then(result => {return result});
        })
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
