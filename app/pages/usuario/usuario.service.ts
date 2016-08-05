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
      //HEADERS OBLIGATORIOS PARA EL REQUEST DEFINIDOS POR EL ESTANDAR
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");
        //FUNCION ASINCRONICA QUE OBTIENE EL TOKEN DE LAS COOKIE
        // token => {} token es el valor obtenido y es pasado por referencia a la funncion por definir dentro de {}
        return this.usuarioAuthService.getToken().then(token => {
          //se agrega el header Authorization con el token respectivo para la autenticacion
            headers.append('Authorization', 'JWT ' + token);
            //se envia el request http de tipo get con la url, y los headers y se la convierte en una promesa
            //si no se hace return, no se puede hacer un then
            return this.http.get(this.url.base + this.url.usuario, { headers: headers }).toPromise();
            //cuando la funcion haya terminado de traer los datos pasa a la seccion then()
        }).then(result => {
          //convertimos el resultado que es un json con los usuarios a un arreglo del modelo Usuarios
          let usuarios = result.json() as Usuario[];
          return usuarios;
          //si existe un error, no pasa por then, sino por catch
        }).catch(error=>{
          console.log(error)
        });;
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

        }).catch(error=>{
          console.log(error)
        });
    }
    eliminarUsuario(usuario: Usuario) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");

        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            //request del tipo delete para eliminar, se envia la url que ya la contiene el mismo modelo
            return this.http.delete(usuario.url.toString(), { headers: headers }).toPromise();
        }).then(result => {
          return result;
        }).catch(error=> console.log(error));
    }
    llenarTipo(usuario: Usuario){
      //usuario contiene una relacion con tipo de usuario, al obtener los usuarios del servidor solo
      //se obtienen los datos del usuario y persona pero no los datos de las relaciones, el campo que contiene la relacion
      //en este caso group, dentro de la relacion usuario es de esta manera (Persona=>Usuario=>Grupo)
      //por lo tanto el campo group solo tiene la url y hay que pedir el resto de los datos al servidor
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
          //para el metodo post se debe pasar los parametros con formato JSON pero de tipo string
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
