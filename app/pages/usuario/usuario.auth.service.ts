import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Storage, LocalStorage} from 'ionic-angular';
import {PrincipalPage} from '../principal/principal';
import {Usuario} from '../usuario/usuario.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import {Url} from '../../url';
import {HttpRequest} from '../../httprequest';




@Injectable()
export class UsuarioAuthService {
    loggedIn: Boolean = false;
    local: Storage = new Storage(LocalStorage);
    url= new Url()
    httprequest:HttpRequest;

    constructor(private http: Http) {
      this.httprequest = new HttpRequest(http);
     }
    logout() {
        this.local.remove('auth');
    }
/*
    getUsuario(): Promise<Usuario[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url + '/auth/sign_in', JSON.stringify({ 'email': 'prueba@prueba.com', 'password': 'prueba1234' }),
            { headers: headers })
            .toPromise()
            .then(response => response.json().data)
            .catch(error => console.log('error'));
    }
*/
    isAuthenticated() {
      let result=false
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept','application/json')
      return this.local.get('auth').then(auth => {
        if(auth!=null){
          return this.http.post(this.url.base + this.url.verifyToken,'{"token": "' + JSON.parse(auth).token +'"}', { headers: headers }).toPromise();
        }
      }).then(verify => {
          if(verify) return true
          else return false;
      }).catch(error => {
          return false;
        });

    }

    getToken() {
        return this.local.get('auth').then(res => {
            return JSON.parse(res).token;
        }, err => {
            console.log("No existe el token");
            return null;
        });
    }

}
