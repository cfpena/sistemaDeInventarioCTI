import {Component, Input, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PrincipalPage} from '../principal/principal';
import {Usuario} from '../usuario/usuario.model';
import {UsuarioService} from '../usuario/usuario.auth.service';
import {Storage, LocalStorage} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {FORM_DIRECTIVES} from '@angular/common';
import {JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [UsuarioService],
  directives: [FORM_DIRECTIVES]
})
export class LoginPage implements OnInit{
  @Input()
  usuario = {
    usuario: '',
    clave: ''
  };
  //constantes para http
  URL: string = "http://162.243.83.72:8080";
  LOGIN_URL: string = "/auth/sign_in";
  SIGNUP_URL: string = "/auth/sign_up";
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
              private usuarioService: UsuarioService) {


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

    this.http.post(this.URL + this.LOGIN_URL, JSON.stringify({'email': this.usuario.usuario,'password': this.usuario.clave}), { headers: this.contentHeader })
      .map(res => res)
      .subscribe(
        data => this.authSuccess(data),
        err => this.errores.auth = 'Usuario o clave incorrectos'
      );
  }
  isLoggedIn(){
    return this.logged;

  }
  signup() {
    this.http.post(this.SIGNUP_URL, JSON.stringify(JSON.stringify({'username': this.usuario.usuario,'password': this.usuario.clave})), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
        data => this.authSuccess(data.id_token),
        err => this.errores.auth = err
      );
  }

  authSuccess(data) {
    this.logged=true;
    this.errores.auth = null;
    this.local.setJson('token',
            {'access-token': data.headers.toJSON()['access-token'][0],
              'client': data.headers.toJSON()['client'][0],
              'uid': data.headers.toJSON()['uid'][0]
            }
          );
    this.local.setJson('profile', data.json().data);
    this.user = data.json().data;
    this.nav.setRoot(PrincipalPage);
    this.usuarioService.loggedIn = true;

  }
  ngOnInit() {

    this.local.getJson('profile').then(profile => {
      if(profile!=null)
        this.nav.setRoot(PrincipalPage);
    }).catch(error => {
        console.log(error);
      });

}



}
