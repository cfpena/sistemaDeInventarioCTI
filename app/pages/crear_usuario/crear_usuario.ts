import {Component} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';
import {UsuarioPage} from '../usuario/usuario';

@Component({
  templateUrl: 'build/pages/crear_usuario/crear_usuario.html'
})
export class CrearUsuarioPage {

  constructor(private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }

  cancelar(){
    this._navController.push(UsuarioPage,{});
    this._navController.setRoot(UsuarioPage);
  }

}
