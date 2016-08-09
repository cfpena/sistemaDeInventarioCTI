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

    getItems() {
      //HEADERS OBLIGATORIOS PARA EL REQUEST DEFINIDOS POR EL ESTANDAR
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");
        //FUNCION ASINCRONICA QUE OBTIENE EL TOKEN DE LAS COOKIE
        // token => {} token es el valor obtenido y es pasado por referencia a la funncion por definir dentro de {}
        return this.usuarioAuthService.getToken().then(token => {
          //se agrega el header Authorization con el token respectivo para la autenticacion
            headers.append('Authorization', 'JWT ' + token);
            //se envia el request http de tipo get con la url, y los headers y se la convierte en una promesa
            //si no se hace return, no se puede hacer un then
            return this.http.get(this.url.base + this.url.item, { headers: headers }).toPromise();
            //cuando la funcion haya terminado de traer los datos pasa a la seccion then()
        }).then(result => {
          //convertimos el resultado que es un json con los usuarios a un arreglo del modelo Usuarios
          let items = result.json() as ITEM[];
          return items;
          //si existe un error, no pasa por then, sino por catch
        }).catch(error=>{
          console.log(error)
        });;
    }

    getBuscar(cadena: String) {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");

        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.get(this.url.base + this.url.item + this.url.buscar + cadena , { headers: headers }).toPromise();

        }).then(result => {
          let items = result.json() as ITEM[];
          return items;

        }).catch(error=>{
          console.log(error)
        });
    }
    eliminarItem(item: ITEM) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");

        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            //request del tipo delete para eliminar, se envia la url que ya la contiene el mismo modelo
            return this.http.delete(item.url.toString(), { headers: headers }).toPromise();
        }).then(result => {
          return result;
        }).catch(error=> console.log(error));
    }

    createItem(item: ITEM) {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.post(this.url.base + this.url.item, JSON.stringify(item),{ headers: headers }).toPromise();

        }).then(result => {
          //para el metodo post se debe pasar los parametros con formato JSON pero de tipo string
          return this.http.post(this.url.base + this.url.password, JSON.stringify({
            Codigo: item.Codigo,
            Nombre: item.Nombre,
            Marca: item.Marca,
            Modelo: item.Modelo,
            Is_dispositivo: item.Is_dispositivo,
            Is_kit: item.Is_kit,
            Stock: item.Stock,
            Images: item.Images,
            Items: item.Items}),{ headers: headers }).toPromise();
        }).then(result=> console.log(result)).catch(error => console.log(error));
    }

    updateItem(item: ITEM) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.patch(String(item.url), JSON.stringify({
              Codigo: item.Codigo,
              Nombre: item.Nombre,
              Marca: item.Marca,
              Modelo: item.Modelo,
              Is_dispositivo: item.Is_dispositivo,
              Is_kit: item.Is_kit,
              Stock: item.Stock,
              Images: item.Images,
              Items: item.Items}),{ headers: headers }).toPromise();

        }).then(result => {return result});


    }


}
