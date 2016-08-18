import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Url} from '../../url';
import {ITEM} from './item.model';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';


@Injectable()
export class ItemService {
    url = new Url();

    constructor(private http: Http,
        private usuarioAuthService: UsuarioAuthService) { }

    getElementos() {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.get(this.url.base + this.url.elemento, { headers: headers }).toPromise();
        }).then(result => {
          let items = result.json() as ITEM[];
          return items;
        }).catch(error=>{
          console.log(error)
        });;
    }

    getDispositivos() {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.get(this.url.base + this.url.dispositivo, { headers: headers }).toPromise();
        }).then(result => {
          let items = result.json() as ITEM[];
          for(var item of items){
            item.Es_Dispositivo=true;
          }
          return items;
        }).catch(error=>{
          console.log(error)
        });;
    }

    getBuscarElemento(cadena: String) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");

        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.get(this.url.base + this.url.elemento + this.url.buscar + cadena , { headers: headers }).toPromise();

        }).then(result => {
          let items = result.json() as ITEM[];
          return items;

        }).catch(error=>{
          console.log(error)
        });
    }
    getBuscarDispositivo(cadena: String) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");

        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.get(this.url.base + this.url.dispositivo + this.url.buscar + cadena , { headers: headers }).toPromise();

        }).then(result => {
          let items = result.json() as ITEM[];
          return items;

        }).catch(error=>{
          console.log(error)
        });
    }
    eliminarItem(item: ITEM) {

      console.log(Url)
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");

        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            //request del tipo delete para eliminar, se envia la url que ya la contiene el mismo modelo
            return this.http.delete(String(item.url), { headers: headers }).toPromise();
        }).then(result => {
          return result;
        }).catch(error=> console.log(error));
    }

    createItem(item: ITEM) {
      let url = this.url.base
      url+= item.Es_Dispositivo ? this.url.dispositivo:this.url.elemento

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.post(url, JSON.stringify(item),{ headers: headers }).toPromise();

        }).then(result=> console.log(result)).catch(error => console.log(error));
    }


    updateItem(item: ITEM) {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.patch(String(item.url), JSON.stringify(
            {
              Nombre: item.Nombre,
              Marca: item.Marca,
              Modelo: item.Modelo,
              CodigoEspol: item.CodigoEspol,
              CodigoSenecyt: item.CodigoSenecyt,
              Descripcion: item.Descripcion
            }),{ headers: headers }).toPromise();
        }).then(result => {return result});
    }
}
