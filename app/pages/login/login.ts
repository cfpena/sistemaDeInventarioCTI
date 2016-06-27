import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PrincipalPage} from '../principal/principal';
import {Usuario} from '../usuario/usuario.model';
import {UsuarioService} from '../usuario/usuario.auth.service';
import {Storage, LocalStorage} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [UsuarioService],
})
export class LoginPage {
  @Input()
  usuario = {
    usuario: '',
    clave: ''
  };
  usuarios: Usuario[];
  errores={
    auth: '',
  };
  local: Storage = new Storage(LocalStorage);
  constructor(private _navController:NavController,
              private usuarioService: UsuarioService) {

  }
  login(){

      this.usuarioService.getUsuario()
      .then(usuario => {this.usuarios=usuario})
      .catch(error => error);


      this.usuarioService.login(this.usuario.usuario,this.usuario.clave)
        .then(res => {
          if(res.uid!=null) this._navController.setRoot(PrincipalPage);
          else this.errores.auth = 'Usuario o contraseña incorrectos';
        }).catch(
          error => error);

  }

}
