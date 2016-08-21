import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Url} from '../../url';
import {Kit} from './kit.model';
import {ITEM} from '../item/item.model';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';


@Injectable()
export class KitService {
    url = new Url();

    constructor(private http: Http,
        private usuarioAuthService: UsuarioAuthService) { }


        getKits() {
          let headers = new Headers({ "Content-Type": "application/json" });
          headers.append("Accept","application/json");
            return this.usuarioAuthService.getToken().then(token => {
                headers.append('Authorization', 'JWT ' + token);
                return this.http.get(this.url.base + this.url.kit, { headers: headers }).toPromise();
            }).then(result => {
              let kits = result.json() as Kit[];
              return kits;
            }).catch(error=>{
              console.log(error)
            });;
        }


    getBuscar(cadena: String) {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");

        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.get(this.url.base + this.url.kit + this.url.buscar + cadena , { headers: headers }).toPromise();

        }).then(result => {
          let kits = result.json() as Kit[];
          return kits;

        }).catch(error=>{
          console.log(error)
        });
    }



    eliminarKit(kit: Kit) {
      //let Url = this.url.base + this.url.kit + kit.id.toString() + '/';
      console.log(Url)
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");

        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            //request del tipo delete para eliminar, se envia la url que ya la contiene el mismo modelo
            return this.http.delete(String(kit.url), { headers: headers }).toPromise();

        }).then(result => {
          return result;
        }).catch(error=> console.log(error));
    }


    createKit(kit: Kit) {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.post(this.url.base + this.url.kit, JSON.stringify(kit),{ headers: headers }).toPromise();
        }).then(result=> console.log(result)).catch(error => console.log(error));
    }


    agregarItem(item: ITEM) {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.post(this.url.base + this.url.kitelemento, JSON.stringify(item),{ headers: headers }).toPromise();
        }).then(result=> console.log(result)).catch(error => console.log(error));
    }

    updateKit(kit: Kit) {
      let Url = this.url.base + this.url.kit + kit.id.toString() + '/';
      console.log(Url)
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.patch(Url, JSON.stringify(kit),{ headers: headers }).toPromise();

        }).then(result => {return result});


    }


}
