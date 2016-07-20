import {Component,OnInit} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';
import {UsuarioService} from '../usuario/usuario.auth.service';
import { Http, Headers } from '@angular/http';



@Component({
  templateUrl: 'build/pages/principal/principal.html'
})
export class PrincipalPage implements OnInit{

  constructor(private _navController:NavController,
    private menu: MenuController,
  private usuarioService: UsuarioService,
private http: Http) {}
  openMenu(){
    this.menu.open();
  }
  ngOnInit() {
    
  }
}
