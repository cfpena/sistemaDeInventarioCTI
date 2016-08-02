import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';


import { Usuario } from './usuario.model';
import {Url} from '../../url';
import {UsuarioAuthService} from './usuario.auth.service';

@Injectable()
export class UsuarioService {
    url = new Url();
    headers = new Headers({ "Content-Type": "application/json" });
    constructor(private http: Http,
        private usuarioAuthService: UsuarioAuthService) { }

    getUsuarios() {
        return this.usuarioAuthService.getToken().then(token => {
            this.headers.append('Authorization', 'JWT ' + token);
            return this.http.get(this.url.base + this.url.usuario, { headers: this.headers }).toPromise();

        }).then(result => {
            return result.json() as Usuario[];
        });
    }
}
