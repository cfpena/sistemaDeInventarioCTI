import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Storage, LocalStorage} from 'ionic-angular';
import {PrincipalPage} from '../principal/principal';
import {Usuario} from '../usuario/usuario.model';



import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsuarioService {
  loggedIn: Boolean= false;
  local: Storage = new Storage(LocalStorage);
  test: string = 'a';
  url: string = 'http://162.243.83.72:8080'

  constructor(private http: Http) { }
  login(usuario: string,clave: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');



    return this.http.post(this.url + '/auth/sign_in', JSON.stringify({'email':usuario,'password':clave}), { headers: headers })
    .toPromise()
               .then(res => res.json().data)
               .catch(error => error);
  }
  getUsuario(): Promise<Usuario[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  return this.http.post(this.url + '/auth/sign_in', JSON.stringify({'email':'prueba@prueba.com','password':'prueba1234'}),
   { headers: headers })
             .toPromise()
             .then(response => response.json().data)
             .catch(error => console.log('error'));
}
  logout(){
    this.loggedIn=false;
    this.local.remove('auth');
  }
  isLoggedIn(){
    this.local.get('auth').then(auth => {this.test="hola"}).catch(error => {
      console.log(error);
    }) ;
    console.log(this.test);
    return this.loggedIn;



  }

}
