import {Component} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';
import {PersonaPage} from '../persona/persona';

@Component({
  templateUrl: 'build/pages/crear_persona/crear_persona.html'
})
export class CrearPersonaPage {

  constructor(private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }

  cancelar(){
    this._navController.push(PersonaPage,{});
    this._navController.setRoot(PersonaPage);
  }

}
