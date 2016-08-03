import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';


import { Usuario,Group } from './usuario.model';
import {Url} from '../../url';
import {UsuarioAuthService} from './usuario.auth.service';

@Injectable()
export class UsuarioService {
    url = new Url();

    constructor(private http: Http,
        private usuarioAuthService: UsuarioAuthService) { }

    getUsuarios() {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");

        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.get(this.url.base + this.url.usuario, { headers: headers }).toPromise();

        }).then(result => {
          let usuarios = result.json() as Usuario[];

          for(var usuario of usuarios){
            this.http.get(String(usuario.Usuario.groups[0]), { headers: headers }).toPromise()
            .then(group => usuario.Usuario.groups[0]= group.json() as Group);
          }
          return usuarios;
        });
    }
    llenarTipo(usuario: Usuario){

    }
    createUsuario(usuario: Usuario) {
        return this.usuarioAuthService.getToken().then(token => {
        
            let headers = new Headers({ "Content-Type": "application/json" });
            headers.append('Accept','application/json');

            headers.append('Authorization', 'JWT ' + token);
            return this.http.post(this.url.base + this.url.usuario, JSON.stringify(usuario),{ headers: headers }).toPromise();

        }).then(result => {
          console.log(result)
        }).catch(error => console.log(error));
    }

    getTipos() {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');

        return this.usuarioAuthService.getToken().then(token => {

            headers.append('Authorization', 'JWT ' + token);
            return this.http.get(this.url.base + this.url.tiposUsuarios, { headers: headers }).toPromise();

        }).then(result => {
          let tipos = result.json() as Group[];
          console.log(tipos);
          return tipos;
        });
    }
}
