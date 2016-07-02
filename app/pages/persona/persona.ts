import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import {Persona} from '../persona/persona.model';
import {CrearPersonaPage} from '../crear_persona/crear_persona';
/*
  Generated class for the PersonaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/persona/persona.html',
})
export class PersonaPage {
  personas=PERSONAS;
  title: string ='Personas';
  constructor(private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }

  goCrearPersona(){
      this._navController.push(CrearPersonaPage,{});
      this._navController.setRoot(CrearPersonaPage);
    }
}


const PERSONAS: Persona[]=[
  {id: 1,  cedula:'0912345678', nombre: 'Nombre 1',  apellido: 'Apellidos 1',  correo: 'na1@asd.com', funcion:'estudiante', telefono: '04-6025888', celular: ' ', genero: 'M'},
  {id: 2,  cedula:'0912345674',  nombre: 'Nombre 2', apellido: 'Apellidos 2',  correo: 'na2@asd.com', funcion:'ayudante', telefono: '04-6025888', celular: ' ', genero: 'M'},
  {id: 3,  cedula:'0912345675',  nombre: 'Nombre 3', apellido: 'Apellidos 3',  correo: 'na3@asd.com', funcion:'estudiante', telefono: '04-6025888', celular: ' ', genero: 'F'}

]
