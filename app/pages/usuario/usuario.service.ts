import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {NavController} from 'ionic-angular';
import { Usuario,Group } from './usuario.model';
import {Url} from '../../url';
import {UsuarioAuthService} from './usuario.auth.service';
import {HttpRequest} from '../../httprequest';


@Injectable()
export class UsuarioService {
    url = new Url();
    httprequest:HttpRequest;

    constructor(private http: Http,
        private usuarioAuthService: UsuarioAuthService) {
          this.httprequest = new HttpRequest(http);
        }


    getUsuarios(nav: NavController) {

      return this.httprequest.get(this.url.base + this.url.usuario,nav).then(result => {
          let usuarios = result.json() as Usuario[];
          return usuarios;
        })
    }

    getBuscar(cadena: String, nav) {

      return this.httprequest.get(this.url.base + this.url.usuario + this.url.buscar + cadena.toString(),nav).then(result => {
          let usuarios = result.json() as Usuario[];
          return usuarios;
        })
    }
    eliminarUsuario(usuario: Usuario,nav:NavController) {

            return this.httprequest.delete(usuario.url.toString(),nav)
    }
    llenarTipo(usuario: Usuario,nav: NavController){
      return this.httprequest.get(String(usuario.groups[0]),nav).then(tipo=>{
      usuario.groups[0] =  tipo.json() as Group;
    });

    }
    createUsuario(usuario: Usuario, credenciales: any, nav: NavController) {
    return this.httprequest.post(this.url.base + this.url.usuario, JSON.stringify(usuario),nav).then(result => {
          return this.httprequest.post(this.url.base + this.url.password,
             JSON.stringify({"user": usuario.Email,"password1": credenciales.clave, "password2":credenciales.clave2}),nav)})
    }

    updateUsuario(usuario: Usuario,nav: NavController) {

    return this.httprequest.patch(String(usuario.url),
     JSON.stringify({Nombre: usuario.Nombre,Apellido: usuario.Apellido}),nav)
     .then(result => {return result});
    }

    getTipos(nav: NavController) {
            return this.httprequest.get(this.url.base + this.url.tiposUsuarios, nav).then(result => {
          let tipos = result.json() as Group[];
          return tipos;
        });
    }

    CompararEmail(cadena: String,nav: NavController) {
      return this.httprequest.get(this.url.base + this.url.usuario,nav).then(result => {
          let usuarios = result.json() as Usuario[];
          for(var usuario of usuarios){
            console.log(usuario.Email);
            console.log(cadena);
            if(usuario.Email == cadena){
              return true}
          }
      return false
      //    load.dismiss() //cuando termina el request, se elimina el loading
        })

    }



}
