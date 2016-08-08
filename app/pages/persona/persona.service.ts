import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';


import { Persona } from './persona.model';
import {Url} from '../../url';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';

@Injectable()
export class PersonaService {
    url = new Url();

    constructor(private http: Http,
        private usuarioAuthService: UsuarioAuthService) { }

    getPersonas() {
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
            return this.http.get(this.url.base + this.url.persona, { headers: headers }).toPromise();
            //cuando la funcion haya terminado de traer los datos pasa a la seccion then()
        }).then(result => {
          //convertimos el resultado que es un json con los usuarios a un arreglo del modelo Usuarios
          let personas = result.json() as Persona[];
          return personas;
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
            return this.http.get(this.url.base + this.url.persona + this.url.buscar + cadena , { headers: headers }).toPromise();

        }).then(result => {
          let personas = result.json() as Persona[];
          return personas;

        }).catch(error=>{
          console.log(error)
        });
    }
    eliminarPersona(persona: Persona) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");

        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            //request del tipo delete para eliminar, se envia la url que ya la contiene el mismo modelo
            return this.http.delete(persona.url.toString(), { headers: headers }).toPromise();
        }).then(result => {
          return result;
        }).catch(error=> console.log(error));
    }

    createPersona(persona: Persona, credenciales: any) {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.post(this.url.base + this.url.persona, JSON.stringify(persona),{ headers: headers }).toPromise();

        }).then(result => {
          //para el metodo post se debe pasar los parametros con formato JSON pero de tipo string
          return this.http.post(this.url.base + this.url.password, JSON.stringify({"persona": persona.correo,"password1": credenciales.clave, "password2":credenciales.clave2}),{ headers: headers }).toPromise();
        }).then(result=> console.log(result)).catch(error => console.log(error));
    }

    updatePersona(persona: Persona) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.patch(String(persona.url), JSON.stringify({Nombre: persona.nombre,Apellido: persona.apellido,Correo: persona.correo,Funcion: persona.funcion,Telefono: persona.telefono,Celular: persona.celular,Genero: persona.genero}),{ headers: headers }).toPromise();

        }).then(result => {return result});


    }


}
