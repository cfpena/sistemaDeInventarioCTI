import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PrincipalPage} from '../principal/principal';
import {USUARIO} from '../usuario/usuario.model';
import {UsuarioService} from '../usuario/usuario.auth.service';
import {Storage, LocalStorage} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [UsuarioService],
})
export class LoginPage {
  @Input()
  usuario: USUARIO  = {
    id: 0,
    nombre: '',
    usuario: '',
    clave: ''
  };
  errores={
    auth: '',
  };
  local: Storage = new Storage(LocalStorage);
  constructor(private _navController:NavController,
              private usuarioService: UsuarioService) {

                this.local.get('auth').then(auth => {
                  if(auth=='true') this.goPrincipal();
                  console.log(auth)
                }).catch(error => {
                  console.log(error);
                });


  }
  login(){
        this.usuarioService.login(this.usuario.usuario,this.usuario.clave);
        if (this.usuarioService.isLoggedIn()) this.goPrincipal();
        else this.errores.auth='Usuario o clave incorrectos';
  }
  goPrincipal(){
        this._navController.push(PrincipalPage,{});
        this._navController.setRoot(PrincipalPage);
      }
}
