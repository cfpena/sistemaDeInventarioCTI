import {Component, Input, OnInit} from '@angular/core';
import {NavController,Toast} from 'ionic-angular';
import {PrincipalPage} from '../principal/principal';
import {InventarioPage} from '../inventario/inventario';
import {Usuario} from '../usuario/usuario.model';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';
import {Storage, LocalStorage} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {FORM_DIRECTIVES} from '@angular/common';
import 'rxjs/add/operator/map';
import {Url} from '../../url';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
@Component({
    templateUrl: 'build/pages/login/login.html',
    providers: [UsuarioAuthService],
    directives: [FORM_DIRECTIVES]
})
export class LoginPage implements OnInit {
    @Input()
    usuario = {
        usuario: '',
        clave: ''
    };
    url = new Url();
    usuarios: Usuario[];

    errores = {
        auth: '',
    };
    local: Storage = new Storage(LocalStorage);
    constructor(private http: Http,
        private nav: NavController,
        private usuarioAuthService: UsuarioAuthService) {}

    setUsuario(usuario: string, clave: string) {
        this.usuario.usuario = usuario;
        this.usuario.clave = clave;
    }

    login() {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept','application/json')
        this.http.post(this.url.base + this.url.token,
          JSON.stringify({username: this.usuario.usuario,password: this.usuario.clave }), { headers: headers })
            .map(res => res)
            .subscribe(
            data => this.authSuccess(data),
            err => {this.errores.auth = "Usuario o clave incorrectos";
                    console.log(err)}
            );
    }

    authSuccess(data) {
        console.log(data.json().token)
        this.nav.setRoot(InventarioPage);
        this.errores.auth = null;
        this.local.setJson('auth',{token: data.json().token});
        this.presentToast("Acceso exitoso")

    }
    ngOnInit() {
        this.usuarioAuthService.isAuthenticated().then(result => {
            if (result) this.nav.setRoot(InventarioPage);
        });
    }

    presentToast(text: string) {
        let toast = Toast.create({
            message: text,
            duration: 3000
        });

        toast.onDismiss(() => {
            console.log('Dismissed toast');
        });
        this.nav.present(toast);
    }



}

declare var Auth0Lock;

@Component({
  selector: 'app',
  template: `
    <h1>Welcome to Angular2 with Auth0</h1>
    <button *ngIf="!loggedIn()" (click)="login()">Login</button>
    <button *ngIf="loggedIn()" (click)="logout()">Logout</button>
  `
})

export class AuthApp {

  lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_AUTH0_DOMAIN');

  constructor() {}

  login() {
    var hash = this.lock.parseHash();
    if (hash) {
      if (hash.error)
        console.log('There was an error logging in', hash.error);
      else
        this.lock.getProfile(hash.id_token, function(err, profile) {
          if (err) {
            console.log(err);
            return;
          }
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('id_token', hash.id_token);
        });
    }
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
