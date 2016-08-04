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
            console.log(headers)
            return this.http.get(this.url.base + this.url.usuario, { headers: headers }).toPromise();

        }).then(result => {
          let usuarios = result.json() as Usuario[];
          return usuarios;
        });
    }
    getBuscar(cadena: String) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");

        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.get(this.url.base + this.url.usuario + this.url.buscar + cadena , { headers: headers }).toPromise();

        }).then(result => {
          let usuarios = result.json() as Usuario[];
          return usuarios;
        });
    }
    eliminarUsuario(usuario: Usuario) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");

        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.delete(usuario.url.toString(), { headers: headers }).toPromise();
        }).then(result => {
          return result;
        }).catch(error=> console.log(error));
    }
    llenarTipo(usuario: Usuario){
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");
      return this.usuarioAuthService.getToken().then(token => {
          headers.append('Authorization', 'JWT ' + token);
      return this.http.get(String(usuario.Usuario.groups[0]), { headers: headers }).toPromise();
    }).then(tipo=>{
      usuario.Usuario.groups[0] =  tipo.json() as Group;
    });

    }
    createUsuario(usuario: Usuario, credenciales: any) {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {




            headers.append('Authorization', 'JWT ' + token);
            return this.http.post(this.url.base + this.url.usuario, JSON.stringify(usuario),{ headers: headers }).toPromise();

        }).then(result => {

          return this.http.post(this.url.base + this.url.password, JSON.stringify({"user": usuario.Email,"password1": credenciales.clave, "password2":credenciales.clave2}),{ headers: headers }).toPromise();
        }).then(result=> console.log(result)).catch(error => console.log(error));
    }

    updateUsuario(usuario: Usuario) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {




            headers.append('Authorization', 'JWT ' + token);
            return this.http.patch(String(usuario.url), JSON.stringify({Nombre: usuario.Nombre,Apellido: usuario.Apellido}),{ headers: headers }).toPromise();

        }).then(result => {return result});


    }

    getTipos() {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');

        return this.usuarioAuthService.getToken().then(token => {

            headers.append('Authorization', 'JWT ' + token);
            return this.http.get(this.url.base + this.url.tiposUsuarios, { headers: headers }).toPromise();

        }).then(result => {
          let tipos = result.json() as Group[];

          return tipos;
        });
    }
}
