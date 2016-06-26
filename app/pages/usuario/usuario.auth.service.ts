import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Storage, LocalStorage} from 'ionic-angular';

@Injectable()
export class UsuarioService {
  loggedIn: Boolean= false;
  local: Storage = new Storage(LocalStorage);
  test: string = 'a';

  login(usuario,clave){

    if(usuario == 'admin' && clave == 'admin'){
      this.loggedIn=true;
      this.local.set('auth', true);
      }
    return this.loggedIn;
  }
  logout(){
    this.loggedIn=false;
    this.local.set('auth', false);
  }
  isLoggedIn(){
    this.local.get('auth').then(auth => {this.test="hola"}).catch(error => {
      console.log(error);
    }) ;
    console.log(this.test);
    return this.loggedIn;



  }

}
