import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import {CrearUsuarioPage} from '../crear_usuario/crear_usuario';
/*
  Generated class for the UsuarioPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/usuario/usuario.html',
})
export class UsuarioPage {
  title: string ='Usuarios';
  constructor(private _navController:NavController,private menu: MenuController) {}
openMenu(){
  this.menu.open();
}

  goCrearUsuario(){
    this._navController.push(CrearUsuarioPage,{});
    this._navController.setRoot(CrearUsuarioPage);
  }
}
