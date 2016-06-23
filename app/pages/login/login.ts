import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PrincipalPage} from '../principal/principal';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

  constructor(private _navController:NavController) {
  }

  goPrincipal() {

        this._navController.push(PrincipalPage,{});
        this._navController.setRoot(PrincipalPage);
}
}
