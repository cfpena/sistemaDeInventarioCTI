import {Component, Input, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PrincipalPage} from '../principal/principal';
import {Usuario} from '../usuario/usuario.model';
import {UsuarioService} from '../usuario/usuario.auth.service';
import {Storage, LocalStorage} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [UsuarioService],
})
export class LoginPage implements OnInit{
  @Input()
  usuario = {
    usuario: '',
    clave: ''
  };
  usuarios: Usuario[];
  logged=false;
  errores={
    auth: '',
  };
  local: Storage = new Storage(LocalStorage);
  constructor(private _navController:NavController,
              private usuarioService: UsuarioService) {

  }
  ngOnInit() {
    this.local.get('auth')
      .then(auth => {
        if(auth!=null)
        this._navController.setRoot(PrincipalPage)})
      .catch(error => {
      console.log(error);
    }) ;

}
  login(){
      this.usuarioService.getUsuario()
      .then(usuario => {this.usuarios=usuario})
      .catch(error => error);


      this.usuarioService.login(this.usuario.usuario,this.usuario.clave)
        .then(res => {
          if(res.json().data.uid!=null) {
            this._navController.setRoot(PrincipalPage);
            this.local.setJson('auth',res.json().data);
            console.log(res.headers.toJSON()['access-token'][0]);
          }
          else this.errores.auth = 'Usuario o contraseña incorrectos';
        }).catch(
          error => error);
  }

  isLoggedIn(){
    this.usuarioService.isLoggedIn().then(res=> {this.logged=true}).catch(error => error);

  }



}
