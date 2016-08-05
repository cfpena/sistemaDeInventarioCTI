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

        this.http.post(this.url.base + this.url.token, JSON.stringify({username: this.usuario.usuario,password: this.usuario.clave }), { headers: this.url.header })
            .map(res => res)
            .subscribe(
            data => this.authSuccess(data),
            err => {this.errores.auth = "Usuario o clave incorrectos";
                    console.log(err)}
            );
    }

    authSuccess(data) {
        console.log(data.json().token)
        this.nav.setRoot(PrincipalPage);
        this.errores.auth = null;
        this.local.setJson('auth',{token: data.json().token});

    }
    ngOnInit() {
        this.usuarioAuthService.isAuthenticated().then(result => {
            if (result) this.nav.setRoot(PrincipalPage);
        });
    }



}
