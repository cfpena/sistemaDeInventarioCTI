import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Storage, LocalStorage} from 'ionic-angular';

@Injectable()
export class UsuarioService {
  private loggedIn = false;
  local: Storage = new Storage(LocalStorage);

  login(usuario,clave){

    if(usuario == 'admin' && clave == 'admin')
      this.loggedIn=true;
    this.authSuccess();
    return this.loggedIn;
  }
  logout(){
    this.loggedIn=false;
    this.authSuccess();
  }
  isLoggedIn(){
    this.local.get('auth').then(auth => {
      this.loggedIn=auth;
    }).catch(error => {
      this.loggedIn=false,
      console.log(error);
    });
    return this.loggedIn;
  }
  authSuccess(){
    this.local.set('auth', this.loggedIn);
  }
}
