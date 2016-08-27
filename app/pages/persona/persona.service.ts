import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Persona } from './persona.model';
import {Url} from '../../url';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';
import {UsuarioService} from '../usuario/usuario.service';
import {HttpRequest} from '../../httprequest';
import {NavController} from 'ionic-angular';

@Injectable()
export class PersonaService {
    url = new Url();
    httprequest:HttpRequest;

    constructor(private http: Http,  private usuarioService: UsuarioService,
        private usuarioAuthService: UsuarioAuthService) {
        this.httprequest = new HttpRequest(http);}

        getPersonas(nav: NavController) {
  //        console.log('get persona')
          return this.httprequest.get(this.url.base + this.url.persona,nav).then(result => {
              let personas = result.json() as Persona[];
              return personas;
            })
        }


    getBuscar(cadena: String, nav) {

      return this.httprequest.get(this.url.base + this.url.persona + this.url.buscar + cadena.toString(),nav).then(result => {
          let personas = result.json() as Persona[];
          return personas;
        })
    }

    createPersona(persona: Persona,nav: NavController) {
      return this.httprequest.post(this.url.base + this.url.persona, JSON.stringify({
                Nombre: persona.Nombre,
                Apellido: persona.Apellido,
                Email: persona.Email,
                Telefono: persona.Telefono,
                Genero: persona.Genero,
                CI : persona.CI,
                Direccion : persona.Direccion,
                Tipo : persona.Tipo,
                Matricula : persona.Matricula
              }),nav)
              .then(result => {return result});
             }

    updatePersona(persona: Persona,nav: NavController) {

    return this.httprequest.patch(String(persona.url), JSON.stringify({
              Nombre: persona.Nombre,
              Apellido: persona.Apellido,
              Email: persona.Email,
              Telefono: persona.Telefono,
              Genero: persona.Genero,
              CI : persona.CI,
              Direccion : persona.Direccion,
              Tipo : persona.Tipo,
              Matricula : persona.Matricula
            }),nav)
            .then(result => {return result});
           }



    eliminarPersona(persona: Persona,nav:NavController) {

      return this.httprequest.delete(persona.url.toString(),nav)
    }


}
