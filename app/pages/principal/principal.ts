import {Component,OnInit} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';
import { Http, Headers } from '@angular/http';
import {Url} from '../../url';
import {InventarioPage} from '../inventario/inventario';


@Component({
  templateUrl: 'build/pages/principal/principal.html'
})
export class PrincipalPage implements OnInit{
  url = new Url()
  apk=''

  constructor(private _navController:NavController,
    private menu: MenuController,
  private usuarioService: UsuarioAuthService,
private http: Http) {

  this.apk=this.url.base + this.url.apk
}
  openMenu(){
    this.menu.open();
  }

  continuar(){
    this._navController.setRoot(InventarioPage)

  }
  ngOnInit() {

  }
}
