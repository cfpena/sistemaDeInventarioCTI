import {Component, Input, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PrincipalPage} from '../principal/principal';
import {Usuario} from '../usuario/usuario.model';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';
import {Storage, LocalStorage} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {FORM_DIRECTIVES} from '@angular/common';
import {JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Url} from '../../url';
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [UsuarioAuthService],
  directives: [FORM_DIRECTIVES]
})
export class LoginPage implements OnInit{
  @Input()
  usuario = {
    usuario: '',
    clave: ''
  };
  //constantes para http
  url = new Url();
  authType: string = "login";
  contentHeader: Headers = new Headers({"Content-Type": "application/json"});
  jwtHelper: JwtHelper = new JwtHelper();
  user: string;

  usuarios: Usuario[];
  logged=false;
  errores={
    auth: '',
  };
  local: Storage = new Storage(LocalStorage);
  constructor(private http: Http,
              private nav:NavController,
              private usuarioService: UsuarioAuthService) {


        this.local.get('profile').then(profile => {
          this.user =profile;
        }).catch(error => {
          console.log(error);
        });

  }

  setUsuario(usuario:string,clave:string){
    this.usuario.usuario=usuario;
    this.usuario.clave=clave;
  }

  login() {

    this.http.post(this.url.base+this.url.token,JSON.stringify({username: this.usuario.usuario,password: this.usuario.clave}), { headers: this.contentHeader })
      .map(res => res)
      .subscribe(
        data => this.authSuccess(data),
        err => this.errores.auth="Usuario o clave incorrectos"
      );
  }
  isLoggedIn(){
    return this.logged;

  }


  authSuccess(data) {
    
    this.logged=true;
    this.errores.auth = null;
    this.local.setJson('auth',
            {'token': data.json().token
            }
          );
    this.nav.setRoot(PrincipalPage);
    this.usuarioService.loggedIn = true;

  }
  ngOnInit() {

    this.local.get('auth').then(auth => {
      if(auth!=null)
        this.nav.setRoot(PrincipalPage);
    }).catch(error => {
        console.log(error);
      });

}



}
